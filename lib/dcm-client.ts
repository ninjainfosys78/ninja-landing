import { env } from "@/lib/env";

interface SubmitDcmContactInput {
  fullName: string;
  email?: string;
  phoneNumber?: string;
  message: string;
}

/**
 * Submits a contact-form entry to the backend's public DCM API so it shows
 * up under the "Ninja Infosys" contact category in the DCM admin panel.
 * Returns false (never throws) so a DCM outage can't block the contact form.
 */
export const submitDcmContact = async ({
  fullName,
  email,
  phoneNumber,
  message,
}: SubmitDcmContactInput): Promise<boolean> => {
  if (!env.DCM_API_URL || !env.DCM_TENANT_SLUG) {
    console.warn("DCM contact submission skipped: DCM_API_URL/DCM_TENANT_SLUG not configured");
    return false;
  }

  try {
    const res = await fetch(
      `${env.DCM_API_URL}/api/public/dcm/${env.DCM_CONTACT_CATEGORY_SLUG}/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Slug": env.DCM_TENANT_SLUG,
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email || null,
          phone_number: phoneNumber || null,
          message,
        }),
      }
    );

    if (!res.ok) {
      console.error("DCM contact submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("DCM contact submission error:", error);
    return false;
  }
};
