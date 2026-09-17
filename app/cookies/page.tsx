import Link from "next/link"

const updated = "January 2025"

const sections = [
  {
    id: "overview",
    title: "What are cookies",
    paragraphs: [
      "Cookies are small text files placed on your device when you visit a website. They keep session state, remember preferences, and help us understand how visitors interact with our content.",
    ],
  },
  {
    id: "usage",
    title: "How we use cookies",
    paragraphs: [
      "Cookies help us deliver a calmer, more relevant experience. We use them to remember settings, measure performance, and spot opportunities to improve the journey.",
    ],
    bullets: [
      "Remember language, location, and accessibility preferences",
      "Understand which pages are most helpful so we can refine them",
      "Track performance and load times across different regions",
      "Provide content tailored to the context of your visit",
    ],
  },
  {
    id: "types",
    title: "Cookie types we use",
    subsections: [
      {
        heading: "Essential cookies",
        description: "Required for the site to function securely—such as maintaining sessions and protecting forms.",
      },
      {
        heading: "Analytics cookies",
        description: "Help us understand visit patterns, bounce rates, and navigation flows so we can improve usability.",
      },
      {
        heading: "Functionality cookies",
        description: "Support enhanced features like remembering communication preferences or saved content.",
      },
      {
        heading: "Marketing cookies",
        description: "Used on selected pages for campaign measurement and to keep outreach relevant.",
      },
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    paragraphs: [
      "We partner with carefully selected third parties that may set cookies when their features load. These providers maintain their own privacy policies and cookie controls.",
    ],
    bullets: [
      "Analytics platforms such as Google Analytics",
      "Embedded media and collaboration tools",
      "Marketing and event registration platforms",
      "Security and infrastructure partners",
    ],
  },
  {
    id: "manage",
    title: "Managing preferences",
    paragraphs: ["You are in control. You can:"],
    bullets: [
      "Adjust browser settings to block or delete cookies",
      "Use our on-site cookie banner to tailor optional categories",
      "Opt out of third-party advertising networks via industry tools",
    ],
    note: "Blocking certain cookies may impact functionality or limit personalised features.",
  },
  {
    id: "duration",
    title: "Cookie duration",
    paragraphs: [
      "Session cookies expire when you close your browser. Persistent cookies remain on your device until they expire or you delete them manually. We review retention periods regularly.",
    ],
  },
  {
    id: "updates",
    title: "Updates to this policy",
    paragraphs: [
      'We may refresh this policy to reflect changes in technology or regulation. Revisit this page to stay current—the "Last updated" date shows when the latest changes went live.',
    ],
  },
  {
    id: "contact",
    title: "Questions",
    paragraphs: [
      "Need clarity on how we use cookies or the choices available to you? Let our privacy team know and we will respond quickly.",
    ],
    actions: [
      {
        label: "privacy@ninjainfosys.com",
        href: "mailto:privacy@ninjainfosys.com",
      },
    ],
  },
]

export default function CookiesPage() {
  return (
    <main className="bg-ni-paper text-ni-ink">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ni-accent/10 via-transparent to-ni-accent/5" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 pt-28 pb-20">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-ni-accent hover:text-[#2563EB] transition-colors">
            ← Back to home
          </Link>
          <h1 className="mt-10 text-4xl sm:text-5xl font-heading font-bold text-balance">Cookie Policy</h1>
          <p className="mt-5 max-w-2xl text-lg text-ni-slate/80 leading-relaxed">
            A clear view on how cookies help us keep experiences consistent, measurable, and secure—plus the controls you
            have to manage them.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-ni-slate/50">Last updated · {updated}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 pb-24">
        <div className="grid gap-10 lg:grid-cols-[260px,1fr]">
          <nav className="top-28 hidden lg:block self-start rounded-2xl border border-ni-graphite/10 bg-white/60 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ni-slate/60">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-ni-slate/70 transition-colors hover:bg-ni-accent/10 hover:text-ni-accent"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-3xl border border-ni-graphite/10 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(15,98,254,0.3)]"
              >
                <h2 className="text-2xl font-heading font-semibold text-ni-ink">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-ni-slate/80">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 rounded-2xl border border-ni-graphite/10 bg-ni-graphite/5 p-4">
                      {section.bullets.map((item) => (
                        <li key={item} className="pl-5 text-sm text-ni-slate/80" style={{ textIndent: "-1.25rem" }}>
                          <span className="mr-2 text-ni-accent">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.subsections && (
                    <div className="grid gap-4">
                      {section.subsections.map((item) => (
                        <div key={item.heading} className="rounded-2xl border border-ni-graphite/10 bg-ni-graphite/5 p-5">
                          <h3 className="text-lg font-semibold text-ni-ink">{item.heading}</h3>
                          <p className="mt-2 text-sm text-ni-slate/80 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.note && (
                    <p className="rounded-2xl border border-ni-graphite/10 bg-ni-accent/5 px-4 py-3 text-sm text-ni-accent">
                      {section.note}
                    </p>
                  )}
                  {section.actions && (
                    <div className="flex flex-wrap gap-3">
                      {section.actions.map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          className="inline-flex items-center justify-center rounded-lg border border-ni-graphite/15 px-4 py-2 text-sm font-semibold text-ni-accent transition-colors hover:border-ni-accent hover:text-[#2563EB]"
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  )
}
