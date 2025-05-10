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
      // Register the user
      await axios.post("http://localhost:8080/api/users", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Then log them in
      const res = await axios.post("http://localhost:8080/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Store token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ username: res.data.username }));

      // Redirect to Recipes page
      navigate("/recipes");
    } catch (err) {
      console.error("Registration/Login failed:", err.response?.data || err.message);
      setError("Registration failed or username already exists.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Register & Login</button>
      </form>
    </div>
  );
};

export default Register;