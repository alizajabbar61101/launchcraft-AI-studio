import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Sidebar.css";

function Sidebar({ onNewProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-dot"></span>
        <span>LaunchCraft</span>
        <span className="sidebar-logo-ai">AI</span>
      </div>

      {/* Create Project */}
      <button
        className="sidebar-new-project"
        onClick={onNewProject}
      >
        <span>+</span>
        New Project
      </button>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <button
          className={`sidebar-nav-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={`sidebar-nav-item ${
            location.pathname === "/projects" ? "active" : ""
          }`}
          onClick={() => navigate("/projects")}
        >
          <span>▣</span>
          My Projects
        </button>

        <button
          className={`sidebar-nav-item ${
            location.pathname === "/activity" ? "active" : ""
          }`}
          onClick={() => navigate("/activity")}
        >
          <span>◷</span>
          Recent Activity
        </button>

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button className="sidebar-nav-item">
          <span>⚙</span>
          Settings
        </button>

        <button
          className="sidebar-nav-item logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Log Out
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;