import "../styles/signup.css";
import heroBackground from "../assets/hero-background.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await signUp(email, password);

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists. Please log in instead.");
        return;
      }

      setMessage("Account created! Check your email to confirm before logging in.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">

      <div
        className="auth-bg"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>

      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Start building products with LaunchCraft AI Studio.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-submit-btn">
            Create Account
          </button>

          <p className="bottom-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default signup;