import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/common/EmployeeForm";
import { useEmployees } from "../context/EmployeeContext";

const AddEmployee = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [error, setError] = useState(""); // ✅ For showing error message

  const handleAddEmployee = async (data) => {
    setError(""); 
    try {
      await addEmployee(data);
      navigate("/employees"); 
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add employee");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Add Employee
      </h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <EmployeeForm onSubmit={handleAddEmployee} />
    </div>
  );
};

export default AddEmployee;
