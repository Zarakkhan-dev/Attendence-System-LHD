import express from "express"
import { configDotenv } from "dotenv";
import db from "./Config/db.js";
import cors from "cors";

//Routes
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js"
import attendenceRoutes from "./routes/attendenceRoutes.js"

configDotenv();
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

db();
app.get("/",(req,res)=>{
    res.send("Hello World !")
})
//Define routes
app.use("/api/user",userRoutes);
app.use("/api/employee-detail" ,employeeRoutes);
app.use("/api/attendence" ,attendenceRoutes)


const PORT = process.env.PORT || 4001;
app.listen(PORT , ()=>{
    console.log(`Servrer is running at port Number ${PORT}`)
})