import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { useEffect, useState } from "react";
import { RimuLogo } from "../components/RimuLogo";
import { ServiceSlideshow } from "../components/ServiceSlideshow";
import { channelForSocial, trackContactClick } from "../lib/track";
import { SITE_URL } from "../lib/seo";
import heroBg from "../assets/hero-bg.png.asset.json";
import projectShot from "../assets/project-elvash-live.jpg";
import serviceWeb from "../assets/service-web.jpg";
import serviceGraphic from "../assets/service-graphic.jpg";
import serviceSocial from "../assets/service-social.jpg";
import serviceVideo from "../assets/service-video.jpg";
import serviceApp from "../assets/service-app.jpg";

// Add a name here for every client who's happy to be named publicly.
const clients = ["Elvash Hardware & Contractors"];

function CapabilityStrip({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 2200);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="service-strip" aria-label="Services overview">
      <div className="page-shell flex items-center justify-center gap-4 py-5">
        <span className="corner-label font-display text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/70">
          Rimu Creatives ×
        </span>
        <span className="relative inline-flex h-7 min-w-[15rem] items-center justify-center overflow-hidden sm:h-8 sm:min-w-[19rem]">
          {items.map((item, i) => (
            <span
              key={item}
              aria-hidden={i !== index}
              className={`absolute whitespace-nowrap font-display text-sm font-bold tracking-wide transition-all duration-500 ease-out sm:text-base ${
                i === index
                  ? "translate-y-0 opacity-100"
                  : i === (index - 1 + items.length) % items.length
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
              }`}
            >
              {item}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

const services = [
  {
    number: "01",
    title: "Web design",
    image: serviceWeb,
    description:
      "Modern, responsive websites built for businesses — fast to load, easy to update, and built to convert visitors into customers.",
  },
  {
    number: "02",
    title: "App development",
    image: serviceApp,
    description:
      "Mobile and web apps built around how your business actually runs — bookings, orders, records, or customer accounts.",
  },
  {
    number: "03",
    title: "Graphic design",
    image: serviceGraphic,
    description:
      "Logos, business cards, posters, and social graphics with a visual identity that holds together across everything you print or post.",
  },
  {
    number: "04",
    title: "Social media management",
    image: serviceSocial,
    description:
      "Content planning, posting, and account management so your business shows up consistently without eating your week.",
  },
  {
    number: "05",
    title: "Video editing",
    image: serviceVideo,
    description:
      "Clean, professional edits for social media and business content — turning raw footage into something worth posting.",
  },
];

const slides = services.map((service) => ({
  title: service.title,
  caption: service.description,
  image: service.image,
}));

const projects = [
  {
    name: "Elvash Hardware & Contractors",
    client: "Stephen Njama",
    category: "Web design",
    description:
      "A single-page site for a Nairobi building materials and interior design business — product range, services, and contact details in one clean, mobile-ready page.",
    url: "https://www.elvashhardware.com/",
    image: projectShot,
    to: "/work/elvash-hardware" as const,
  },
];

const socials = [
  ["Instagram", "https://www.instagram.com/rimucreatives"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61594727519571"],
  ["TikTok", "https://www.tiktok.com/@rimucreatives"],
  ["WhatsApp", "https://wa.me/254181750049"],
  ["Call", "tel:+254181750049"],
];

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.59-1.56h1.7V2.97C15.98 2.9 15 2.82 13.87 2.82c-2.35 0-3.96 1.44-3.96 4.07v2.71H7.15v3.2h2.76V21h3.59Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.6" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.15" cy="6.85" r="1.05" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M16.6 2.5c.53 1.72 1.68 2.87 3.4 3.1v2.9c-1.24.06-2.42-.3-3.4-1v6.4c0 3.05-2.48 5.5-5.55 5.5A5.52 5.52 0 0 1 5.5 14a5.52 5.52 0 0 1 7.65-5.1v3.1a2.5 2.5 0 1 0 1.75 2.4V2.5h1.7Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C9.02 3 3.32 8.7 3.32 15.72c0 2.24.59 4.42 1.7 6.35L3.2 29l7.1-1.86a12.68 12.68 0 0 0 5.74 1.37h.01c7.01 0 12.72-5.7 12.72-12.72C28.77 8.7 23.06 3 16.04 3Zm0 23.28h-.01c-1.87 0-3.7-.5-5.3-1.45l-.38-.23-3.94 1.03 1.05-3.84-.25-.4a10.55 10.55 0 0 1-1.62-5.67c0-5.85 4.77-10.62 10.63-10.62 2.84 0 5.5 1.11 7.5 3.11a10.55 10.55 0 0 1 3.11 7.52c0 5.86-4.76 10.55-10.58 10.55Zm5.83-7.9c-.32-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.16-.22.32-.85 1.07-1.04 1.29-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.58-1.6a9.66 9.66 0 0 1-1.79-2.22c-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.22-.32.32-.54.11-.22.05-.4-.03-.56-.08-.16-.74-1.79-1.02-2.44-.27-.64-.54-.55-.74-.56l-.63-.01c-.22 0-.58.08-.88.4-.3.32-1.15 1.12-1.15 2.73 0 1.61 1.18 3.17 1.34 3.39.16.22 2.3 3.52 5.59 4.93.78.34 1.39.54 1.87.69.79.25 1.5.22 2.06.13.63-.09 1.95-.8 2.22-1.57.27-.77.27-1.42.19-1.56-.08-.14-.29-.22-.61-.38Z" />
        </svg>
      );
    case "Call":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5.5 4h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3c0 1-1 2-2 2-7 0-14-7-14-14 0-1 1-2 2-2Z" />
        </svg>
      );
    default:
      return null;
  }
}

const processSteps = [
  [
    "01",
    "Brief",
    "You tell us about your business and what you need — over WhatsApp or a quick call.",
  ],
  [
    "02",
    "Design",
    "We put together a look and layout built around your business, not a generic template.",
  ],
  [
    "03",
    "Build",
    "The site or content gets built, reviewed with you, and refined until it's right.",
  ],
  [
    "04",
    "Launch",
    "Your site goes live, or your content calendar starts running — and we stay reachable after.",
  ],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rimu Creatives | Nairobi Creative Studio" },
      {
        name: "description",
        content:
          "Web design, brand visuals, social media management, and video editing for growing Nairobi businesses.",
      },
      { property: "og:title", content: "Rimu Creatives | Nairobi Creative Studio" },
      {
        property: "og:description",
        content:
          "Your vision × our creativity. Digital creative and business solutions from Nairobi.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rimu Creatives | Nairobi Creative Studio" },
      {
        name: "twitter:description",
        content:
          "Your vision × our creativity. Digital creative and business solutions from Nairobi.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Intro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-lockup">
        <RimuLogo compact inverse />
        <span className="intro-wordmark">
          {"Rimu Creatives".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ animationDelay: `${550 + index * 55}ms` }}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
        <span className="intro-tagline">Your vision × our creativity</span>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["About", "#about"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="site-nav">
      <div className="page-shell flex h-20 items-center justify-between">
        <a href="#top" className="focus-ring" aria-label="Rimu Creatives home">
          <RimuLogo />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a className="nav-link focus-ring" href={href} key={href}>
              {label}
            </a>
          ))}
          <a className="button button-primary focus-ring" href="#contact">
            Start a project <ArrowDownRight size={17} />
          </a>
        </nav>
        <button
          className="focus-ring grid h-11 w-11 place-items-center border border-foreground/25 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <div id="top" className="overflow-hidden bg-background text-foreground">
      <Intro />
      <Header />
      <main>
        <section className="hero-section" style={{ backgroundImage: `url(${heroBg.url})` }}>
          <div className="hero-veil" aria-hidden="true" />
          <div className="relative z-10">
            <div className="page-shell flex flex-wrap items-center justify-between gap-2 border-b border-paper/20 py-3">
              <span className="corner-label">rimu_creatives</span>
              <span className="corner-label hidden sm:inline">Nairobi, Kenya</span>
              <span className="corner-label">Your vision × our creativity</span>
            </div>
            <div className="page-shell max-w-3xl py-20 sm:py-28 lg:py-36">
              <h1 className="hero-title">
                <span className="line-light block">Build Your</span>
                <span className="block">
                  Business <em>Online</em>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-paper/75 sm:text-lg">
                We design websites, apps, brand visuals, and social content for businesses ready to
                look as good online as they are in person.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className="button button-accent focus-ring" href="#contact">
                  Start a project <ArrowDownRight size={18} />
                </a>
                <a className="button button-ghost focus-ring" href="#work">
                  See the work <ArrowDownRight size={18} />
                </a>
              </div>
              <a
                className="focus-ring mt-12 inline-block font-display text-sm font-bold tracking-wide text-paper/80 hover:text-secondary-accent"
                href="tel:+254181750049"
                onClick={() => trackContactClick("phone", "hero")}
              >
                +254 181 750 049
              </a>
            </div>
          </div>
        </section>

        <CapabilityStrip items={services.map((service) => service.title)} />

        <section className="section-space" id="services">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow text-secondary-accent">What we do</p>
              <h2>Built to make your business look the part.</h2>
            </div>
            <div className="mt-12">
              <ServiceSlideshow slides={slides} />
            </div>
            <div className="mt-14 grid border-l border-t border-border md:grid-cols-2">
              {services.map((service) => (
                <article className="service-cell" key={service.number}>
                  <span className="number-label">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-muted" id="work">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow text-secondary-accent">Selected work</p>
              <h2>Work made to work.</h2>
            </div>
            <div className="mt-14 grid gap-7 md:grid-cols-2">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-visual">
                    <img src={project.image} alt={`${project.name} website`} loading="lazy" />
                    <i aria-hidden="true" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="eyebrow text-primary">{project.category}</p>
                    <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">
                      {project.client}
                    </p>
                    <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        className="focus-ring inline-flex items-center gap-2 font-display font-bold text-primary"
                        to={project.to}
                      >
                        View project <ArrowUpRight size={18} />
                      </Link>
                      <a
                        className="focus-ring inline-flex items-center gap-2 font-display font-bold text-foreground/60 hover:text-primary"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit live site <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
              <div className="project-promise hidden items-end p-8 md:flex">
                <p className="font-display text-3xl font-bold leading-tight text-foreground/30">
                  The next project could be yours.
                </p>
              </div>
            </div>
            <figure className="mt-10 border border-border bg-card p-8 sm:p-10">
              <blockquote className="font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                “I really like the website — and for his age, Joseph is doing very well.”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                Stephen Njama, Elvash Hardware &amp; Contractors
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section-space" id="about">
          <div className="page-shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="section-heading">
              <p className="eyebrow text-secondary-accent">About us</p>
              <h2>A small studio, built to move fast.</h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                Rimu Creatives is a Nairobi-based studio run by Joseph, building fast,
                mobile-ready websites and digital content for local businesses.
              </p>
              <p>
                Every project is handled personally, from the first brief to the site going live —
                no account managers, no handoffs between departments. Just direct work with the
                person actually building your site.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space" id="process">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow text-secondary-accent">How it works</p>
              <h2>Clear steps. No mystery.</h2>
            </div>
            <div className="mt-14 border-t border-foreground">
              {processSteps.map(([number, title, description]) => (
                <article className="process-row" key={number}>
                  <span className="number-label">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="page-shell relative z-10 py-24 sm:py-32">
            <p className="eyebrow text-secondary-accent">Start a conversation</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-paper">
              Tell us about your business.
            </h2>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="max-w-xl text-lg leading-8 text-paper/70">
                  Fill in the form and your message lands with us directly — or reach out on
                  WhatsApp if that's easier.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    className="button button-ghost focus-ring"
                    href="https://wa.me/254181750049"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContactClick("whatsapp", "contact-section")}
                  >
                    Chat on WhatsApp <ArrowUpRight size={18} />
                  </a>
                  <a
                    className="focus-ring font-semibold text-paper underline decoration-secondary-accent decoration-2 underline-offset-8"
                    href="mailto:rimucreatives@gmail.com"
                    onClick={() => trackContactClick("email", "contact-section")}
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
      <section className="border-t border-border bg-background py-10" aria-label="Trusted by">
        <div className="page-shell flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="eyebrow text-muted-foreground">Trusted by</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {clients.map((client) => (
              <span
                key={client}
                className="font-display text-sm font-bold uppercase tracking-[0.08em] text-foreground/50 transition-colors hover:text-foreground"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-ink text-paper">
        <div className="page-shell grid gap-10 border-t border-paper/15 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <RimuLogo inverse />
            <p className="mt-4 text-sm text-paper/55">Your vision × our creativity.</p>
          </div>
          <div className="text-sm leading-7 text-paper/70">
            <p>Nairobi, Kenya</p>
            <p>We design · We create · We grow</p>
          </div>
          <nav
            className="flex flex-wrap items-center gap-4 lg:justify-end"
            aria-label="Social links"
          >
            {socials.map(([name, href]) => {
              const channel = channelForSocial(name ?? "");
              const isExternal = !href?.startsWith("tel:");
              return (
                <a
                  className="focus-ring grid h-10 w-10 place-items-center border border-paper/20 text-paper transition-colors hover:border-secondary-accent hover:text-secondary-accent"
                  href={href}
                  key={name}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  aria-label={name}
                  onClick={() => {
                    if (channel) trackContactClick(channel, "footer");
                  }}
                >
                  <SocialIcon name={name ?? ""} />
                </a>
              );
            })}
          </nav>
        </div>
      </footer>
    </div>
  );
}
