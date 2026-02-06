import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";

export const createEmployee = async (req, res, next) => {
  try {
    const { employeeId, name, email, department } = req.body;

    // Validate required fields
    if (!employeeId || !name || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate Employee ID
    const existingId = await Employee.findOne({ employeeId });
    if (existingId) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // Check for duplicate Email
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create employee
    const employee = await Employee.create({ employeeId, name, email, department });
    res.status(201).json(employee);
  } catch (err) {
    next(err); 
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ name: 1 }); // sort by name
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};


export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the employee
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete all attendance records for this employee
    await Attendance.deleteMany({ employeeId: id });

    res.status(200).json({ message: "Employee and related attendance deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
