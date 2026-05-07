"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_SIZE = "clamp(42px, 8.5vw, 130px)";

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".hero-2-top", { autoAlpha: 0 });
      gsap.set(".hero-text-b", { autoAlpha: 0 });
      gsap.set(".caps-wrap", { autoAlpha: 0 });
      gsap.set(".cap-1, .cap-2, .cap-3", { autoAlpha: 0 });
      gsap.set(".bg-overlay", { autoAlpha: 0 });
      gsap.set(".final-logo", { autoAlpha: 0 });
      gsap.set(".final-tagline-1, .final-tagline-2", { autoAlpha: 0 });
      gsap.set(".menu-logo", { left: "1.5rem", xPercent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Stage 1→2: ЕСЛИ УЖ НАЧАЛ уходит, ТО ДЕЛАЙ появляется на том же месте, едет наверх
      tl.to(".hero-1", { autoAlpha: 0 }, 0.0)
        .to(".menu-logo", { left: "50%", xPercent: -50, ease: "power2.inOut" }, 0.0)
        .to(".hero-2-top", { autoAlpha: 1, ease: "power2.out" }, 0.35)
        .to(".hero-2-top", { y: "-28vh", ease: "power2.inOut" }, 0.7);

      // Stage 3: по красоте
      tl.to(".caps-wrap", { autoAlpha: 1 }, 1.4)
        .to(".cap-1", { autoAlpha: 1 }, 1.5);

      // cap-1 → cap-2
      tl.set(".cap-1", { autoAlpha: 0 }, 2.6)
        .set(".cap-2", { autoAlpha: 1 }, 2.6);

      // cap-2 → cap-3: сначала появляется ЛУЧШЕ ВСЕХ
      tl.set(".cap-2", { autoAlpha: 0 }, 3.8)
        .set(".cap-3", { autoAlpha: 1 }, 3.8);

      // Только потом, с паузой, «ТО» пропадает → остаётся «ДЕЛАЙ»
      tl.set(".hero-text-a", { autoAlpha: 0 }, 4.4)
        .set(".hero-text-b", { autoAlpha: 1 }, 4.4);

      // Stage 4: ДЕЛАЙ и ЛУЧШЕ ВСЕХ резко вырастают, фон темнеет
      tl.to(".hero-2-top", { scale: 5, ease: "power3.in" }, 5.2)
        .to(".cap-3", { scale: 5, ease: "power3.in" }, 5.2)
        .to(".bg-overlay", { autoAlpha: 1, ease: "power2.in" }, 5.2)
        .to([".menu-logo", ".menu-contacts"], { autoAlpha: 0 }, 5.4);

      // Stage 5: финальная карточка плавно нарастает
      tl.to(
        [".final-logo", ".final-tagline-1", ".final-tagline-2"],
        { autoAlpha: 1, ease: "power1.inOut", duration: 1.4 },
        6.4,
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div className="scroll-track relative h-[600vh]">
        {/* overflow НЕ hidden — текст должен взрываться за пределы при scale */}
        <div className="sticky top-0 h-screen w-full">

          {/* Чёрный оверлей — z-30, накрывает масштабируемый текст (z-20) */}
          <div
            className="bg-overlay pointer-events-none absolute inset-0 z-30 bg-black"
            style={{ visibility: "hidden", opacity: 0 }}
          />

          {/* Меню */}
          <div className="absolute inset-x-0 top-0 z-50" style={{ height: "56px" }}>
            <a
              href="#"
              className="menu-logo absolute top-1/2 -translate-y-1/2 select-none text-[#0b0b0b]"
              style={{ left: "1.5rem", fontSize: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.01em" }}
            >
              I DO
            </a>
            <a
              href="mailto:hello@i-do.studio"
              className="menu-contacts absolute top-1/2 -translate-y-1/2 select-none text-[#0b0b0b]"
              style={{ right: "1.5rem", fontSize: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.01em" }}
            >
              Контакты
            </a>
          </div>

          {/* Stage 1 — ЕСЛИ УЖ НАЧАЛ */}
          <h1
            className="hero-1 hero-display absolute inset-0 z-10 m-0 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE }}
          >
            Если уж&nbsp;начал
          </h1>

          {/* Stage 2 — та же позиция. Внутри два текста: «То делай» и «Делай» */}
          <div
            className="hero-2-top hero-display absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0, transformOrigin: "50% 50%" }}
          >
            <span className="hero-text-a">То&nbsp;делай</span>
            <span
              className="hero-text-b absolute"
              style={{ visibility: "hidden", opacity: 0 }}
            >
              Делай
            </span>
          </div>

          {/* Stage 3 — фразы под центром */}
          <div
            className="caps-wrap absolute inset-x-0 z-20 flex items-center justify-center px-6"
            style={{ top: "62%", visibility: "hidden", opacity: 0 }}
          >
            <span
              className="cap-1 hero-display absolute text-center text-[#0b0b0b]"
              style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}
            >
              По&nbsp;красоте
            </span>
            <span
              className="cap-2 hero-display absolute text-center text-[#0b0b0b]"
              style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}
            >
              От&nbsp;души
            </span>
            <span
              className="cap-3 hero-display absolute text-center text-[#0b0b0b]"
              style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0, transformOrigin: "50% 50%" }}
            >
              Лучше&nbsp;всех
            </span>
          </div>

          {/* Финальная карточка */}
          <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 px-6 text-center text-white">
            <div
              className="final-logo hero-display"
              style={{ fontSize: "clamp(80px, 18vw, 280px)", visibility: "hidden", opacity: 0 }}
            >
              I DO
            </div>
            <div
              className="final-tagline-1"
              style={{ fontSize: "clamp(13px, 1.3vw, 18px)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", visibility: "hidden", opacity: 0 }}
            >
              Студия разработки и&nbsp;маркетинга
            </div>
            <div
              className="final-tagline-2"
              style={{ fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em", visibility: "hidden", opacity: 0 }}
            >
              Для тех, кто выбирает быть лучшим
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
