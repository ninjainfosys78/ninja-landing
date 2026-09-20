export const env = {
  EMAIL_SMTP_USER: process.env.EMAIL_SMTP_USER || "technical.ninjainfosys@gmail.com",
  EMAIL_SMTP_PASS: process.env.EMAIL_SMTP_PASS || "",
  EMAIL_TO: process.env.EMAIL_TO || "technical.ninjainfosys@gmail.com",
  DCM_API_URL: process.env.DCM_API_URL || "",
  DCM_TENANT_SLUG: process.env.DCM_TENANT_SLUG || "",
  // The single DCM category this tenant's content (contact form, published
  // content lists like the trusted-by logos) lives under.
  DCM_CATEGORY_SLUG: process.env.DCM_CATEGORY_SLUG || "ninjainfosys",
};
