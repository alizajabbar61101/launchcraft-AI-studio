import { useEffect, useState } from "react";
import { getActivities } from "../../lib/activityService";

function RecentActivity({ refreshKey }) {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        loadActivities();
    }, [refreshKey]);


    async function loadActivities() {

        try {

            const data = await getActivities();

            setActivities(data);

        } catch (err) {

            console.error(
                "Failed to load activities:",
                err
            );

        }

    }


    return (

        <section className="activity-card">

            <div className="activity-header">

                <div>

                    <h2>
                        Recent Activity
                    </h2>

                    <p>
                        Your latest project activity.
                    </p>

                </div>

            </div>


            {activities.length === 0 ? (

                <p className="activity-empty">
                    No activity yet.
                </p>

            ) : (

                <ul className="activity-list">

                    {activities.map((activity) => (

                        <li
                            key={activity.id}
                            className="activity-item"
                        >

                            <span className="activity-icon">
                                ✓
                            </span>

                            <span>
                                {activity.title}
                            </span>

                        </li>

                    ))}

                </ul>

            )}

        </section>

    );
}

export default RecentActivity;