import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true, // ✅ unique identifier
    },
    name: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
