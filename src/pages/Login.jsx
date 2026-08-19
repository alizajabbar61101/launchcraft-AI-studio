import "../styles/login.css";
import heroBackground from "../assets/hero-background.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">

      <div
        className="auth-bg"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to continue using LaunchCraft AI Studio.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          {error && <p className="form-error">{error}</p>}

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Login
          </button>

          <p className="bottom-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default login;