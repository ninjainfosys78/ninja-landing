import { NextResponse } from "next/server";
import { sendEmailNotification } from "@/lib/mail";
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

    console.log("Validated Contact Request:", formData);

    try {
      const subject = `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`;
      const { buildEmailTemplate } = await import("@/lib/mail");
      const html = buildEmailTemplate("New Contact Form Submission", {
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Consent Provided": formData.consent ? 'Yes' : 'No',
        "Message": formData.message || "N/A",
      });
      const text = `New Contact Form Submission\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nConsent Provided: ${formData.consent ? 'Yes' : 'No'}\nMessage: ${formData.message || "N/A"}`;
      
      const emailRes = await sendEmailNotification(subject, text, html);

      const dcmMessage = formData.consent
        ? formData.message || "N/A"
        : `${formData.message || "N/A"}\n\n(Consent not given)`;
      const dcmRes = await submitDcmContact({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: dcmMessage,
      });

      if (!emailRes && !dcmRes) {
        return NextResponse.json({ error: "Failed to submit contact form." }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } catch (err: any) {
      console.error("Email Sending Error:", err);
      return NextResponse.json(
        { error: "Internal server error while sending email." },
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
