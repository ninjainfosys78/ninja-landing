import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy tokens (kept for backward compat)
        ni: {
          ink: "#0b0d12",
          paper: "#ffffff",
          graphite: "#1f2430",
          slate: "#2c3242",
          accent: "#2563EB",
          "accent-2": "#E31B23",
        },
        // Brand tokens used by new McKinsey-style components
        brand: {
          blue:      "#2563EB",
          red:       "#E31B23",
          navy:      "#0b0d12",
          vividBlue: "#2563EB",
        },
      },
      fontFamily: {
        sans:    ["var(--font-body)",    "IBM Plex Sans", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-heading)", "Source Serif 4", "ui-serif", "Georgia"],
        serif:   ["var(--font-heading)", "Source Serif 4", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [typography],
} satisfies Config
