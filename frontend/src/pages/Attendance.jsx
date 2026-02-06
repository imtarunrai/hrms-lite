import { useEffect, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import api from "../api/axios";

const Attendance = () => {
  const { employees } = useEmployees();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAttendance = async () => {
      if (employees.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await api.get("/attendance"); 
        const allRecords = res.data;
        const todayRecords = allRecords.filter(
          (rec) =>
            rec.date === date &&
            rec.employeeId &&
            rec.employeeId !== "undefined"
        );
        const initialAttendance = {};
        todayRecords.forEach((rec) => {
          initialAttendance[rec.employeeId] = rec.status;
        });
        employees.forEach((emp) => {
          if (emp._id && !initialAttendance[emp._id]) initialAttendance[emp._id] = "";
        });

        setAttendance(initialAttendance);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [date, employees]);

  const handleStatusChange = (empId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: status,
    }));
  };

  const handleSave = async () => {
    try {
      const promises = Object.entries(attendance)
        .filter(([empId, status]) => empId && status)
        .map(([empId, status]) =>
          api.post("/attendance", { employeeId: empId, date, status })
        );

      if (!promises.length) return alert("No attendance to save");

      await Promise.all(promises);
      alert("Attendance saved!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save attendance");
    }
  };


  if (loading) return <p className="text-gray-500">Loading attendance...</p>;

  if (employees.length === 0)
    return (
      <p className="text-red-500">
        No employees found. Please add employees first.
      </p>
    );

  if (error)
    return <p className="text-red-500">{error}</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Employee</th>
              <th className="text-left p-3">Department</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-t">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">
                  <select
                    value={attendance[emp._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(emp._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
