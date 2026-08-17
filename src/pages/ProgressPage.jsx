import { useOutletContext } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";

function ProgressPage() {
  const { projects, loadingProjects, handleDelete } = useOutletContext();

  if (loadingProjects) {
    return (
      <div className="my-projects-page">
        <p className="loading-text">Loading progress...</p>
      </div>
    );
  }

  // Most progress first — reads like a quick "what's closest to done" view
  const sorted = [...projects].sort((a, b) => (b.progress || 0) - (a.progress || 0));

  return (
    <div className="my-projects-page">
      <div className="my-projects-header">
        <div>
          <h1>Project Progress</h1>
          <p>See how far along each of your builds is, at a glance.</p>
        </div>

        <span className="project-count">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-projects glass-card">
          <h2>Nothing to track yet</h2>
          <p>Once you create a project, its progress will show up here.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {sorted.map((project) => (
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

export default ProgressPage;