import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation - replace this with actual authentication logic
    if (username === "admin" && password === "password") {
      onLogin(true);
      navigate("/admin/dashboard"); // Redirect to Dashboard
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cafe Admin Login
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
