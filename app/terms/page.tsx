import Link from "next/link"
import { ArrowRight } from "lucide-react"

const updated = "January 2025"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      "By accessing or using the Ninja Infosys website and services, you agree to comply with these Terms of Service. If you do not agree, please discontinue use immediately.",
    ],
  },
  {
    id: "services",
    title: "Services description",
    paragraphs: [
      "We provide consulting services spanning strategy, transformation, technology, risk, and people advisory. Every engagement is governed by its own agreement. These Terms cover your use of our public website and digital experiences.",
    ],
  },
  {
    id: "use",
    title: "Use of website",
    paragraphs: ["You agree to use the site responsibly and not to:"],
    bullets: [
      "Infringe on the intellectual property or privacy rights of others",
      "Restrict or inhibit other users from accessing the site",
      "Attempt to gain unauthorised access to our systems",
      "Transmit malware, malicious code, or conduct security probes without consent",
      "Harvest data or personal information without explicit permission",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    paragraphs: [
      "All site content—including copy, visuals, and software—is owned by Ninja Infosys or our licensors and is protected by copyright, trademark, and related laws. You may not reproduce, distribute, or create derivative works without written consent.",
    ],
  },
  {
    id: "engagements",
    title: "Client engagements",
    paragraphs: [
      "Consulting services are delivered under separate engagement letters or contracts. These will always take precedence over any conflicting information contained on this site.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "We maintain strict confidentiality standards for client information. Any confidential materials shared with us are handled in accordance with engagement agreements and applicable law.",
    ],
  },
  {
    id: "warranties",
    title: "Disclaimer of warranties",
    paragraphs: [
      "The website and its content are provided \"as is\" without warranties of any kind. We do not warrant uninterrupted availability, error-free operation, or freedom from harmful components.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, Ninja Infosys is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or services.",
    ],
  },
  {
    id: "links",
    title: "Third-party links",
    paragraphs: [
      "Our website may link to external sites not operated by Ninja Infosys. We do not control and are not responsible for the content or practices of those sites. Access them at your own discretion.",
    ],
  },
  {
    id: "law",
    title: "Governing law",
    paragraphs: [
      "These Terms are governed by the laws of Nepal, without regard to conflict-of-law principles. All disputes fall under the exclusive jurisdiction of courts in Nepal.",
    ],
  },
  {
    id: "changes",
    title: "Changes to terms",
    paragraphs: [
      'We may update these Terms from time to time. The latest version is always available on this page, and the "Last updated" date will indicate when changes take effect.',
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "Have questions about these Terms or how they apply? Reach out to our legal team any time.",
    ],
    actions: [
      {
        label: "legal@ninjainfosys.com",
        href: "mailto:legal@ninjainfosys.com",
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: "var(--page-bg)", color: "#0b0d12" }}>
      <div className="relative overflow-hidden">
        <div className="relative z-5 mx-auto max-w-6xl px-6 sm:px-10 pt-10 lg:pt-28 pb-20">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-[#0b0d12]/60 hover:text-[#0b0d12] transition-colors">
            ← Back to home
          </Link>
          <h1 className="mt-10 text-4xl sm:text-5xl font-heading font-bold text-[#0b0d12]">Terms of Service</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#0b0d12] leading-relaxed">
            Clear expectations on how we operate, what we commit to, and how we partner responsibly with clients,
            collaborators, and visitors to our digital experiences.
          </p>
          <p className="pt-6 text-sm uppercase tracking-[0.22em] text-[#0b0d12]/60">Last updated · {updated}</p>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-24">
        <div className="grid gap-10 lg:grid-cols-[260px,1fr]">
          <nav className="top-28 hidden lg:block self-start rounded-none border border-[#0b0d12]/15 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0b0d12]">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm">
              {sections.map((section: any) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block px-3 py-2 text-[#0b0d12]/60 transition-colors hover:bg-transparent hover:text-[#0b0d12]"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="space-y-12">
            {sections.map((section: any) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-none border border-[#0b0d12]/15 bg-white p-8 shadow-none"
              >
                <h2 className="text-2xl font-heading font-semibold text-[#0b0d12]">{section.title}</h2>

                {section.bullets ? (
                  <div className="mt-4 grid gap-6 lg:grid-cols-[1fr,420px] items-start">
                    <div className="space-y-4 text-base leading-relaxed text-[#0b0d12]">
                      {section.paragraphs.map((paragraph: any) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {section.actions && (
                        <div className="flex flex-wrap gap-3">
                          {section.actions.map((action: any) => (
                            <Link
                              key={action.href}
                              href={action.href}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b0d12]/60 transition-colors hover:text-[#0b0d12] group"
                            >
                              <span>{action.label}</span>
                              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-[#0b0d12]/60" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <ul className="space-y-2 p-4" style={{ backgroundColor: "#FFFFFF" }}>
                        {section.bullets.map((item: any) => (
                          <li key={item} className="pl-5 text-sm text-[#0b0d12]" style={{ textIndent: "-1.25rem" }}>
                            <span className="mr-2 text-[#2563EB]">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-[#0b0d12]">
                    {section.paragraphs.map((paragraph: any) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.actions && (
                      <div className="flex flex-wrap gap-3">
                        {section.actions.map((action: any) => (
                          <Link
                            key={action.href}
                            href={action.href}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b0d12]/60 transition-colors hover:text-[#0b0d12] group"
                          >
                            <span>{action.label}</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-[#0b0d12]/60" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
      </div>
    </main>
  )
}
