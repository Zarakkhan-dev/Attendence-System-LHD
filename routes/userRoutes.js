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
    .post(validateRequest(userSchema), createUser)  
    .get(getUsers); 

router.route('/login').post(loginUser)

    router
    .route('/:id')
    .get(getUserById) 
    .put(updateUser)  
    .delete(deleteUser);  

export default router;
