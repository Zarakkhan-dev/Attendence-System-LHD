const express = require("express");
const userController = require("../controllers/userController");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");

const router = express.Router();



// Route to create the first admin user
router.post('/create-admin', upload.single("imageUrl"), authController.createAdmin);



// Admin signup and login
router.post("/signup", authMiddleware, upload.single("imageUrl"), authController.signup);
router.post("/login", authController.login);

module.exports = router;


// Routes
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, upload.single("imageUrl"), userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
