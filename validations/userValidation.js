const Joi = require("joi");

const userValidationSchema = Joi.object({
  EmployeeId: Joi.number().required().messages({
    "any.required": "EmployeeId is required",
  }),
  userName: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  contactNo: Joi.string()
    .max(20) // Allow contact numbers up to 20 digits
    .required()
    .messages({
      "string.max": "Contact number can be a maximum of 20 digits",
      "any.required": "Contact number is required",
    }),
  alternativeContactNumber: Joi.string()
    .max(20) // Allow alternative contact numbers up to 20 digits
    .required()
    .messages({
      "string.max": "Alternative contact number can be a maximum of 20 digits",
      "any.required": "Alternative contact number is required",
    }),
  designation: Joi.string().required().messages({
    "any.required": "Designation is required",
  }),
  status: Joi.string().valid("active", "inactive").default("active"),
  imageUrl: Joi.string().uri().optional(),
  dateOfBirth: Joi.date().required().messages({
    "any.required": "Date of birth is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.required": "Gender is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("admin", "employee").default("employee"),
});

module.exports = userValidationSchema;
