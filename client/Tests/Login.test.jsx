import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Login from "../src/pages/Login";

describe("Login Page", () => {
  it("renders Login heading", () => {
    render(<Login />);
    const heading = screen.getByText(/Login/i);
    expect(heading).toBeInTheDocument();
  });
});
