import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let username = "";
  try {
    const payload = JSON.parse(atob(token?.split(".")[1] || ""));
    username = payload.sub;
  } catch {}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Meal Planner</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/recipes">Recipes</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/mealplans">Meal Plans</Link></li>
        </ul>
        <ul className="navbar-nav">
          {token ? (
            <>
              <li className="nav-item"><span className="nav-link">Hi, {username}</span></li>
              <li className="nav-item"><button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;