import Joi from 'joi';

const employeeSchema = Joi.object({
    userId: Joi.string().required(), // Assuming userId is a string (ObjectId)
    salaryPerDay: Joi.number().required(),
    totalWorkingDays: Joi.number().default(0),
    totalAbsentDays: Joi.number().default(0),
    totalLeaveDays: Joi.number().default(0),
    totalLateDays: Joi.number().default(0),
    totalOffDays: Joi.number().default(0),
    totalSalary: Joi.number().default(0),
    netSalary: Joi.number().default(0),
    deductedSalary: Joi.number().default(0),
    month: Joi.string().required(),
    year: Joi.number().required()
}).or('userId', 'salaryPerDay', 'totalWorkingDays', 'totalAbsentDays', 'totalLeaveDays', 'totalLateDays', 'totalOffDays', 'totalSalary', 'netSalary', 'deductedSalary', 'month', 'year'); // At least one field is required

export default employeeSchema;
