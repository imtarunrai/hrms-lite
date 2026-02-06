import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);

        const empRes = await api.get(`/employees/${id}`);
        setEmployee(empRes.data);

        const attRes = await api.get(`/attendance/employee/${id}`);
        setAttendanceRecords(attRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{employee.name}</h1>

      <div className="card mb-6 p-4">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Attendance Details</h2>
      {attendanceRecords.length === 0 ? (
        <p className="text-gray-500">No attendance marked yet.</p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td className="p-3">{record.date}</td>
                  <td className={`p-3 font-medium ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
