import catchAsync from "../utils/catchAsync.js"; // Assuming catchAsync is a utility function for handling async errors
import Attendance from "../models/attendanceModel.js"; // Import the Attendance model
import Employee_details from "../models/EmployeeDetailModel.js"; // Import Employee_details model
import appError from "../utils/appError.js"; // Assuming appError is a custom error handling utility
import User from "../models/UserModel.js";

export const checkInAttendance = catchAsync(async (req, res, next) => {
  const { employeeId, lateReason } = req.body;
  const checkInTime = new Date();
  const day = checkInTime.getDate();
  const month = checkInTime.toLocaleString("default", { month: "long" });
  const year = checkInTime.getFullYear().toString();

  const user = await User.findOne({ employeeId });
  if (!user) return next(new appError("Employee not found", 404));
  const employeeDetails = await Employee_details.findOne({ userId: user._id });
  console.log(employeeDetails)
  if (!employeeDetails)
    return next(new appError("Employee details not found", 404));

  const officeInTime = new Date(employeeDetails.officeInTime);
  const startOfDay = new Date(checkInTime);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(checkInTime);
  endOfDay.setHours(23, 59, 59, 999);

  const alreadyCheckedIn = await Attendance.findOne({
    employeeId: user._id,
    checkInTime: { $gte: startOfDay, $lte: endOfDay },
  });

  if (alreadyCheckedIn) {
    return next(new appError("Attendance already marked for today", 400));
  }

  // Calculate the difference in minutes between checkInTime and officeInTime
  const differenceInMinutes = (checkInTime - officeInTime) / (1000 * 60);
  let status = "Accept";
  let isLate = false;

  // Check if the employee is late
  if (differenceInMinutes > 16) {
    isLate = true;
    status = "Rejected";
  }

  // Create the attendance entry
  const attendance = new Attendance({
    employeeId: user._id,
    checkInTime,
    checkOutTime: null,
    status,
    day,
    month,
    year,
    lateReason: isLate ? lateReason : undefined,
  });

  // Save the attendance entry
  await attendance.save();

  // Update employee details directly
  const updateFields = {
    totalLateDays: isLate
      ? employeeDetails.totalLateDays + 1
      : employeeDetails.totalLateDays,
  };

  await Employee_details.updateOne({ userId: user._id }, updateFields);

  res.status(200).json({
    status: "success",
    data: {
      checkInTime,
      status,
      message: isLate
        ? `Late by ${Math.round(differenceInMinutes - 16)} minutes`
        : "Attendance marked on time",
      day,
      month,
      year,
    },
  });
});

export const checkOutAttendance = catchAsync(async (req, res, next) => {
  const { employeeId } = req.body;

  // Find the employee
  const employee = await User.find({ employeeId });
  if (!employee) {
    return next(new appError("Employee not found", 404));
  }
  const id = employee[0]._id;

  // Find the latest attendance record for this employee
  const attendance = await Attendance.findOne({
    employeeId: id,
    checkOutTime: null,
  });
  if (!attendance) {
    return next(
      new appError("Check-in record not found. Please check in first.", 400)
    );
  }
  // Calculate checkout time
  const checkOutTime = new Date();

  // Prepare the update object for attendance
  const attendanceUpdate = {
    checkOutTime,
  };
  // Get the employee detail
  const employeeDetail = await Employee_details.findOne({ userId: id });
  console.log(employeeDetail);
  if (!employeeDetail) {
    return next(new appError("Employee details not found", 404));
  }

  // Increment total working days
  employeeDetail.totalWorkingDays += 1;

  // Calculate the new total salary
  const newTotalSalary =
    employeeDetail.salaryPerDay * employeeDetail.totalWorkingDays;

  // If the status is 'Rejected', handle salary deduction
  if (attendance.status === "Rejected") {
    const deduction = newTotalSalary * 0.02;
    employeeDetail.totalSalary = newTotalSalary - deduction;
  } else {
    employeeDetail.totalSalary = newTotalSalary;
  }

  await Employee_details.updateOne(
    { userId: id },
    {
      totalWorkingDays: employeeDetail.totalWorkingDays,
      totalSalary: employeeDetail.totalSalary,
    }
  );

  await Attendance.updateOne({ _id: attendance._id }, attendanceUpdate);

  res.status(200).json({
    status: "success",
    data: {
      checkOutTime,
      message: "Attendance checked out successfully",
    },
  });
});

// Get all attendance records
export const getAllAttendance = catchAsync(async (req, res, next) => {
  const attendanceRecords = await Attendance.find()
    .populate("employeeId", "username email")
    .sort({ checkInTime: -1 });

  res.status(200).json({
    status: "success",
    results: attendanceRecords.length,
    data: attendanceRecords,
  });
});

// Get attendance record by ID
export const getAttendanceById = catchAsync(async (req, res, next) => {
  const attendanceRecord = await Attendance.findById(req.params.id).populate(
    "employeeId",
    "username email"
  );

  if (!attendanceRecord) {
    return next(new appError("Check-in First then check-out ", 404));
  }

  res.status(200).json({
    status: "success",
    data: attendanceRecord,
  });
});

// Update attendance record by ID
export const updateAttendanceById = catchAsync(async (req, res, next) => {
  const updatedAttendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedAttendance) {
    return next(new appError("Attendance record not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedAttendance,
  });
});

// Delete attendance record by ID
export const deleteAttendanceById = catchAsync(async (req, res, next) => {
  const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

  if (!deletedAttendance) {
    return next(new appError("Attendance record not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
