import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Dashboard from "../src/pages/Dashboard";

describe("Dashboard Page", () => {
  it("renders welcome message", () => {
    render(<Dashboard />);
    const heading = screen.getByText(/Welcome/i);
    expect(heading).toBeInTheDocument();
  });
});
