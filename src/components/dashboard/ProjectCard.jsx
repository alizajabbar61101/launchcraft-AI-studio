import "../../styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="project-card">

            <div className="project-top">

                <div>
                    <h2>{project.name}</h2>

                    <p>
                        {project.idea}
                    </p>
                </div>

                <span className="progress-percent">
                    {project.progress || 0}%
                </span>

            </div>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${project.progress || 0}%`
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