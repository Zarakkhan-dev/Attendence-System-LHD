import User from '../models/UserModel.js';
import appAsync from "../utils/catchAsync.js"
import appError from '../utils/appError.js';
import { generateAccessToken, generateRefreshToken, handleTokenGeneration } from '../middleware/tokenMiddleware.js';
import bcrypt from "bcryptjs"

// Create a new user
export const createUser = appAsync(async (req, res, next) => {
    const { password, employeeId } = req.body;

    // Check if employeeId and password are provided
    if (!employeeId || !password) {
        return next(new appError('Employee ID and password are required', 400));
    }

    // Check if the employee ID already exists
    const existingUser = await User.findOne({ employeeId });
    if (existingUser) {
        return next(new appError('Employee with this ID already exists', 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    let newUser = await User.create({ ...req.body, password: hashedPassword });

    // Handle token generation and response
    await handleTokenGeneration(newUser, res);
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
export const updateUserById = appAsync(async (req, res, next) => {
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
export const deleteUserById = appAsync(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        return next(new appError('User not found', 404));
    }

    res.status(204).json({
        success: true,
        data: null,
    });
});


export const loginUser = appAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password'); 

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new appError('Invalid email or password', 401));
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update tokens in the database
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        accessToken,
        refreshToken,
    }, {
        new: true, 
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        }
    });
});