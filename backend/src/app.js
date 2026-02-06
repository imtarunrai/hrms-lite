import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
await connectDB();

import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.options("*", cors())

app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use(errorHandler);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     tls: true,
//     tlsAllowInvalidCertificates: true, // TEMPORARY, for testing only
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

export default app;
