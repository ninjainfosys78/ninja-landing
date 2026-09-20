import { NextResponse } from "next/server";
import { submitDcmContact } from "@/lib/dcm-client";
import { z } from "zod";

// Define a schema for input validation
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().max(1000).optional(),
  consent: z.boolean().optional(),
  website: z.string().max(0).optional(), // Honeypot field - must be empty
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    
    // 1. Validate with Zod
    const validation = contactSchema.safeParse(rawData);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validation.error.format() },
        { status: 400 }
      );
    }

    const formData = validation.data;

    // 2. Honeypot check (extra layer of protection)
    if (formData.website) {
      console.warn("Honeypot triggered by bot:", formData);
      // Silently fail or return 200 to trick the bot, but here we'll just return 200
      return NextResponse.json({ success: true }); 
    }

    try {
      const dcmMessage = formData.consent
        ? formData.message || "N/A"
        : `${formData.message || "N/A"}\n\n(Consent not given)`;

      const dcmRes = await submitDcmContact({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: dcmMessage,
      });

      if (!dcmRes) {
        return NextResponse.json({ error: "Failed to submit contact form." }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } catch (err: any) {
      console.error("Contact submission error:", err);
      return NextResponse.json(
        { error: "Internal server error while submitting contact form." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Internal Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    )
  }
}
