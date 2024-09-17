import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    salaryPerDay: {
        type: Number,
        required: true,
    },
    totalWorkingDays: {
        type: Number,
        default: 0,
    },
    totalAbsentDays: {
        type: Number,
        default: 0,
    },
    totalLeaveDays: {
        type: Number,
        default: 0,
    },
    totalLateDays: {
        type: Number,
        default: 0,
    },
    totalOffDays: {
        type: Number,
        default: 0,
    },
    totalSalary: {
        type: Number,
        default: 0,
    },
    netSalary: {
        type: Number,
        default: 0,
    },
    deductedSalary: {
        type: Number,
        default: 0,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
