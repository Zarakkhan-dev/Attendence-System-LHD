import User from '../models/userModel.js';
import appAsync from "../utils/catchAsync.js"
import appError from '../utils/appError.js';

// Create a new user
export const createUser = appAsync(async (req, res, next) => {
    console.log(req.body);
    // Check if the employeeID or email already exists
    // const existingUser = await User.findOne({ employeeID });
    // if (existingUser) {
    //     return next(new appError('Employee with this ID already exists', 400));
    // }

    const newUser = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: newUser,
    });
});

// Get all users
export const getUsers = appAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        data: users,
    });
});

// Get a single user by ID
export const getUserById = appAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new appError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

// Update user by ID
export const updateUser = appAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) {
        return next(new appError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: updatedUser,
    });
});

// Delete user by ID
export const deleteUser = appAsync(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        return next(new appError('User not found', 404));
    }

    res.status(204).json({
        success: true,
        data: null,
    });
});
