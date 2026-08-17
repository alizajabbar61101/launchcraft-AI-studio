import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getActivities } from "../lib/activityService";

function ActivityPage() {
  const navigate = useNavigate();
  const { refreshSignal } = useOutletContext();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [refreshSignal]);

  async function loadActivities() {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error("Failed to load activities:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="loading-text">Loading activity...</p>;
  }

  return (
    <>
      <div className="activity-page-header">
        <div>
          <h1>Recent Activity</h1>
          <p>Keep track of everything happening across your projects.</p>
        </div>

        <span className="activity-count">{activities.length} activities</span>
      </div>

      {activities.length === 0 ? (
        <div className="empty-activity glass-card">
          <h2>No activity yet</h2>
          <p>Your project activity will appear here as you build.</p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div
              className="activity-item"
              key={activity.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (activity.project_id) {
                  navigate(`/workspace/${activity.project_id}`);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && activity.project_id) {
                  navigate(`/workspace/${activity.project_id}`);
                }
              }}
            >
              <div className="activity-icon">✓</div>

              <div className="activity-content">
                <h3>{activity.title}</h3>
                <span>{new Date(activity.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ActivityPage;