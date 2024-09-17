const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    salaryPerDay: {
      type: Number,
      required: true,
      
    },

    totalWorkingDays: {
      type: Number,
      required: true,
    },

    totalAbsentDays: {
      type: Number,
     
    },

    totalLeaveDays: {
      type: Number,
    },

    totalLateDays: {
      type: Number,
    },

    totalSalary: {
      type: Number,
      required: true,
    },

    totalOffDays: {
      type: Number,
    },

    netSalary: {
      type: Number,
    },
    deductedSalary: {
      type: Number,
    },
    month:{
      type:String,
      required:true
    },
    year:{
      type:String,
      required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
