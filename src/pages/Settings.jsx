import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  async function handleLogoutEverywhere() {
    // NOTE: wire this to your actual Supabase scope: 'global' sign-out
    // call once you confirm the method name in your auth setup.
    await signOut();
    navigate("/");
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account, notifications, and preferences.</p>
      </div>

      <div className="settings-section">
        <h2>Profile</h2>

        <div className="settings-row" style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
          <span className="settings-row-label">Full name</span>
          <input
            className="settings-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="settings-row" style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
          <span className="settings-row-label">Email</span>
          <input
            className="settings-field"
            value={user?.email || ""}
            disabled
          />
          <span className="settings-row-desc">Contact support to change your account email.</span>
        </div>

        <button className="settings-save-btn" style={{ marginTop: "10px" }}>
          Save Changes
        </button>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Email notifications</div>
            <div className="settings-row-desc">Get notified when your AI blueprint is ready.</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
            />
            <span className="toggle-track"></span>
          </label>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Product updates</div>
            <div className="settings-row-desc">Occasional emails about new LaunchCraft features.</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={productUpdates}
              onChange={(e) => setProductUpdates(e.target.checked)}
            />
            <span className="toggle-track"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account</h2>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Log out of all devices</div>
            <div className="settings-row-desc">Sign out everywhere you're currently logged in.</div>
          </div>
          <button className="settings-danger-btn" onClick={handleLogoutEverywhere}>
            Log Out Everywhere
          </button>
        </div>
      </div>

      <div className="settings-section settings-danger">
        <h2>Danger Zone</h2>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Delete account</div>
            <div className="settings-row-desc">Permanently delete your account and all projects. This cannot be undone.</div>
          </div>
          <button
            className="settings-danger-btn"
            onClick={() => {
              // NOTE: wire this to your actual account-deletion endpoint
              // once it exists — intentionally not calling anything
              // destructive without a real confirmation flow backing it.
              alert("Account deletion isn't wired up yet — connect this to your backend when ready.");
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;