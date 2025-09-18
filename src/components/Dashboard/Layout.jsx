import { useContext, useState, useEffect } from "react";
import {
  FiHome,
  FiActivity,
  FiBarChart2,
  FiCoffee,
  FiBell,
  FiLogOut,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import profile3 from "../../assets/img/profile3.png";
import calloglogo from "../../assets/img/calloglogo.png";

const Layout = ({ children, showHeader = true, activeTab }) => {
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const notificationCount = notifications.filter(
    (msg) => !msg.blocked && msg.from !== "You"
  ).length;

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setNotifications(storedMessages);

    const handleStorageChange = () => {
      const updatedMessages = JSON.parse(
        localStorage.getItem("messages") || "[]"
      );
      setNotifications(updatedMessages);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const navigationItems = [
    {
      name: "Home",
      icon: <FiHome className="text-lg" />,
      path: "/home-summary",
    },
    {
      name: "Food",
      icon: <FiCoffee className="text-lg" />,
      path: "/food-diary",
    },
    {
      name: "Exercise",
      icon: <FiActivity className="text-lg" />,
      path: "/exercise-diary",
    },
    {
      name: "Progress",
      icon: <FiBarChart2 className="text-lg" />,
      path: "/progress-tracking",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showHeader && (
        <header className="flex justify-between items-center bg-[#1D2D44] text-white shadow px-6 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-[#2a3c58] transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <img src={calloglogo} alt="Callog Logo" className="h-10 w-auto" />
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="hidden md:block">{formattedDate}</div>

            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-[#2a3c58] transition-colors relative"
                onClick={() => navigate("/sendmail")}
                aria-label="Notifications"
              >
                <FiBell className="text-xl" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 p-1 rounded-md hover:bg-[#2a3c58] transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={profile.photo || profile3}
                    alt={profile.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:inline">
                  {profile.name || "User"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiUser className="text-lg" />
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiSettings className="text-lg" />
                    Edit Profile
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      <div className="flex flex-1">
        <aside
          className={`bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mt-4 ml-4 p-4 transition-all duration-300 ${
            isSidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {!isSidebarCollapsed ? (
            <div className="text-center mb-6 relative">
              <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-r from-[#1D2D44] to-[#FF6B6B] animate-pulse">
                <img
                  src={profile.photo || profile3}
                  alt={profile.name || "User"}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              </div>

              <h2 className="mt-2 text-xl font-extrabold text-[#1D2D44] truncate">
                {profile.name || "User"}
              </h2>

              <p className="text-gray-500 mt-1 text-sm">
                {profile.gender || "-"}, {profile.age || "-"} years
              </p>

              <div className="flex justify-center mt-4 gap-4">
                <div className="bg-[#F0F4FF] p-3 rounded-2xl flex flex-col items-center w-20 shadow-md hover:scale-105 transform transition">
                  <p className="text-xs text-gray-500">HEIGHT</p>
                  <p className="font-semibold text-sm">
                    {profile.heightFt || 0} ft {profile.heightIn || 0} in
                  </p>
                </div>
                <div className="bg-[#FFF4E0] p-3 rounded-2xl flex flex-col items-center w-20 shadow-md hover:scale-105 transform transition">
                  <p className="text-xs text-gray-500">WEIGHT</p>
                  <p className="font-semibold text-sm">
                    {profile.weightLbs || 0} lbs
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                <FaRunning className="text-[#1D2D44] text-xl animate-bounce" />
              </div>
            </div>
          ) : (
            <div className="text-center mb-6 relative">
              <div className="w-12 h-12 mx-auto rounded-full p-1 bg-gradient-to-r from-[#1D2D44] to-[#FF6B6B] animate-pulse">
                <img
                  src={profile.photo || profile3}
                  alt={profile.name || "User"}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-3 mt-6">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl shadow-md hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 group ${
                  activeTab === item.name
                    ? "bg-[#1D2D44] text-white"
                    : "text-[#1D2D44] bg-gray-100"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title={isSidebarCollapsed ? item.name : ""}
              >
                {!isSidebarCollapsed && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#1D2D44] rounded-l-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                )}
                {item.icon}
                {!isSidebarCollapsed && (
                  <span className="font-semibold">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>

          {!isSidebarCollapsed && (
            <div className="bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B] text-white p-4 text-center text-sm mt-6 rounded-xl shadow-md">
              🎉 Congratulations!
              <br />
              You've unlocked the <strong>Expert</strong> level.
            </div>
          )}
        </aside>

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-2" : "ml-2"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
