import React from "react";
import { render, screen } from "@testing-library/react";
import CreateRecipe from "../CreateRecipe";
import '@testing-library/jest-dom';

vi.mock("../utils/axiosInstance", () => ({
  get: vi.fn(() => Promise.resolve({ data: [] })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
  put: vi.fn(() => Promise.resolve({ data: {} })),
  delete: vi.fn(() => Promise.resolve({ data: {} })),
}));

describe("CreateRecipe", () => {
  it("renders the form and headings", () => {
    render(<CreateRecipe />);
    expect(screen.getByText(/Create New Recipe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cooking Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make this recipe public/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Recipe/i })).toBeInTheDocument();
  });
});