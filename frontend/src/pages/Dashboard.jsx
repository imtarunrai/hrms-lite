import { useEffect, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import api from "../api/axios";

const Dashboard = () => {
  const { employees } = useEmployees();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalEmployees = employees.length;

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/attendance");
        setAttendance(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = attendance.filter(
    (att) =>
      att.date === today && att.employeeId && att.employeeId !== "undefined",
  );

  const presentToday = todayAttendance.filter(
    (att) => att.status === "Present",
  ).length;
  const absentToday = todayAttendance.filter(
    (att) => att.status === "Absent",
  ).length;
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-gray-500 text-sm">Total Employees</p>
          <h2 className="text-3xl font-bold">{totalEmployees}</h2>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Present Today</p>
          <h2 className="text-3xl font-bold text-green-600">{presentToday}</h2>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Absent Today</p>
          <h2 className="text-3xl font-bold text-red-600">{absentToday}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
