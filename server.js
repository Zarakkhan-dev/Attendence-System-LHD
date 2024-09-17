const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Router = require("./routes/indexRoute");
dotenv.config();

const { connectDB } = require("./config/dbConnection");

//Middleware to prase JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Server Connection
connectDB();

// //Router Connection
app.use("/api", Router);

//Server Start
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
