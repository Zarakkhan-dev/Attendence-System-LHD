const express = require("express");
const Router = express.Router();
const employeeRoute = require("./employeeRoute");
const userRoute = require("./userRoute")


Router.use("/user", userRoute);

Router.use("/employees", employeeRoute);

module.exports = Router;
