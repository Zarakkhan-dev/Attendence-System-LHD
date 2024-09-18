import Joi from 'joi';

const employeeSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
        'string.base': 'User ID must be a string.',
        'string.hex': 'User ID must be a valid hex string.',
        'string.length': 'User ID must be exactly 24 characters long.',
        'any.required': 'User ID is required.'
    }),
    salaryPerDay: Joi.number().positive().required().messages({
        'number.base': 'Salary per day must be a number.',
        'number.positive': 'Salary per day must be a positive number.',
        'any.required': 'Salary per day is required.'
    }),
    totalWorkingDays: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Total working days must be a number.',
        'number.integer': 'Total working days must be an integer.',
        'number.min': 'Total working days cannot be negative.'
    }),
    totalAbsentDays: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Total absent days must be a number.',
        'number.integer': 'Total absent days must be an integer.',
        'number.min': 'Total absent days cannot be negative.'
    }),
    totalLeaveDays: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Total leave days must be a number.',
        'number.integer': 'Total leave days must be an integer.',
        'number.min': 'Total leave days cannot be negative.'
    }),
    totalLateDays: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Total late days must be a number.',
        'number.integer': 'Total late days must be an integer.',
        'number.min': 'Total late days cannot be negative.'
    }),
    totalOffDays: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Total off days must be a number.',
        'number.integer': 'Total off days must be an integer.',
        'number.min': 'Total off days cannot be negative.'
    }),
    totalSalary: Joi.number().positive().optional().messages({
        'number.base': 'Total salary must be a number.',
        'number.positive': 'Total salary must be a positive number.'
    }),
    netSalary: Joi.number().positive().optional().messages({
        'number.base': 'Net salary must be a number.',
        'number.positive': 'Net salary must be a positive number.'
    }),
    deductedSalary: Joi.number().positive().optional().messages({
        'number.base': 'Deducted salary must be a number.',
        'number.positive': 'Deducted salary must be a positive number.'
    }),
    month: Joi.string().required().messages({
        'string.base': 'Month must be a string.',
        'any.required': 'Month is required.'
    }),
    year: Joi.number().integer().required().messages({
        'number.base': 'Year must be a number.',
        'number.integer': 'Year must be an integer.',
        'any.required': 'Year is required.'
    }),
    officeInTime: Joi.date().required().messages({
        'date.base': 'Office in time must be a valid date.',
        'any.required': 'Office in time is required.'
    }),
    officeOutTime: Joi.date().optional().messages({
        'date.base': 'Office out time must be a valid date.'
    })
});

export default employeeSchema;
