import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.delete("/:id", deleteEmployee);

export default router;
