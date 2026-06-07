import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "@/components/hero-section";
import { WaitlistModal } from "@/components/waitlist-modal";

// Mock the WaitlistModal component
jest.mock("@/components/waitlist-modal", () => ({
  WaitlistModal: jest.fn(({ isOpen, onClose }) => (
    isOpen ? (
      <div data-testid="waitlist-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )),
}));

describe("HeroSection", () => {
  it("renders the hero headline", () => {
    render(<HeroSection />);

    const headline = screen.getByText(/Your AI Notetaker/i);
    expect(headline).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    render(<HeroSection />);

    const subheadline = screen.getByText(/ClearNotes joins your meetings/i);
    expect(subheadline).toBeInTheDocument();
  });

  it("renders the primary CTA button", () => {
    render(<HeroSection />);

    const ctaButton = screen.getByText("Join the Waitlist");
    expect(ctaButton).toBeInTheDocument();
  });

  it("opens waitlist modal when CTA is clicked", () => {
    render(<HeroSection />);

    const ctaButton = screen.getByText("Join the Waitlist");
    fireEvent.click(ctaButton);

    expect(WaitlistModal).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: true }),
      expect.anything()
    );
  });

  it("renders the secondary CTA button", () => {
    render(<HeroSection />);

    const secondaryCta = screen.getByText("See How It Works");
    expect(secondaryCta).toBeInTheDocument();
  });

  it("displays trust indicators", () => {
    render(<HeroSection />);

    expect(screen.getByText(/No credit card required/i)).toBeInTheDocument();
    expect(screen.getByText(/2-minute setup/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel anytime/i)).toBeInTheDocument();
  });

  it("renders the beta badge", () => {
    render(<HeroSection />);

    const betaBadge = screen.getByText("Now in Private Beta");
    expect(betaBadge).toBeInTheDocument();
  });
});
