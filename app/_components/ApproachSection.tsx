export default function ApproachSection() {
  return (
    <div className="relative bg-black">
      <div className="approach-track relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-[3vh]">

          {/* НАШ ПОДХОД + МЫ — размываются при скролле */}
          <div className="approach-other flex flex-col items-center gap-[2.5vh]">
            <h2
              className="hero-display"
              style={{
                fontSize: "clamp(42px, 10vw, 158px)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-syne), sans-serif",
                textAlign: "center",
              }}
            >
              НАШ ПОДХОД
            </h2>

            <p
              style={{
                fontSize: "clamp(11px, 1.1vw, 16px)",
                fontFamily: "var(--font-mono), monospace",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)",
                textAlign: "center",
              }}
            >
              МЫ&nbsp;&mdash;&nbsp;СФОКУСИРОВАНЫ&nbsp;НА
            </p>
          </div>

          {/* РЕЗУЛЬТАТЕ — остаётся чётким, сжимается */}
          <div
            className="approach-result hero-display"
            style={{
              fontSize: "clamp(36px, 5.5vw, 88px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              fontFamily: "var(--font-syne), sans-serif",
              textAlign: "center",
            }}
          >
            РЕЗУЛЬТАТЕ
          </div>

        </div>
      </div>
    </div>
  );
}
