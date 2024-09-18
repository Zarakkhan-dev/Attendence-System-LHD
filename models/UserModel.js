import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    employeeID: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    alternativeContactNo: Number,
    designation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Terminated'],
        default: 'Active',
    },
    role: {
        type: String,
        enum: ['Employee', 'Admin'],
        default: 'Employee',
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    address: String,
    image: String,
    accessToken: String,
    refreshToken: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
