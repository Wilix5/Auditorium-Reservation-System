import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Reserve from "../src/pages/Reserve";

describe("Reserve Page", () => {
  it("renders reserve form", () => {
    render(<Reserve />);
    const heading = screen.getByText(/Reserve Auditorium/i);
    expect(heading).toBeInTheDocument();
  });
});
