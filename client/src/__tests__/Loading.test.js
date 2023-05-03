import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loader Tests", () => {
  it("Should correctly render the loader with styles", () => {
    render(<Loading />);

    const loadingContainer = screen.getByTestId("loadingtest");
    expect(loadingContainer).toHaveClass("loading");
    /*expect(loadingContainer.childNodes.length).toBe(5);
    loadingContainer.childNodes.forEach((rect, i) => {
      expect(rect.innerHTML).toBe('');
      expect(rect).toHaveClass(`rect${i+1}`);
    });*/
  });
});
