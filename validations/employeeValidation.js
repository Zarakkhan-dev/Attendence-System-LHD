const Joi = require("joi");

const employeeValidationSchema = Joi.object({
    salaryPerDay: Joi.number().required().messages({
        "any.required": "Salary per day is required",
        "number.base": "Salary per day must be a number"
    }),
    totalWorkingDays: Joi.number().required().messages({
        "any.required": "Total working days is required",
        "number.base": "Total working days must be a number"
    }),
    totalAbsentDays: Joi.number().messages({
        "number.base": "Total absent days must be a number"
    }),
    totalLeaveDays: Joi.number().messages({
        "number.base": "Total leave days must be a number"
    }),
    totalSalary: Joi.number().required().messages({
        "any.required": "Total salary is required",
        "number.base": "Total salary must be a number"
    }),
    totalLateDays: Joi.number().messages({
        "number.base": "Total late days must be a number"
    }),
    month: Joi.string().required().messages({
        "any.required": "Month is required",
        "string.base": "Month must be a string"
    }),
    year: Joi.string().required().messages({
        "any.required": "Year is required",
        "string.base": "Year must be a string"
    }),
    userId: Joi.string().length(24).hex().required().messages({
        "any.required": "User ID is required",
        "string.length": "User ID must be a valid 24-character ObjectId",
        "string.hex": "User ID must be a valid hexadecimal string"
    }),
});

module.exports = employeeValidationSchema;
