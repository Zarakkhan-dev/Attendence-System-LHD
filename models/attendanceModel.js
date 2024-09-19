import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date
    },
    lateReason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Accept', 'Rejected'],
        default: 'Accept',
        required: true
    },
    day :{
        type:Number
    },
    month : {
        type:String 
    },
    year :{
        type :String
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically generate the timestamp
        required: true
    }
});


const attendence = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
export default  attendence 
