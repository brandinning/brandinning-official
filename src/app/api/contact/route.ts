import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, message } = body;

    // Server-side validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, message: "Name, email, and phone are required fields." },
        { status: 422 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    // In production, send via Resend, SendGrid, Nodemailer, or webhook:
    // e.g., await resend.emails.send({ to: 'hello@brandinning.com', subject: 'New Lead', ... });
    console.log("[BrandInning Inbound Lead]:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      company: company || "N/A",
      service,
      budget,
      message: message || "No message provided",
    });

    return NextResponse.json({
      ok: true,
      message: "Your proposal request has been received. Our team will contact you shortly.",
      referenceId: "BI-" + Date.now().toString(36).toUpperCase().slice(-6),
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
