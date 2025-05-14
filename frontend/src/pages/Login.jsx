import React, { useState, useEffect } from "react";
import api from "../utils/axiosConfig";
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
    } else {
      setInfo(null);
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

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          username: response.data.username,
        })
      );
      localStorage.setItem("token", response.data.token);

      const from = location.state?.from?.pathname || "/recipes";
      navigate(from);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Login"
            width={72}
            height={72}
            className="mb-3"
          />
          <h2 className="mb-2">Login</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>
        {info && <div className="alert alert-info">{info}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoFocus
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">
            Don't have an account? <a href="/register">Register</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;