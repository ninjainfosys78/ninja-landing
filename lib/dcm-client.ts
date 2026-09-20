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
      `${env.DCM_API_URL}/api/public/dcm/${env.DCM_CATEGORY_SLUG}/contact`,
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

export interface DcmSubContentSummary {
  id: string;
  slug: string;
  name: string;
  eng_name: string | null;
  description: string | null;
  eng_description: string | null;
  published_date: string | null;
}

export interface DcmFileItem {
  file_url: string;
}

export interface DcmSubContentDetail extends DcmSubContentSummary {
  files?: DcmFileItem[];
}

export interface DcmContentSummary {
  name: string;
  eng_name: string | null;
}

/**
 * Fetches a path under the DCM public API and returns its `data` field, or
 * null on any failure (missing config, network error, non-2xx). Server-side
 * only — DCM_API_URL/DCM_TENANT_SLUG aren't exposed to the browser bundle.
 */
async function fetchDcmPublic<T>(path: string): Promise<T | null> {
  if (!env.DCM_API_URL || !env.DCM_TENANT_SLUG) {
    console.warn("DCM fetch skipped: DCM_API_URL/DCM_TENANT_SLUG not configured");
    return null;
  }

  try {
    const res = await fetch(`${env.DCM_API_URL}${path}`, {
      headers: { "X-Tenant-Slug": env.DCM_TENANT_SLUG },
      // File URLs in this response are presigned and expire in 15 minutes
      // (see backend), so this response must never be cached — otherwise
      // pages serve a dead image URL once the signature expires.
      cache: "no-store",
    });
    if (!res.ok) {
      // 404 is an expected, non-fatal state here — it just means the
      // category/content/sub-content hasn't been created in DCM yet, and
      // callers already fall back to placeholder content for it.
      if (res.status !== 404) {
        console.error("DCM fetch failed:", path, res.status);
      }
      return null;
    }
    const json = await res.json();
    return (json?.data as T) ?? null;
  } catch (error) {
    console.error("DCM fetch error:", path, error);
    return null;
  }
}

/**
 * Lists the active sub-content items under a "list"-type DCM content.
 * `items` is absent when the content exists but isn't content_type "list"
 * (e.g. created as "single" by mistake) — the backend only includes it for
 * list-type content.
 */
export const fetchDcmContentList = (contentSlug: string) =>
  fetchDcmPublic<{ content: DcmContentSummary; items?: DcmSubContentSummary[] }>(
    `/api/public/dcm/${env.DCM_CATEGORY_SLUG}/${contentSlug}`
  );

/** Fetches one sub-content item, including its attached files. */
export const fetchDcmSubContent = (contentSlug: string, subContentSlug: string) =>
  fetchDcmPublic<{ item: DcmSubContentDetail }>(
    `/api/public/dcm/${env.DCM_CATEGORY_SLUG}/${contentSlug}/${subContentSlug}`
  );
