const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create the first admin user
exports.createAdmin = async (req, res) => {
  try {
    const {
      EmployeeId,
      userName,
      email,
      contactNo,
      alternativeContactNumber,
      designation,
      dateOfBirth,
      gender,
      address,
      password,
    } = req.body;

    // Check if an admin already exists
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      return res.status(400).json({
        status: "fail",
        message: "Admin already exists.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin user
    const newUser = await User.create({
      EmployeeId,
      userName,
      email,
      contactNo,
      alternativeContactNumber,
      designation,
      dateOfBirth,
      gender,
      address,
      password: hashedPassword,
      role: "admin",
    });

    // Send response
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Regular user signup
exports.signup = async (req, res) => {
  try {
    const {
      EmployeeId,
      userName,
      email,
      contactNo,
      alternativeContactNumber,
      designation,
      dateOfBirth,
      gender,
      address,
      password,
      role,
    } = req.body;

    // Check if an admin already exists
    const adminExists = await User.findOne({ role: "admin" });

    // If no admin exists, only allow the creation of the first admin
    if (!adminExists && role !== "admin") {
      return res.status(400).json({
        status: "fail",
        message: "The first user created must be an admin.",
      });
    }

    // If an admin exists, only admins can create new users
    if (adminExists && (!req.user || req.user.role !== "admin")) {
      return res.status(403).json({
        status: "fail",
        message: "Only admins can create new users.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Handle the image URL from multer
    const imageUrl = req.file ? req.file.path : undefined; // Assuming multer provides `req.file.path`

    // Create the new user
    const newUser = await User.create({
      EmployeeId,
      userName,
      email,
      contactNo,
      alternativeContactNumber,
      designation,
      dateOfBirth,
      gender,
      address,
      password: hashedPassword,
      role,
      imageUrl,
    });

    // Send response
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////
// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include the password field
    const user = await User.findOne({ email }).select("+password");

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
