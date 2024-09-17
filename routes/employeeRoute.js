const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

// Routes for Employee CRUD operations
router.post("/", employeeController.createEmployee);
router.get("/:userId", employeeController.getEmployeesByUserId);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
