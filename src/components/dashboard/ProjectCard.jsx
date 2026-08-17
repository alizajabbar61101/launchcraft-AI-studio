import { useNavigate } from "react-router-dom";

function ProjectCard({ project, onDelete }) {
    const navigate = useNavigate();
    const progress = project.progress || 0;

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="project-card">

            <div className="project-top">

                <div>
                    <h2>{project.name}</h2>

                    <p>
                        {project.idea}
                    </p>
                </div>

                {/* Circular ring — a second way to read progress at a
                    glance, alongside the linear bar below */}
                <div className="progress-ring-wrap">
                    <svg className="progress-ring" width="60" height="60" viewBox="0 0 60 60">
                        <circle className="progress-ring-track" cx="30" cy="30" r={radius} />
                        <circle
                            className="progress-ring-fill"
                            cx="30" cy="30" r={radius}
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: offset,
                            }}
                        />
                    </svg>
                    <span className="progress-ring-label">{progress}%</span>
                </div>

            </div>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                ></div>

            </div>


            <button
                className="open-project-btn"
                onClick={() =>
                    navigate(`/workspace/${project.id}`)
                }
            >
                Open Workspace →
            </button>


            <button
                className="delete-project-btn"
                onClick={() =>
                    onDelete(project.id)
                }
            >
                🗑 Delete Project
            </button>

        </div>
    );
}

export default ProjectCard;