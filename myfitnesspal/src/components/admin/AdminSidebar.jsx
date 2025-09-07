import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const navigation = [
  { name: "Overview", href: "/admin", icon: "📊" },
  { name: "User Management", href: "/admin/users", icon: "👥" },
  { name: "Food Database", href: "/admin/foods", icon: "🍎" },
  { name: "Exercise Database", href: "/admin/exercises", icon: "💪" },
  { name: "Analytics", href: "/admin/analytics", icon: "📈" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export const AdminSidebar = ({ mobile = false, isOpen = false, onClose = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection
  const { logout } = useAuth();

  const sidebarClasses = mobile
    ? `fixed inset-0 z-50 lg:hidden ${isOpen ? "block" : "hidden"}`
    : "flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-6 pb-4";

  const handleLogout = async () => {
    try {
      await logout();
      alert("You have been signed out successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={sidebarClasses}>
      {mobile && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Admin Menu</h2>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-muted-foreground" onClick={onClose}>
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-6">
              <AdminNavigation location={location} onClose={onClose} handleLogout={handleLogout} />
            </nav>
          </div>
        </div>
      )}

      {!mobile && (
        <div className="flex h-16 shrink-0 items-center border-b border-border">
          <h1 className="text-xl font-bold text-primary">MyFitTracker Admin</h1>
        </div>
      )}

      {!mobile && (
        <nav className="flex flex-1 flex-col">
          <AdminNavigation location={location} handleLogout={handleLogout} />
        </nav>
      )}
    </div>
  );
};

const AdminNavigation = ({ location, onClose = () => {}, handleLogout }) => (
  <ul role="list" className="flex flex-1 flex-col gap-y-7">
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => {
          const isActive =
            location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
          return (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={onClose}
                className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </li>
    <li>
      <div className="space-y-1">
        <a
          href="/"
          onClick={onClose}
          className="group flex rounded-md p-2 text-sm leading-6 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <span className="text-lg">🏠</span>
          User Dashboard
        </a>
        <button
          onClick={handleLogout}
          className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <span className="text-lg">🚪</span>
          Sign out
        </button>
      </div>
    </li>
  </ul>
);