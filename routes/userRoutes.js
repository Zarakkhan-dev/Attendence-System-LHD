import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
} from '../Controller/userController.js';

import userSchema from '../validation/userValidation.js';
import validateRequest from '../middleware/validateRequest.js';
const router = express.Router();

router
    .route('/')
    .post(validateRequest(userSchema), createUser)  
    .get(getUsers); 

router.route('/login').post(loginUser)

    router
    .route('/:id')
    .get(getUserById) 
    .put(updateUserById)  
    .delete(deleteUserById);  

export default router;
