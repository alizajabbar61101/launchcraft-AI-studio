import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  getProjects,
  deleteProject,
} from "../../lib/projectService";

import ProjectCard from "./ProjectCard";
import "../../styles/MyProjects.css";

function MyProjects() {
  const { refreshSignal } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [refreshSignal]);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
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
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project.");
    }
  }

  if (loading) {
    return (
      <div className="my-projects-page">
        <p className="loading-text">Loading your projects...</p>
      </div>
    );
  }

  return (
    <div className="my-projects-page">
      <div className="my-projects-header">
        <div>
          <h1>My Projects</h1>
          <p>Manage and continue building your products.</p>
        </div>

        <span className="project-count">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"}
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="empty-projects glass-card">
          <h2>No projects yet</h2>
          <p>Create your first project and start building with AI.</p>
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
    </div>
  );
}

export default MyProjects;