"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FinalCard from "./FinalCard";
import ApproachSection from "./ApproachSection";

const HERO_SIZE = "clamp(42px, 8.5vw, 130px)";

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─── Hero initial states ───────────────────────────────────────────────
      gsap.set(".hero-2-top", { autoAlpha: 0 });
      gsap.set(".hero-text-b", { autoAlpha: 0 });
      gsap.set(".caps-wrap", { autoAlpha: 0 });
      gsap.set(".cap-1, .cap-2, .cap-3", { autoAlpha: 0 });
      gsap.set(".bg-overlay", { autoAlpha: 0 });
      gsap.set(".final-logo", { autoAlpha: 0 });
      gsap.set(".final-tagline-1, .final-tagline-2", { autoAlpha: 0 });
      gsap.set(".menu-logo", { left: "1.5rem", xPercent: 0 });

      // ─── Hero timeline (scroll-track) ──────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.to(".hero-1", { autoAlpha: 0 }, 0.0)
        .to(".menu-logo", { left: "50%", xPercent: -50, ease: "power2.inOut" }, 0.0)
        .to(".hero-2-top", { autoAlpha: 1, ease: "power2.out" }, 0.35)
        .to(".hero-2-top", { y: "-28vh", ease: "power2.inOut" }, 0.7);

      tl.to(".caps-wrap", { autoAlpha: 1 }, 1.4)
        .to(".cap-1", { autoAlpha: 1 }, 1.4)
        .to(".hero-text-a", { autoAlpha: 0, ease: "power2.inOut", duration: 0.5 }, 1.4)
        .to(".hero-text-b", { autoAlpha: 1, ease: "power2.inOut", duration: 0.5 }, 1.4);

      tl.set(".cap-1", { autoAlpha: 0 }, 2.6)
        .set(".cap-2", { autoAlpha: 1 }, 2.6);

      tl.set(".cap-2", { autoAlpha: 0 }, 3.8)
        .set(".cap-3", { autoAlpha: 1 }, 3.8);

      tl.to(".hero-2-top", { scale: 5, ease: "power2.inOut", duration: 1.6 }, 5.4)
        .to(".cap-3", { scale: 5, ease: "power2.inOut", duration: 1.6 }, 5.4)
        .to(".bg-overlay", { autoAlpha: 1, ease: "power1.inOut", duration: 1.8 }, 5.2)
        .to([".menu-logo", ".menu-contacts"], { color: "#ffffff", duration: 1.2, ease: "power1.inOut" }, 5.2);

      tl.to(
        [".final-logo", ".final-tagline-1", ".final-tagline-2"],
        { autoAlpha: 1, ease: "power1.inOut", duration: 1.4 },
        7.2,
      );

      // ─── Approach section timeline ─────────────────────────────────────────
      // НАШ ПОДХОД виден сразу — без анимации
      // РЕЗУЛЬТАТ и прицел — скрыты, готовы к появлению
      gsap.set(".approach-subline", { autoAlpha: 0 });
      gsap.set(".approach-result", {
        autoAlpha: 0.4,       // сразу полупрозрачный — "уже там"
        xPercent: -50,
        yPercent: -50,
        x: "30vw",
        y: "12vh",
      });
      gsap.set(".approach-crosshair", {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        x: "-12vw",
        y: "-4vh",
      });

      const approachTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: ".approach-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      approachTl
        // 1. МЫ НАЦЕЛЕНЫ НА + прицел появляются одновременно
        .to(".approach-subline", { autoAlpha: 1, ease: "power2.out", duration: 0.35 }, 0.0)
        .to(".approach-crosshair", { autoAlpha: 1, ease: "power2.out", duration: 0.35 }, 0.0)
        // 2. Пустой скролл — прицел медленно дрейфует (мы "ищем")
        .to(".approach-crosshair", { x: "-4vw", y: "6vh", ease: "none", duration: 1.1 }, 0.4)
        // 3. Прицел обнаружил цель — летит к РЕЗУЛЬТАТ
        .to(".approach-crosshair", { x: "30vw", y: "12vh", ease: "power2.inOut", duration: 0.75 }, 1.5)
        // 4. Попадание — РЕЗУЛЬТАТ вспыхивает
        .to(".approach-result", { autoAlpha: 1, ease: "power1.out", duration: 0.22 }, 2.18)
        // 5. РЕЗУЛЬТАТ в центр, прицел гаснет, остальное блюрится
        .to(".approach-result", { x: 0, y: 0, ease: "power3.inOut", duration: 0.85 }, 2.38)
        .to(".approach-crosshair", { autoAlpha: 0, duration: 0.3 }, 2.38)
        .to(
          ".approach-header",
          { filter: "blur(24px)", autoAlpha: 0.1, ease: "power2.inOut", duration: 0.75 },
          2.38,
        );

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">

      {/* Меню — fixed, всегда поверх всего */}
      <div className="fixed inset-x-0 top-0 z-[100]" style={{ height: "56px" }}>
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
          style={{ right: "1.5rem", fontSize: "15px", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-mono), monospace" }}
        >
          Контакты
        </a>
      </div>

      {/* Hero scroll track */}
      <div className="scroll-track relative h-[900vh]">
        <div className="sticky top-0 h-screen w-full">

          {/* Чёрный оверлей */}
          <div
            className="bg-overlay pointer-events-none absolute inset-0 z-30 bg-black"
            style={{ visibility: "hidden", opacity: 0 }}
          />

          {/* Stage 1 — ЕСЛИ УЖ НАЧАЛ */}
          <h1
            className="hero-1 hero-display absolute inset-0 z-10 m-0 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE }}
          >
            В КОНЕЧНОМ ИТОГЕ
          </h1>

          {/* Stage 2 */}
          <div
            className="hero-2-top hero-display absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0, transformOrigin: "50% 50%" }}
          >
            <span className="hero-text-a"></span>
            <span className="hero-text-b absolute" style={{ visibility: "hidden", opacity: 0 }}>
              ОСТАНЕТСЯ
            </span>
          </div>

          {/* Stage 3 */}
          <div
            className="caps-wrap absolute inset-x-0 z-20 flex items-center justify-center px-6"
            style={{ top: "62%", visibility: "hidden", opacity: 0 }}
          >
            <span className="cap-1 hero-display absolute text-center text-[#0b0b0b]" style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}>
              ЛИШЬ
            </span>
            <span className="cap-2 hero-display absolute text-center text-[#0b0b0b]" style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}>
              ТО
            </span>
            <span className="cap-3 hero-display absolute text-center text-[#0b0b0b]" style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0, transformOrigin: "50% 50%" }}>
              ЧТО ТЫ СДЕЛАЛ
            </span>
          </div>

          {/* Финальная карточка */}
          <FinalCard />

        </div>
      </div>

      {/* Approach section */}
      <ApproachSection />

    </div>
  );
}
