import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { title: string; caption: string; image: string };

export function ServiceSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Service examples"
    >
      <div className="slideshow-stage">
        {slides.map((slide, i) => (
          <figure key={slide.title} className={`slide${i === index ? " is-active" : ""}`} aria-hidden={i !== index}>
            <img src={slide.image} alt={slide.title} loading="lazy" width={1280} height={800} />
            <figcaption>
              <span className="eyebrow text-secondary-accent">{slide.title}</span>
              <p>{slide.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="slideshow-controls">
        <div className="slideshow-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              className={`focus-ring dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${slide.title}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button className="focus-ring slide-arrow" onClick={() => go(-1)} aria-label="Previous slide"><ChevronLeft size={18} /></button>
          <button className="focus-ring slide-arrow" onClick={() => go(1)} aria-label="Next slide"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
