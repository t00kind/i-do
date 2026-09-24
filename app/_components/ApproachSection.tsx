function ApproachCrosshair() {
  const arm = 11;
  const gap = 28;
  const size = 120;
  const center = size / 2;
  const inner = center - gap / 2;
  const outer = size - inner;

  return (
    <svg
      className="block h-[clamp(112px,18vmin,220px)] w-[clamp(112px,18vmin,220px)]"
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      aria-hidden
    >
      {/* верх */}
      <rect x={center - arm / 2} y={0} width={arm} height={inner} />
      {/* низ */}
      <rect x={center - arm / 2} y={outer} width={arm} height={inner} />
      {/* лево */}
      <rect x={0} y={center - arm / 2} width={inner} height={arm} />
      {/* право */}
      <rect x={outer} y={center - arm / 2} width={inner} height={arm} />
    </svg>
  );
}

export default function ApproachSection() {
  return (
    <div className="relative bg-black">
      <div className="approach-track relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* НАШ ПОДХОД + МЫ НАЦЕЛЕНЫ НА */}

          {/* РЕЗУЛЬТАТ */}
          <div
            className="approach-result pointer-events-none absolute"
            style={{
              top: "50%",
              left: "50%",
              fontSize: "clamp(42px, 10vw, 158px)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 900,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            РЕЗУЛЬТАТ
          </div>

        </div>
      </div>
    </div>
  );
}
