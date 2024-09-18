const { string } = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
   
    checkInTime: {
      type: String,
    },
   
    checkOutTime: {
      type: String,
    },
   
    lateReason: {
      type: string,
      default: false,
    },
    
    status: {
      type: String,
      enum: ["accept", "reject"],
    
    },   
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
