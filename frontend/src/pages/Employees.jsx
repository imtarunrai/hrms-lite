import { Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

const Employees = () => {
  const { employees, loading, error, deleteEmployee } = useEmployees();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  };

  if (loading) return <p className="text-gray-500">Loading employees...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Link to="/employees/add" className="btn-primary">
          + Add Employee
        </Link>
      </div>

      {/* Empty State */}
      {employees.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No employees found.
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id || emp.email} className="border-t">
                  <td className="p-3">
                    {/* ✅ Name is now clickable */}
                    <Link
                      to={`/employees/${emp._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {emp.name}
                    </Link>
                  </td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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

export default Employees;
