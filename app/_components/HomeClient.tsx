"use client";

import Image from "next/image";
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
      // Скрытые изначально
      gsap.set(".hero-2-top", { autoAlpha: 0 });   // НЕТ y-смещения — позиция та же что у hero-1
      gsap.set(".hero-photo-wrap", { autoAlpha: 0 });
      gsap.set(".hero-photo", { scale: 0.7 });
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

      // Stage 1→2: hero-1 уходит → в той же точке появляется hero-2-top → едет наверх
      tl.to(".hero-1", { autoAlpha: 0 }, 0.0)
        .to(".menu-logo", { left: "50%", xPercent: -50, ease: "power2.inOut" }, 0.0)
        // появляется ровно там же, где была «ЕСЛИ УЖ НАЧАЛ»
        .to(".hero-2-top", { autoAlpha: 1, ease: "power2.out" }, 0.35)
        // плавно едет наверх
        .to(".hero-2-top", { y: "-28vh", ease: "power2.inOut" }, 0.7);

      // Stage 3: фото появляется в центре, затем cap-1
      tl.to(".hero-photo-wrap", { autoAlpha: 1 }, 1.4)
        .to(".hero-photo", { scale: 1.0 }, 1.4)
        .to(".caps-wrap", { autoAlpha: 1 }, 1.5)
        .to(".cap-1", { autoAlpha: 1 }, 1.5);

      // Фото растёт, cap-1 → cap-2
      tl.to(".hero-photo", { scale: 1.2 }, 2.4)
        .set(".cap-1", { autoAlpha: 0 }, 3.2)
        .set(".cap-2", { autoAlpha: 1 }, 3.2);

      // Фото растёт, cap-2 → cap-3
      tl.to(".hero-photo", { scale: 1.45 }, 3.2)
        .set(".cap-2", { autoAlpha: 0 }, 4.2)
        .set(".cap-3", { autoAlpha: 1 }, 4.2);

      tl.to(".hero-photo", { scale: 1.65 }, 4.2);

      // Stage 4: темнеем
      tl.to(".bg-overlay", { autoAlpha: 1 }, 5.4)
        .to(
          [".hero-2-top", ".hero-photo-wrap", ".caps-wrap", ".menu-logo", ".menu-contacts"],
          { autoAlpha: 0 },
          5.8,
        );

      // Stage 5: финал — все три элемента плавно нарастают вместе, без рывков
      tl.to(
        [".final-logo", ".final-tagline-1", ".final-tagline-2"],
        { autoAlpha: 1, ease: "power1.inOut", duration: 1.4 },
        6.2,
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div className="scroll-track relative h-[700vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Чёрный оверлей */}
          <div
            className="bg-overlay pointer-events-none absolute inset-0 z-30 bg-black"
            style={{ visibility: "hidden", opacity: 0 }}
          />

          {/* Меню */}
          <div
            className="absolute inset-x-0 top-0 z-50 flex items-center"
            style={{ height: "56px" }}
          >
            <a
              href="#"
              className="menu-logo absolute select-none text-[#0b0b0b]"
              style={{ left: "1.5rem", fontSize: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.01em" }}
            >
              I DO
            </a>
            <a
              href="mailto:hello@i-do.studio"
              className="menu-contacts absolute select-none text-[#0b0b0b]"
              style={{ right: "1.5rem", fontSize: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.01em" }}
            >
              Контакты
            </a>
          </div>

          {/* Stage 1 — «ЕСЛИ УЖ НАЧАЛ» — абсолютный центр */}
          <h1
            className="hero-1 hero-display absolute inset-0 z-10 m-0 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE }}
          >
            Если уж&nbsp;начал
          </h1>

          {/* Stage 2 — «ТО ДЕЛАЙ» — ТОЧНО ТА ЖЕ ПОЗИЦИЯ что и hero-1, появляется на месте, едет наверх */}
          <div
            className="hero-2-top hero-display absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-[#0b0b0b]"
            style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}
          >
            То&nbsp;делай
          </div>

          {/* Stage 3 — фото в центре экрана */}
          <div
            className="hero-photo-wrap absolute inset-0 z-20 flex items-center justify-center"
            style={{ visibility: "hidden", opacity: 0 }}
          >
            <div
              className="hero-photo relative overflow-hidden bg-black"
              style={{
                width: "clamp(70px, 9vw, 140px)",
                height: "clamp(70px, 9vw, 140px)",
                willChange: "transform",
              }}
            >
              <Image
                src="/hero-frame.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100px, 140px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Stage 3 — фразы под центром */}
          <div
            className="caps-wrap absolute inset-x-0 z-20 flex items-center justify-center px-6"
            style={{ top: "60%", visibility: "hidden", opacity: 0 }}
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
              style={{ fontSize: HERO_SIZE, visibility: "hidden", opacity: 0 }}
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
              Для тех, кто выбирает лучшее
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
