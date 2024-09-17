const Employee = require("../models/employeeModel"); // Assuming model is in models folder
const User = require("../models/userModel"); // For referencing user
const mongoose = require("mongoose");

// Calculate the net salary, deducted salary, and total off days
const calculateSalaryDetails = (salaryPerDay, totalSalary, totalAbsentDays, totalLeaveDays) => {
    const totalOffDays = totalAbsentDays + totalLeaveDays;
    const deductedSalary = salaryPerDay * totalOffDays; // Salary deducted based on off days
    const netSalary = totalSalary - deductedSalary; // Net salary after deductions

    return {
        totalOffDays,
        deductedSalary,
        netSalary
    };
};

// Create a new employee record
exports.createEmployee = async (req, res) => {
    try {
        const { salaryPerDay, totalWorkingDays, totalAbsentDays, totalLeaveDays, totalSalary, month, year, userId } = req.body;

        // Ensure that the userId exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Calculate salary details
        const { totalOffDays, deductedSalary, netSalary } = calculateSalaryDetails(salaryPerDay, totalSalary, totalAbsentDays, totalLeaveDays);

        // Create new employee
        const employee = await Employee.create({
            salaryPerDay,
            totalWorkingDays,
            totalAbsentDays,
            totalLeaveDays,
            totalLateDays: req.body.totalLateDays || 0,
            totalSalary,
            totalOffDays,
            deductedSalary,
            netSalary,
            month,
            year,
            userId
        });

        res.status(201).json({ message: "Employee record created successfully", data: employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all employees for a specific userId
exports.getEmployeesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const employees = await Employee.find({ userId });
        if (!employees.length) {
            return res.status(404).json({ message: "No employee records found for this user" });
        }

        res.status(200).json({ data: employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee record by ID
exports.updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        // Update fields
        const { salaryPerDay, totalWorkingDays, totalAbsentDays, totalLeaveDays, totalSalary, month, year } = req.body;

        const updatedFields = {
            salaryPerDay,
            totalWorkingDays,
            totalAbsentDays,
            totalLeaveDays,
            totalSalary,
            month,
            year
        };

        // Recalculate salary details if needed
        const { totalOffDays, deductedSalary, netSalary } = calculateSalaryDetails(salaryPerDay, totalSalary, totalAbsentDays, totalLeaveDays);
        updatedFields.totalOffDays = totalOffDays;
        updatedFields.deductedSalary = deductedSalary;
        updatedFields.netSalary = netSalary;

        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedFields, { new: true });
        res.status(200).json({ message: "Employee record updated successfully", data: updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }

        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Employee record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
