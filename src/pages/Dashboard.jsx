import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import Header from "../components/dashboard/Header";
import ProjectCard from "../components/dashboard/ProjectCard";
import RecentActivity from "../components/dashboard/RecentActivity";

import {
  getProjects,
  deleteProject,
} from "../lib/projectService";

import "../styles/dashboard.css";

function Dashboard() {
  const { refreshSignal, openNewProject } = useOutletContext();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, [refreshSignal]);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
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
    <>
      <Header />

      <section className="dashboard-welcome">
        <h1 className="dashboard-title">Welcome back 👋</h1>
        <p className="dashboard-subtitle">
          Continue building your next startup with AI.
        </p>
      </section>

      <section className="dashboard-projects">
        <div className="section-header">
          <div>
            <h2>Your Projects</h2>
            <p>Continue working on your products.</p>
          </div>

          <button className="new-project-btn" onClick={openNewProject}>
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="empty-dashboard glass-card">
            <h3>No projects yet</h3>
            <p>Create your first project and start building with AI.</p>
            <button className="new-project-btn" onClick={openNewProject}>
              + Create Your First Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <RecentActivity refreshKey={refreshSignal} />
    </>
  );
}

export default Dashboard;