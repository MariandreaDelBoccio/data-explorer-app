import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/ui/Button/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("applies secondary variant styles when specified", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText("Secondary Button");
    expect(button).toHaveClass("bg-gray-200");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    const button = screen.getByText("Clickable");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  it("shows loading state when isLoading is true", () => {
    render(<Button isLoading>Loading Button</Button>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button isLoading>Loading Button</Button>);
    const loadingText = screen.getByText("Loading...");
    const button = loadingText.closest("button");
    expect(button).toBeDisabled();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText("Small")).toHaveClass("px-3 py-1.5 text-sm");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText("Large")).toHaveClass("px-6 py-3 text-lg");
  });

  it("merges custom className with default classes", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText("Custom");
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("font-medium");
  });
});
