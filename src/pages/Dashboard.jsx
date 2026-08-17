import { useOutletContext } from "react-router-dom";

import Header from "../components/dashboard/Header";
import ProjectCard from "../components/dashboard/ProjectCard";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  const { projects, loadingProjects, handleDelete, refreshSignal } = useOutletContext();

  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => (p.progress || 0) > 0 && (p.progress || 0) < 100).length;
  const avgProgress = totalProjects
    ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / totalProjects)
    : 0;

  return (
    <>
      <Header />

      <section className="dashboard-welcome">
        <h1 className="dashboard-title">Welcome back</h1>
        <p className="dashboard-subtitle">
          Continue building your next startup with AI.
        </p>
      </section>

      {totalProjects > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div>
              <div className="stat-value">{totalProjects}</div>
              <div className="stat-label">{totalProjects === 1 ? "Project" : "Total Projects"}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div>
              <div className="stat-value">{inProgress}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div>
              <div className="stat-value">{avgProgress}%</div>
              <div className="stat-label">Average Progress</div>
            </div>
          </div>
        </div>
      )}

      <section className="dashboard-projects">
        <div className="section-header">
          <div>
            <h2>Your Projects</h2>
            <p>Continue working on your products.</p>
          </div>
        </div>

        {loadingProjects ? (
          <p className="loading-text">Loading your projects...</p>
        ) : projects.length === 0 ? (
          <div className="empty-dashboard glass-card">
            <h3>No projects yet</h3>
            <p>Use the "+ New Project" button in the sidebar to start building with AI.</p>
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