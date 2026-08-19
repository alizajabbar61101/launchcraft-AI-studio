import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import heroBackground from "../../assets/hero-background.svg";
import Sidebar from "../dashboard/Sidebar";
import CreateProjectModal from "../dashboard/CreateProjectModal";
import { getProjects, deleteProject } from "../../lib/projectService";
import "../../styles/dashboard.css";

// Same layered background as landing.css's .global-bg: two soft
// brand-color glows + a light wash + the actual artwork, imported as
// a JS module (like Landing.jsx does) rather than a raw CSS url(),
// since raw url() paths need the file in public/ and this project
// only has it in src/assets/.
const dashboardBgStyle = {
  backgroundImage: [
    "radial-gradient(circle at 12% 18%, rgba(124, 92, 255, 0.10), transparent 45%)",
    "radial-gradient(circle at 88% 78%, rgba(94, 234, 212, 0.08), transparent 50%)",
    "linear-gradient(rgba(247, 247, 251, 0.86), rgba(247, 247, 251, 0.86))",
    `url(${heroBackground})`,
  ].join(", "),
  backgroundSize: "cover, cover, cover, cover",
  backgroundPosition: "center, center, center, center",
  backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat",
};

function DashboardLayout() {
  const [showModal, setShowModal] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [refreshSignal]);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  }

  function handleProjectCreated() {
    setShowModal(false);
    setRefreshSignal((prev) => prev + 1);
  }

  async function handleDelete(projectId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project.");
    }
  }

  return (
    <div className="app-bg app-shell" style={dashboardBgStyle}>
      <Sidebar onNewProject={() => setShowModal(true)} />

      <main className="app-main">
        <div className="app-container">
          <Outlet
            context={{
              refreshSignal,
              projects,
              loadingProjects,
              handleDelete,
              openNewProject: () => setShowModal(true),
            }}
          />
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

export default Dashboardlayout;