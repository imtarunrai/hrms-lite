import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">HRMS Lite</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/attendance">Attendance</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;