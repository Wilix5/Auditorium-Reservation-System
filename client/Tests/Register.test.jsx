import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Register from "../src/pages/Register";

describe("Register Page", () => {
  it("renders Register heading", () => {
    render(<Register />);
    const heading = screen.getByText(/Register/i);
    expect(heading).toBeInTheDocument();
  });
});
