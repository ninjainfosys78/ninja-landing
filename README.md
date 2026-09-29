# Ninja Infosys — Global Consulting

The marketing site for Ninja Infosys, a global consulting company. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Content**: Live content (team, partners, insights/blogs, contact form submissions) comes from an external DCM (content management) API and a PocketBase instance for banners/testimonials — not embedded JSON.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Node `>=18.18 <21` is declared in `package.json`'s `engines` field, but this isn't enforced by npm — installing/running with a newer Node version works in practice, it's just outside the officially declared range.

### Environment variables

None of these are strictly required to run the site locally — every integration below degrades gracefully to fallback/dummy content or a no-op if its variables are missing. But without them, you're not looking at the real content, and the contact/booking/quote/subscribe forms silently won't deliver anywhere.

| Variable | Used for | If missing |
|---|---|---|
| `DCM_API_URL` | Base URL of the DCM content API (team, partners, insights, contact submissions) | Defaults to `https://ninjainfosys.app.eshasan.com` |
| `DCM_TENANT_SLUG` | DCM tenant identifier | Defaults to `"ninjainfosys"` |
| `DCM_CATEGORY_SLUG` | DCM content category (defaults to `"ninjainfosys"`) | Uses the default; only needs overriding for a different tenant setup |
| `NEXT_PUBLIC_PB_URL` | Base URL of the PocketBase instance (banners, testimonials) | Defaults to `https://cms.ninjainfosys.com` |
| `EMAIL_SMTP_USER` | SMTP account used to send contact-form notification emails | Defaults to a hardcoded Ninja Infosys address |
| `EMAIL_SMTP_PASS` | SMTP password/app-password for that account | Defaults to empty — email sending will fail auth silently (caught, logged, doesn't crash the request) |
| `EMAIL_TO` | Notification recipient address | Defaults to a hardcoded Ninja Infosys address |

Create a `.env.local` (gitignored, not committed) with whichever of these you need.

## ⚠️ Deployment note: static export vs. API routes

`next.config.js` currently sets `output: 'export'`, which builds the site as a fully static bundle with **no server** — this is what makes it deployable to plain static hosts like Cloudflare Pages (static mode), S3, etc.

However, the site also has 4 live server API routes:
- `app/api/contact/route.ts`
- `app/api/booking/route.ts`
- `app/api/quote/route.ts`
- `app/api/subscribe/route.ts`

**Static export and server API routes are incompatible.** `npm run build` succeeds and only warns, but the API routes are not included in the exported `out/` directory — verified directly, they're absent from the build output. If this site is deployed as a static export to a host with no server runtime, **the contact form, booking, quote request, and newsletter signup will not work** (requests to those endpoints will 404).

Before deploying, whoever owns hosting needs to pick one:
1. **Run it as a server app instead of static export** — remove/change `output: 'export'` and deploy to a host that runs Next.js as a server (Vercel, Cloudflare Pages in Functions/SSR mode, a Node host, etc.).
2. **Keep it fully static** and point those 4 forms at an external endpoint instead of Next's own API routes (a separate serverless function, a form backend service, etc.).

This isn't a "works on my machine" issue — it reproduces identically on any machine/environment, since it comes from the build configuration itself, not local setup.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory (see the deployment note above before relying on this for a site that needs the contact/booking/quote/subscribe forms to work).

## Design System

### Colors

- **Ink**: `#0B0D12` (primary text)
- **Paper**: `#FFFFFF` (background)
- **Graphite**: `#1F2430` (secondary text)
- **Slate**: `#2C3242` (muted text)
- **Accent**: `#0F62FE` (primary brand)
- **Accent 2**: `#7A5AF8` (secondary brand)

### Typography

- **Headings**: Inter Tight / Work Sans (600-700)
- **Body**: Inter (400-500)
- **Editorial**: Source Serif Pro (italic, sparingly)

### Accessibility

- WCAG 2.2 AA compliant
- Semantic HTML landmarks
- Visible focus indicators
- 44px minimum tap targets
- Respects `prefers-reduced-motion`
- Skip-to-content link
- Proper ARIA labels and roles

## License

© Ninja Infosys. All rights reserved.
