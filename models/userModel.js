const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: Number,
      required: true,
      unique: true, // Ensure uniqueness for EmployeeId
    },
    userName: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true, // Make email lowercase
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Simple email validation regex
    },
    contactNo: {
      type: String,
      required: [true, "Please provide a contact number"],
      unique: true,
      maxlength: 20, // Allow up to 20 digits
    },
    alternativeContactNumber: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20, // Allow up to 20 digits
    },
    designation: {
      type: String,
      required: [true, "Please provide a designation"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    imageUrl: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide a date of birth"],
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
      enum: ["male", "female", "other"], // Restrict gender to specific values
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
