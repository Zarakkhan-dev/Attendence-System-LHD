import Joi from 'joi';

const userSchema = Joi.object({
    employeeId: Joi.number().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    contactNo: Joi.number().required(),
    alternativeContactNo: Joi.number().optional(),
    designation: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive', 'Terminated'),
    role: Joi.string().valid('Employee', 'Admin'),
    password: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    address: Joi.string(),
    image: Joi.string(),
}).options({ abortEarly: false });  // To return all errors at once

export default userSchema;
