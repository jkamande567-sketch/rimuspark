# Rimu Creatives Studio

# Lovable prompt — Rimu Creatives website

Build a one-page portfolio website for **Rimu Creatives**, a digital creative and business solutions studio based in Nairobi, Kenya. Tagline: "Your vision × our creativity."

## Brand & palette
- Black: `#0B0B0E` (ink, backgrounds for dark sections)
- White: `#FFFFFF`
- Paper (light background): `#F6F5F2`
- Green (primary accent — buttons, links, diagonal accent shapes, hover states): `#16A34A`, deeper shade `#0B6B32`
- Red (secondary accent — used sparingly, only for numbered labels like "01", "02"): `#E23E3E`, deeper shade `#8E1F1F`
- Graphite (secondary text): `#6B6B70`
- Keep red minimal and deliberate — it should never carry equal visual weight to green, or the palette reads as a holiday theme instead of a brand.

## Typography
- Headings/display: **Syne** (bold, geometric, weights 600–800)
- Body: **Manrope** (weights 400–600)
- Sentence case throughout, no all-caps except small tracked-out labels/eyebrows if used sparingly.

## Signature visual motif
A diagonal "cut" shape (a violet-turned-green angled block, echoing the brand's "R" logomark which has a diagonal slice through it) recurs as the site's signature graphic device — used in the hero background, project card visuals, and the contact section background. Avoid generic rounded cards, soft drop shadows, or gradient washes; keep surfaces flat with hard diagonal accents instead.

## Page structure (single page, sticky nav)

**Nav** — logo mark + "Rimu Creatives" wordmark on the left, links to Services / Work / Process / Contact, with a "Start a project" button on the right.

**Hero** (dark, `#0B0B0E` background)
- Eyebrow label: "Digital creative & business solutions — Nairobi"
- Headline: "Small businesses get bigger online, starting here." (highlight the word "online" in green)
- Subhead: "Rimu Creatives designs websites, brand visuals, and social content for Nairobi businesses that are ready to look as good online as they are in person."
- Two buttons: "Start a project" (primary, links to contact) and "See the work" (ghost/outline, links to work section)
- A large green diagonal-cut shape in the background, positioned top-right
- On desktop only (not mobile): an interactive 3D low-poly faceted shape (icosahedron, flat-shaded, green material with a subtle red rim light) slowly rotating and tilting toward the cursor — implemented with Three.js, gracefully degrading to just the flat diagonal shape if it fails to load. Skip this 3D element on small screens to save mobile data.
- On page load, play a one-time intro animation: the "R" logomark pops in with a bounce, then the letters of "Rimu Creatives" reveal one by one in sequence, then the whole intro overlay fades out to reveal the hero. Respect prefers-reduced-motion (skip animation entirely for those users).

**Service strip** — a thin bar listing the four services inline: Web design · Graphic design · Social media management · Video editing.

**Services section**
Four services in a 2×2 grid (numbered 01–04 in red), each with a short description:
1. **Web design** — Modern, responsive websites built for businesses — fast to load, easy to update, and built to convert visitors into customers.
2. **Graphic design** — Logos, business cards, posters, and social graphics with a visual identity that holds together across everything you print or post.
3. **Social media management** — Content planning, posting, and account management so your business shows up consistently without eating your week.
4. **Video editing** — Clean, professional edits for social media and business content — turning raw footage into something worth posting.

Do NOT include videography as a service.

**Work / Portfolio section**
A grid of project cards (2 columns desktop, 1 column mobile). Build this as **data-driven** — a simple array/list of project objects (name, category, description, link, optional image) that renders into cards, so new projects can be added by adding one object to the list without touching layout code. Each card has a diagonal-cut visual area (dark background with a green accent shape if no image is provided, or a background image if one is given), a category label, project name, short description, and a "View project" link.

Seed it with one project:
- **Elvash Hardware & Contractors** — Web design — "A single-page site for a Nairobi building materials and interior design business — product range, services, and contact details in one clean, mobile-ready page."

**Process section**
Four numbered steps (01–04 in red), each a short sequence describing how a project runs:
1. **Brief** — You tell us about your business and what you need — over WhatsApp or a quick call.
2. **Design** — We put together a look and layout built around your business, not a generic template.
3. **Build** — The site or content gets built, reviewed with you, and refined until it's right.
4. **Launch** — Your site goes live, or your content calendar starts running — and we stay reachable after.

**Contact section** (dark background, green diagonal accent)
- Heading: "Tell us about your business."
- Subtext: "Reach out directly — most projects start with a short WhatsApp conversation."
- WhatsApp button linking to `https://wa.me/254701065112`
- Email link: `rimucreatives@gmail.com`

**Footer**
- Logo + "Rimu Creatives"
- Location: "Nairobi, Kenya"
- Tagline: "We design · We create · We grow"
- Social links: Instagram, Facebook, X, TikTok (placeholder links for now — real handles to be added later)

## Technical notes
- Fully responsive, mobile-first; the 3D hero element and hover-tilt effects should be desktop-only enhancements that degrade gracefully.
- Respect `prefers-reduced-motion` for all animations.
- Keep it as lightweight as possible — this targets mobile users on Kenyan data networks, so avoid heavy dependencies beyond what's needed for the 3D hero effect.
- Visible keyboard focus states on all interactive elements.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rimu-vision-spark.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf0dce0a-5f1d-4272-93a6-b9d45612809a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
