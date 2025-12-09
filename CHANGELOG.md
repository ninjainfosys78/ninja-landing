# Changelog

## [v0.1.0] - 2025-11-10
### Overview

This first public release ships a lightweight, performance-focused marketing site built with Next.js (App Router) and TypeScript. The design emphasises a modern, glassy visual language with a plasma animated hero background, a transparent/blurry navigation bar that lets the hero gradient show through, and responsive, accessible UI components built with Tailwind CSS.

Key features in v0.1.0:
- Global layout, header and footer with CDN-hosted logo and favicon for fast loads.
- Client-side i18n toggle (English ↔ Nepali) with cookie-based persistence so UI strings (navigation, hero, read-more, etc.) update without a full page navigation.
- Blogs (Insights) listing and detail pages, with server-side data fetch for posts and a client wrapper for language-aware rendering.
- Solutions, About, Careers, Privacy and Terms pages with localized UI strings and consistent dark theme styles where requested.
- Polished navigation UX: static header that scrolls with the page, a centered mega-menu for Solutions, and a mobile-friendly collapsible menu.
- Accessibility and performance considerations: semantic markup, keyboard handling for menus, and careful use of blur/opacity to maintain text contrast over backgrounds.

Technical notes:
- Built with Next.js App Router and TypeScript. Styling via Tailwind CSS utilities. Icons from lucide-react.
- The site is configured for static export where possible; language persistence is handled client-side to remain compatible with static rendering.
- Future work: add unit/integration tests, pre-render additional pages where beneficial, and add a small e2e smoke test for the critical path.

This release captures the initial visual and content surface for the site and lays the groundwork for iterative improvements and content publishing workflows.

## [v0.1.1] – 2025-12-04
### Overview

This release introduces full PocketBase backend integration across the Ninja Infosys website, enabling non-developer-friendly content management.

Key improvements

Integrated PocketBase as the backend for:
- Blogs (Insights)
- Media libraries
- Dynamic banners (hero + secondary banners)
- Solutions cards registry

Implemented `getBannerByImgName()` and reusable PocketBase client.

- About page now supports dynamic second banner (`about-2`).
- Centralized API access in `/lib/pocketbase.ts`.
- Updated UI components to gracefully fallback when no PB records exist.
- Improved banner loading performance via PocketBase file URLs.

Technical changes
- Added `NinjaInfosys_Banner` collection usage for all hero + secondary banners.
- Added `NinjaInfosys_Solutions` collection usage for Solutions Cards.
- Blogs now fully dynamic: title, category, description, thumbnail, long content, slug.
- Removed hardcoded assets for cards and banner images.
- Updated all pages to match the unified PocketBase data structure.

## [v0.1.3] – 2025-12-09
### Overview

This release focuses on **SEO enhancements and performance improvements**, with special attention to the Solutions page and Core Web Vitals. The goal is to make the marketing site more discoverable in search engines while keeping the UX fast and stable, especially on mobile.

### SEO and metadata improvements

- Added and refined page-level metadata for `/solutions` using Next.js App Router `metadata` export:
  - Descriptive `<title>` and `<meta name="description">` tuned for “Solutions”, “web/mobile development”, and “e-governance solutions”.
  - Canonical URL (`https://ninjainfosys.com/solutions`) to avoid duplicate-content issues.
  - Open Graph data for rich previews on social platforms (Facebook, LinkedIn, etc.).
  - Twitter Card configuration for large-image previews when sharing links.
- Ensured hero and card images on the Solutions page include meaningful `alt` text derived from localized titles to improve accessibility and image SEO.
- Cleaned up metadata placement so it lives on server components (App Router pages/layouts), aligning with Next.js recommendations and crawlers’ expectations.

### Performance & Core Web Vitals

- Refactored `/solutions` into a **server + client split**:
  - Server component (`app/(nav)/solutions/page.tsx`) now fetches banner and Solutions cards on the server, sending ready-to-render HTML.
  - Client component (`SolutionsClient`) handles interactive state only (language toggle, filters, modals), reducing client-side data fetching and JavaScript work.
- Optimized images:
  - Switched hero and card images on Solutions to use `next/image` with tuned quality settings for smaller payloads while keeping visual quality.
  - Ensured appropriate `sizes` hints for responsive image loading on mobile vs desktop.
- Reduced JavaScript work on initial load:
  - Lazy-loaded heavier client-only components like `ProjectsGrid`, `SearchOverlay`, and `OfficesModal` using `next/dynamic`, so they only hydrate when actually needed.
  - Avoided mounting modal trees until opened, cutting down on initial hydration cost and Total Blocking Time.
- Improved LCP and Speed Index for the Solutions page, especially on mobile, by:
  - Prioritizing the banner image with `priority` and `fetchPriority="high"`.
  - Serving the main content above the fold via server-rendered HTML instead of client-only rendering.

### Developer experience and architecture

- Kept the routing and release process compatible with static export and existing `dynamic = "error"` constraints by moving query-parameter handling (`?cat=`) into the client side where necessary.
- Centralized Solutions copy (EN/NE) into a single content structure, making it easier to evolve copy and translations while keeping the component tree predictable.
- Prepared the codebase for future SEO work (sitemap/robots, per-industry detail routes) without breaking the current release flow.
