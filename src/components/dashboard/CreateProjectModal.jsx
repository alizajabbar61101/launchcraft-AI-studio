import { useState } from "react";
import { createProject } from "../../lib/projectService";
import { addActivity } from "../../lib/activityService";

function CreateProjectModal({ onClose, onProjectCreated }) {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !idea || !audience) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const project = await createProject({
        name,
        idea,
        audience,
      });

      await addActivity(
        project.id,
        `Created project "${project.name}"`
      );

      onProjectCreated(project);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to create project.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Create New Project</h2>

        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Describe your startup idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <input
          placeholder="Target Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />

        <div className="modal-buttons">

          <button onClick={onClose}>
            Cancel
          </button>

          <button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default CreateProjectModal;