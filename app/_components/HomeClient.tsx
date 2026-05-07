"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FinalCard from "./FinalCard";

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

      // Stage 3: «По красоте» появляется — одновременно «ТО» плавно уходит → «ДЕЛАЙ»
      tl.to(".caps-wrap", { autoAlpha: 1 }, 1.4)
        .to(".cap-1", { autoAlpha: 1 }, 1.4)
        .to(".hero-text-a", { autoAlpha: 0, ease: "power2.inOut", duration: 0.5 }, 1.4)
        .to(".hero-text-b", { autoAlpha: 1, ease: "power2.inOut", duration: 0.5 }, 1.4);

      // cap-1 → cap-2
      tl.set(".cap-1", { autoAlpha: 0 }, 2.6)
        .set(".cap-2", { autoAlpha: 1 }, 2.6);

      // cap-2 → cap-3: ЛУЧШЕ ВСЕХ
      tl.set(".cap-2", { autoAlpha: 0 }, 3.8)
        .set(".cap-3", { autoAlpha: 1 }, 3.8);

      // Stage 4: ДЕЛАЙ и ЛУЧШЕ ВСЕХ медленно разрастаются, фон долго темнеет
      tl.to(".hero-2-top", { scale: 5, ease: "power2.inOut", duration: 1.6 }, 5.4)
        .to(".cap-3", { scale: 5, ease: "power2.inOut", duration: 1.6 }, 5.4)
        .to(".bg-overlay", { autoAlpha: 1, ease: "power1.inOut", duration: 1.8 }, 5.2)
        // меню остаётся, просто меняет цвет с чёрного на белый вместе с затемнением
        .to([".menu-logo", ".menu-contacts"], { color: "#ffffff", duration: 1.2, ease: "power1.inOut" }, 5.2);

      // Stage 5: финальная карточка плавно нарастает
      tl.to(
        [".final-logo", ".final-tagline-1", ".final-tagline-2"],
        { autoAlpha: 1, ease: "power1.inOut", duration: 1.4 },
        7.2,
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div className="scroll-track relative h-[700vh]">
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
          <FinalCard />

        </div>
      </div>
    </div>
  );
}
