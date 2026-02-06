import { useState } from "react";

const EmployeeForm = ({ onSubmit, initialData = {} }) => {
  const [employeeId, setEmployeeId] = useState(initialData.employeeId || "");
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [department, setDepartment] = useState(initialData.department || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !name || !email || !department) {
      alert("All fields are required");
      return;
    }

    onSubmit({
      employeeId,
      name,
      email,
      department,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-medium">Employee ID</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Unique Employee ID"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Engineering"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
