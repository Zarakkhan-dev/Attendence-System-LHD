import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the Employee model
        required: true,
    },
    checkInTime: {
        type: Date,
        required: true,
    },
    checkOutTime: {
        type: Date,
    },
    data : {
        type : Date ,

    },
    lateReason: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Accepted', 'Rejected'],
        default: 'Accepted',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });


const Attendence =mongoose.models.Attendance  || mongoose.model('Attendance', attendanceSchema);
export default Attendence
