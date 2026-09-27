# Rimu Creatives — poster-style redesign

Rebuild the existing one-page site in the style of the reference poster: a light, airy, editorial layout with very large bold headlines, thin rule lines, generous whitespace, and a dark silhouette-style hero visual. New colour scheme: blue, black, orange.

## Look and feel

- Light off-white background with black type as the base; deep blue for structure and large surfaces; orange reserved for accents, highlighted words, buttons, and numbering.
- Oversized two-line headline like the poster ("Build Your Website" scale), with a small supporting sentence set beside a thin horizontal/vertical rule cross.
- Tiny corner labels at the top of the page (handle, site name, logo) echoing the poster's header row, and a phone/contact line at the bottom left.
- Replace the current green diagonal cuts with squarer, quieter framing: hairline rules, generous margins, one strong dark image block.
- Keep Syne for display type and Manrope for body text.

## Sections

1. Hero — corner labels, giant headline with one word in orange, short subline beside a rule cross, two buttons, and a dark visual block showing a laptop/workspace scene.
2. Slim service strip — now dark blue with orange separators.
3. Services — four items in a hairline grid, orange numbering.
4. Selected work — light section with framed cards instead of the dark panel; Elvash Hardware stays, data-driven array unchanged.
5. Process — four numbered rows on hairline rules.
6. Contact — full-bleed black band with an oversized headline, WhatsApp button in orange, email link underlined in blue.
7. Footer — black, logo, tagline, location, social links.

## Hero visual

Generate a hero image in the poster's spirit: a silhouetted person at a laptop against a bright gradient backdrop, cool blue-black tones with a warm orange glow on the screen. Used as the hero's dark image block, not a copy of the reference.

## Technical details

- Recolour tokens in `src/styles.css` (background, foreground, primary → blue, secondary/accent → orange, ink/paper) and rewrite the diagonal-cut utilities into rule-based ones.
- Rework `src/routes/index.tsx` section markup for the new layout; keep the `projects`/`services`/`processSteps` arrays, route metadata, and accessibility/focus behaviour.
- Update the logomark colours in `src/components/RimuLogo.tsx`.
- Remove the Three.js hero object and its dependency usage in favour of the image-led hero, keeping the intro animation and reduced-motion handling.
- Verify desktop and mobile rendering in the browser after the rebuild.
