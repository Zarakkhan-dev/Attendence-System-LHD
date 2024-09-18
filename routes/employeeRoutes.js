import express from 'express';
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from '../Controller/employeeController.js';
import employeeSchema from '../validation/employeeValidation.js';
import validateRequest from '../middleware/validateRequest.js';
const router = express.Router();

router
    .route('/')
    .post(validateRequest(employeeSchema), createEmployee)  // Create with validation
    .get(getEmployees);  // Get all employees

router
    .route('/:id')
    .get(getEmployeeById)  // Get employee by ID
    .put(updateEmployee)  // Update with validation
    .delete(deleteEmployee);  // Delete employee by ID

export default router;
