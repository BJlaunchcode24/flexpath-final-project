import React from "react";
import { render, screen } from "@testing-library/react";
import AssignRecipes from "../AssignRecipes";
import '@testing-library/jest-dom';

describe("AssignRecipes", () => {
  it("renders the form and headings", () => {
    render(<AssignRecipes />);
    expect(screen.getByText(/Assign Recipes to Meal Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Meal Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Recipes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Assign Recipes/i })).toBeInTheDocument();
  });
});