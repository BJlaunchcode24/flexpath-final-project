import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Use relative URLs so axiosInstance baseURL works
      await axios.post("/users", form, {
        headers: { "Content-Type": "application/json" },
      });
      const res = await axios.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          username: res.data.username,
          role: res.data.role,
        })
      );

      navigate("/recipes");
    } catch (err) {
      console.error("Registration/Login failed:", err.response?.data || err.message);
      setError("Registration failed or username already exists.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Register"
            width={72}
            height={72}
            className="mb-3"
          />
          <h2 className="mb-2">Register</h2>
          <p className="text-muted">Create your account</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
              placeholder="Choose a username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Register &amp; Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">
            Already have an account? <a href="/login">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;