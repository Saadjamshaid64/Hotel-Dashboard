









import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react"; // Import icons

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "", icon: <LayoutDashboard size={18} /> },
    { name: "User", path: "user", icon: <Users size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white flex flex-col fixed left-0 top-0 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">
      <ul className="space-y-2 mt-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition mx-2 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold px-4"
                    : "text-gray-700 hover:bg-blue-100 px-4"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
