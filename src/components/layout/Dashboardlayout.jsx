import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import CreateProjectModal from "../dashboard/CreateProjectModal";
import "../../styles/DashboardLayout.css";

// Wraps every authenticated page (Dashboard, My Projects, Recent Activity).
// Sidebar + the "New Project" modal render ONCE here, since "New Project"
// is a sidebar action available from any page — not just Dashboard.
//
// Child pages read { refreshSignal } via useOutletContext() and re-fetch
// their data when it changes (see Dashboard.jsx / MyProjects.jsx).
function DashboardLayout() {
  const [showModal, setShowModal] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0);

  function handleProjectCreated() {
    setShowModal(false);
    setRefreshSignal((prev) => prev + 1);
  }

  return (
    <div className="app-bg app-shell">
      <Sidebar onNewProject={() => setShowModal(true)} />

      <main className="app-main">
        <div className="app-container">
          <Outlet context={{ refreshSignal, openNewProject: () => setShowModal(true) }} />
        </div>
      </main>

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </div>
  );
}

export default DashboardLayout;