import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WaitlistForm } from "@/components/waitlist-form";

// Mock fetch
global.fetch = jest.fn();

describe("WaitlistForm", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders the form heading", () => {
    render(<WaitlistForm />);

    const heading = screen.getByText("Join the Waitlist");
    expect(heading).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<WaitlistForm />);

    const emailInput = screen.getByPlaceholderText("Work email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toBeRequired();
  });

  it("renders name input (optional)", () => {
    render(<WaitlistForm />);

    const nameInput = screen.getByPlaceholderText("Your name (optional)");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).not.toBeRequired();
  });

  it("renders GDPR consent checkbox", () => {
    render(<WaitlistForm />);

    const gdprCheckbox = screen.getByLabelText(/I agree to receive product updates/i);
    expect(gdprCheckbox).toBeInTheDocument();
    expect(gdprCheckbox).toBeRequired();
  });

  it("shows error when submitting without email", async () => {
    render(<WaitlistForm />);

    const submitButton = screen.getByText("Join the Waitlist");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please provide your email/i)).toBeInTheDocument();
    });
  });

  it("shows error when submitting without GDPR consent", async () => {
    render(<WaitlistForm />);

    const emailInput = screen.getByPlaceholderText("Work email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByText("Join the Waitlist");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please provide your email/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<WaitlistForm />);

    const emailInput = screen.getByPlaceholderText("Work email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const gdprCheckbox = screen.getByLabelText(/I agree to receive product updates/i);
    fireEvent.click(gdprCheckbox);

    const submitButton = screen.getByText("Join the Waitlist");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/waitlist",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });

  it("shows success message after successful submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<WaitlistForm />);

    const emailInput = screen.getByPlaceholderText("Work email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const gdprCheckbox = screen.getByLabelText(/I agree to receive product updates/i);
    fireEvent.click(gdprCheckbox);

    const submitButton = screen.getByText("Join the Waitlist");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
    });
  });
});
