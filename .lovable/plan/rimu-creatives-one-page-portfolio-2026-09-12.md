# Rimu Creatives one-page portfolio

## Build
- Replace the placeholder homepage with a responsive single-page portfolio and sticky navigation.
- Create the specified hero, service strip, services, data-driven portfolio, process, contact, and footer sections.
- Use the supplied Nairobi-focused copy, WhatsApp link, email address, and placeholder social links.

## Visual system
- Apply the exact black, paper, green, red, and graphite palette through semantic design tokens.
- Load Syne for display text and Manrope for body text.
- Build a sharp editorial layout using recurring diagonal-cut green forms, flat surfaces, strong borders, and restrained red numbering.
- Create a compact custom R logomark that works in the navigation, intro, and footer.

## Motion and interaction
- Add a one-time logo-and-wordmark intro sequence, skipped when reduced motion is requested.
- Add a desktop-only, lazily loaded Three.js faceted form with slow rotation and cursor tilt; keep the static diagonal composition as fallback.
- Limit tilt and motion enhancements to capable desktop devices and provide clear keyboard focus states.

## Technical details
- Keep portfolio cards rendered from a project data array so future projects only require one new object.
- Install only Three.js for the requested 3D effect and load it after hydration on larger screens.
- Add route-specific page metadata and accessible semantic structure.
- Validate the finished page at desktop and mobile sizes, including reduced-motion behavior and page links.
