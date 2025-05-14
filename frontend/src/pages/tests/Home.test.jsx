import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import '@testing-library/jest-dom';

describe("Home", () => {
  it("renders the welcome heading and main sections", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to the Recipe & Meal Planner App/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse & Create Recipes/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Your Meals/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Recipe/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Meal Plan/i })).toBeInTheDocument();
    expect(screen.getByText(/Built with React, Bootstrap, and Spring Boot/i)).toBeInTheDocument();
  });
});