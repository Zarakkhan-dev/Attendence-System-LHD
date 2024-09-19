 import Employee from "../models/EmployeeDetailModel.js"
import appAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";

export const createEmployee = appAsync(async (req, res, next) => {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            employee: newEmployee
        }
    });
});

export const getEmployees = appAsync(async (req, res, next) => {
    const employees = await Employee.find();
    res.status(200).json({
        status: 'success',
        results: employees.length,
        data: {
            employees
        }
    });
});

export const getEmployeeById = appAsync(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return next(new appError('Employee not found', 404));

    res.status(200).json({
        status: 'success',
        data: {
            employee
        }
    });
});

export const updateEmployee = appAsync(async (req, res, next) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return next(new appError('Employee not found', 404));

    res.status(200).json({
        status: 'success',
        data: {
            employee: updatedEmployee
        }
    });
});

export const deleteEmployee = appAsync(async (req, res, next) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return next(new appError('Employee not found', 404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});