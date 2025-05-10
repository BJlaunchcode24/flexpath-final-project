import React, { useState, useEffect } from "react";
import api from "../utils/axiosConfig"; // ✅ use api instead of axios
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setInfo(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      const from = location.state?.from?.pathname || "/recipes";
      navigate(from);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      {info && <div className="alert alert-info">{info}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
