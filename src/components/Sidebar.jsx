import { FiBriefcase, FiCalendar, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/";
  return (
    <aside className="w-[90px] min-h-[calc(100vh-78px)] bg-[#F6FAFDE5] p-6 flex flex-col items-center space-y-6">
      <div
        className={`w-[50px] h-[50px] flex items-center justify-center cursor-pointer rounded-full ${isDashboard ? "bg-[#514EF3]" : "bg-white"
          }`}
      >
        <FiHome
          className={`w-[20px] h-[20px] ${isDashboard ? "text-white" : "text-gray-500 hover:text-[#514EF3]"
            }`}
        />
      </div>
      <div className="w-[50px] h-[50px] flex items-center cursor-pointer justify-center bg-white rounded-full">
        <FiCalendar className="w-[20px] h-[20px] text-gray-500 hover:text-[#514EF3]" />
      </div>
      <div className="w-[50px] h-[50px] flex items-center cursor-pointer justify-center bg-white rounded-full">
        <FiUser className="w-[20px] h-[20px] text-gray-500 hover:text-[#514EF3]" />
      </div>
      <div className="w-[50px] h-[50px] flex items-center cursor-pointer justify-center bg-white rounded-full">
        <FiBriefcase className="w-[20px] h-[20px]  text-gray-500 hover:text-[#514EF3]" />
      </div>
      <div className="w-[50px] h-[50px] flex items-center cursor-pointer justify-center bg-white rounded-full">
        <FiSettings className="w-[20px] h-[20px] text-gray-500 hover:text-[#514EF3]" />
      </div>
    </aside>
  );
}

export default Sidebar;
