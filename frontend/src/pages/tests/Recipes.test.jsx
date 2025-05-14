import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Recipes from "../Recipes";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import axios from "../../utils/axiosInstance";
vi.mock("../../utils/axiosInstance", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [
      {
        id: 1,
        name: "Test Recipe",
        ingredients: "Eggs, Flour",
        instructions: "Mix and cook.",
        cookingTime: 10,
        isPublic: true,
        createdAt: new Date().toISOString(),
      }
    ] })),
    delete: vi.fn(() => Promise.resolve({})),
  }
}));

beforeEach(() => {
  localStorage.setItem("token", "test-token");
});
afterEach(() => {
  localStorage.clear();
});

describe("Recipes", () => {
  it("renders recipes and search/clear buttons", async () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );
    expect(await screen.findByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("calls delete when delete button is clicked", async () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );
    await screen.findByText("Test Recipe");
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });
});