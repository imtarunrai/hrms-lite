import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "employeeId, date and status are required" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date },
      { status },
      { upsert: true, new: true }
    );

    res.status(201).json(attendance);
  } catch (err) {
    console.error(err); 
    next(err);      
  }
};


export const getAttendanceByEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id; 
    const records = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};
