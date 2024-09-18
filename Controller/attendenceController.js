import Attendance from '../models/attendanceModel.js';
import Employee from '../models/employeeModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Helper function to check if check-in is late
const isLate = (checkInTime) => {
    const officeStartTime = new Date(checkInTime);
    officeStartTime.setHours(9, 0, 0); 
    return (checkInTime - officeStartTime) > 15 * 60 * 1000;
};

// Mark attendance: Check-in and Check-out
export const markAttendance = catchAsync(async (req, res, next) => {
    const { employeeID, checkInTime, checkOutTime, lateReason } = req.body;

    // Check if employee exists
    const employee = await Employee.findById(employeeID);
    if (!employee) return next(new AppError('Employee not found', 404));

    // Check if the check-in is late
    const late = isLate(new Date(checkInTime));

    let status = 'Accepted';
    if (late && !lateReason) status = 'Rejected';

    // Create new attendance record
    const attendance = await Attendance.create({
        employeeID,
        checkInTime,
        checkOutTime,
        lateReason: late ? lateReason : undefined,
        status,
    });

    // Calculate salary and update employee's working details
    if (checkOutTime) {
        let deduction = 0;
        let totalSalary = employee.totalSalary;
        let netSalary = employee.netSalary;

        if (late && status === 'Rejected') {
            deduction = employee.salaryPerDay * 0.05; // 5% deduction
        }

        totalSalary += employee.salaryPerDay - deduction;
        netSalary += employee.salaryPerDay;

        employee.totalWorkingDays += 1;
        employee.totalLateDays += late ? 1 : 0;
        employee.totalOffDays = Math.floor(employee.totalWorkingDays / 7); // Sundays off
        employee.deductedSalary += deduction;
        employee.totalSalary = totalSalary;
        employee.netSalary = netSalary;

    }

    
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeID, employee, { new: true });
    res.status(201).json({
        status: 'success',
        data: {
            attendance,
            employee : updatedEmployee,
        },
    });
});
