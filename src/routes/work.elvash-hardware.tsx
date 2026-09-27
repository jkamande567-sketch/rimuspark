import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RimuLogo } from "../components/RimuLogo";
import { ContactForm } from "../components/ContactForm";
import projectImage from "../assets/project-elvash.jpg";
import { trackContactClick } from "../lib/track";
import { SITE_URL } from "../lib/seo";

const facts = [
  ["Client", "Stephen Njama"],
  ["Business", "Elvash Hardware & Contractors"],
  ["Location", "Nairobi, Kenya"],
  ["Service", "Web design"],
  ["Scope", "Single-page website"],
];

const highlights = [
  {
    number: "01",
    title: "One clear page",
    description:
      "Product range, services, and contact details laid out in a single scroll, so customers never hunt for what they came for.",
  },
  {
    number: "02",
    title: "Built for phones first",
    description:
      "Most visitors arrive on a phone, so the layout, buttons, and calls were designed for a thumb before a desktop.",
  },
  {
    number: "03",
    title: "Instant contact",
    description:
      "Call and WhatsApp buttons sit within reach on every section, turning a browse into a conversation.",
  },
  {
    number: "04",
    title: "Room to grow",
    description:
      "The structure leaves space for new product categories and project photos as the business expands.",
  },
];

export const Route = createFileRoute("/work/elvash-hardware")({
  head: () => ({
    meta: [
      { title: "Elvash Hardware & Contractors — Project | Rimu Creatives" },
      {
        name: "description",
        content:
          "How Rimu Creatives designed a fast, mobile-ready single-page website for Elvash Hardware & Contractors, a Nairobi building materials and interior design business.",
      },
      { property: "og:title", content: "Elvash Hardware & Contractors — Project | Rimu Creatives" },
      {
        property: "og:description",
        content:
          "A single-page website bringing product range, services, and contact details together for a Nairobi hardware business.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}/work/elvash-hardware` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/work/elvash-hardware` }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="site-nav">
        <div className="page-shell flex h-20 items-center justify-between">
          <Link to="/" className="focus-ring" aria-label="Rimu Creatives home">
            <RimuLogo />
          </Link>
          <Link to="/" hash="work" className="nav-link focus-ring inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to work
          </Link>
        </div>
      </header>

      <main>
        <section className="project-hero">
          <img
            src={projectImage}
            alt="Building materials and tools displayed in a hardware showroom"
            width={1600}
            height={1000}
          />
          <div className="project-hero-veil" aria-hidden="true" />
          <div className="page-shell relative z-10 py-20 sm:py-28">
            <p className="eyebrow text-secondary-accent">Selected work · Web design</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-paper">
              Elvash Hardware & Contractors
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-paper/75 sm:text-lg">
              A single-page website for a Nairobi building materials and interior design business —
              product range, services, and contact details in one clean, mobile-ready page.
            </p>
            <a
              className="button button-ghost focus-ring mt-8 inline-flex"
              href="https://www.elvashhardware.com/"
              target="_blank"
              rel="noreferrer"
            >
              Visit live site <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="section-space">
          <div className="page-shell grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <dl className="grid h-fit gap-5 border-t border-foreground pt-6">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-secondary-accent">{label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-tight tracking-[-0.02em]">
                A hardware business people can reach before they arrive.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
                Elvash sells building materials and takes on interior work, and most of their
                enquiries start with a phone search. They needed something simple that showed what
                they stock, what they do, and how to reach them — without a customer digging through
                pages.
              </p>
              <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
                We built one page that reads top to bottom: a clear opening, the product categories,
                the contracting services, and the contact details always within a tap. It loads
                quickly on ordinary mobile data and is easy to update as the stock list changes.
              </p>
              <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2">
                {highlights.map((item) => (
                  <article className="service-cell" key={item.number}>
                    <span className="number-label">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="page-shell relative z-10 py-20 sm:py-28">
            <p className="eyebrow text-secondary-accent">Start a conversation</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-paper">
              Want something like this?
            </h2>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="max-w-lg text-lg leading-8 text-paper/70">
                  Send us a note and we'll come back with ideas, timing, and a price.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    className="button button-ghost focus-ring"
                    href="https://wa.me/254181750049"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContactClick("whatsapp", "project-contact")}
                  >
                    Chat on WhatsApp <ArrowUpRight size={18} />
                  </a>
                  <a
                    className="focus-ring font-semibold text-paper underline decoration-secondary-accent decoration-2 underline-offset-8"
                    href="mailto:rimucreatives@gmail.com"
                    onClick={() => trackContactClick("email", "project-contact")}
                  >
                    rimucreatives@gmail.com
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <div className="page-shell flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 py-10">
          <RimuLogo inverse />
          <p className="text-sm text-paper/55">Your vision × our creativity.</p>
        </div>
      </footer>
    </div>
  );
}
