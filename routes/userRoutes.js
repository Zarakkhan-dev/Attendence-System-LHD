import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} from '../Controller/userController.js';

import userSchema from '../validation/userValidation.js';
import validateRequest from '../middleware/validateRequest.js';
const router = express.Router();

router
    .route('/')
    .post(validateRequest(userSchema), createUser)  // Create with validation
    .get(getUsers); // Get all users

router.route('/login').post(loginUser)

    router
    .route('/:id')
    .get(getUserById)  // Get user by ID
    .put(updateUser)  // Update with validation
    .delete(deleteUser);  // Delete user by ID

export default router;
