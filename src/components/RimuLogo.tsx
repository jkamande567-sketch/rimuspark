type RimuLogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function RimuLogo({ compact = false, inverse = false }: RimuLogoProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="Rimu Creatives">
      <svg
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        viewBox="0 0 42 42"
        fill="none"
      >
        <rect x="2" y="2" width="38" height="38" className={inverse ? "fill-paper" : "fill-ink"} />
        <path
          d="M10 8H23.5C30 8 33 11.2 33 16.3C33 20 31.2 22.4 27.9 23.6L34 34H26.6L21.2 25H17.5V34H10V8Z"
          className="fill-primary"
        />
        <path d="M17.5 14H22.6C24.4 14 25.3 14.9 25.3 16.4C25.3 17.9 24.4 18.8 22.6 18.8H17.5V14Z" className={inverse ? "fill-paper" : "fill-ink"} />
        <rect x="8" y="28" width="26" height="3" className="fill-secondary-accent" />
      </svg>
      {!compact && (
        <span className={`font-display text-[1.02rem] font-bold ${inverse ? "text-paper" : "text-foreground"}`}>
          Rimu Creatives
        </span>
      )}
    </span>
  );
}
