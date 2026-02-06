// attendance.routes.js
import express from "express";
import { markAttendance, getAttendanceByEmployee,   getAllAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.post("/", markAttendance);
router.get("/employee/:id", getAttendanceByEmployee);

export default router;
