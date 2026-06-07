import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "@/components/navigation";

describe("Navigation", () => {
  it("renders the logo and brand name", () => {
    render(<Navigation />);

    const logo = screen.getByLabelText(/clearnotes/i);
    expect(logo).toBeInTheDocument();

    const brandName = screen.getByText("ClearNotes");
    expect(brandName).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navigation />);

    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("How it Works")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders waitlist CTA button", () => {
    render(<Navigation />);

    const ctaButton = screen.getByText("Join Waitlist");
    expect(ctaButton).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(menuButton);

    // Mobile menu should be visible
    expect(screen.getByText("Features")).toBeVisible();
  });

  it("applies scrolled styles when page is scrolled", () => {
    render(<Navigation />);

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("bg-soft-white/95");
  });
});
