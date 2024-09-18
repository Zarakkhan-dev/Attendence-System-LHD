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
    .post(validateRequest(employeeSchema), createEmployee)  
    .get(getEmployees);  

router
    .route('/:id')
    .get(getEmployeeById)  
    .put(updateEmployee)  
    .delete(deleteEmployee);  

export default router;
