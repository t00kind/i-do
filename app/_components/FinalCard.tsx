export default function FinalCard() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 px-6 text-center text-white">
      <div
        className="final-logo hero-display"
        style={{
          fontSize: "clamp(60px, 12vw, 200px)",
          visibility: "hidden",
          opacity: 0,
          fontFamily: "var(--font-syne), sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        I DO
      </div>

      <div
        className="final-tagline-1"
        style={{
          fontSize: "clamp(13px, 1.3vw, 18px)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          visibility: "hidden",
          opacity: 0,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        Студия разработки и&nbsp;маркетинга
      </div>

      <div
        className="final-tagline-2 hero-display"
        style={{
          fontSize: "clamp(22px, 3.5vw, 54px)",
          visibility: "hidden",
          opacity: 0,
          lineHeight: 1,
        }}
      >
        Для тех, кто выбирает быть лучшим
      </div>
    </div>
  );
}
