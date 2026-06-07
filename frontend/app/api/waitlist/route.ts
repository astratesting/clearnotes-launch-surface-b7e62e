import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface WaitlistEntry {
  email: string;
  name?: string;
  gdprConsent: boolean;
  createdAt: string;
}

// In-memory store (replace with database in production)
const waitlist: WaitlistEntry[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, gdprConsent } = body;

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!gdprConsent) {
      return NextResponse.json(
        { error: "GDPR consent is required" },
        { status: 400 }
      );
    }

    // Check for duplicates
    if (waitlist.some((entry) => entry.email === email)) {
      return NextResponse.json(
        { error: "Email already on waitlist" },
        { status: 409 }
      );
    }

    // Add to waitlist
    const entry: WaitlistEntry = {
      email,
      name,
      gdprConsent,
      createdAt: new Date().toISOString(),
    };
    waitlist.push(entry);

    // Send confirmation email (if Resend is configured)
    if (resend) {
      try {
        await resend.emails.send({
          from: "ClearNotes <hello@clearnotes.ai>",
          to: email,
          subject: "Welcome to ClearNotes Waitlist",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #7EC8E3; font-family: Georgia, serif;">Welcome to ClearNotes</h1>
              <p>Hi ${name || "there"},</p>
              <p>You're now on the waitlist for ClearNotes - the calm AI meeting notetaker.</p>
              <p>We'll email you when your spot is ready. In the meantime, follow us for updates.</p>
              <p style="color: #666; font-size: 14px;">You can unsubscribe anytime by clicking unsubscribe in our emails.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined waitlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  return NextResponse.json({ count: waitlist.length, entries: waitlist });
}
