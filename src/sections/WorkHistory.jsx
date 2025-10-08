import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { workHistory } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Icon } from "@iconify/react/dist/iconify.js";

gsap.registerPlugin(ScrollTrigger);

const WorkHistory = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineProgressRef = useRef(null);
  const text =
    "Career chapters spanning healthcare, academia, and independent consulting—each blending AI strategy with hands-on delivery.";

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const animations = [];

    cardsRef.current.filter(Boolean).forEach((card) => {
      const accent = card.querySelector(".workhistory-card-accent");
      const badge = card.querySelector(".workhistory-card-index");
      const connector = card.querySelector(".workhistory-card-connector");
      const node = card.querySelector(".workhistory-card-node");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      tl.from(card, {
        opacity: 0,
        y: 120,
        duration: 0.9,
        ease: "power3.out",
      });

      if (accent) {
        tl.fromTo(
          accent,
          { autoAlpha: 0, scale: 0.95 },
          {
            autoAlpha: 0.85,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "<"
        );
      }

      if (badge) {
        tl.from(
          badge,
          {
            y: 12,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "<+0.05"
        );
      }

      if (connector) {
        tl.fromTo(
          connector,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        );
      }

      if (node) {
        tl.from(
          node,
          {
            scale: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          },
          "<"
        );
      }

      animations.push(tl);
    });

    if (sectionRef.current && timelineProgressRef.current) {
      const progressTween = gsap.fromTo(
        timelineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      animations.push(progressTween);
    }

    return () => {
      animations.forEach((animation) => {
        if (animation?.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation?.kill();
      });
    };
  }, []);

  return (
    <section id="experience" className="relative flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Career Timeline"}
        title={"Work History"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative pb-24 md:pb-32">
        <div className="content-container">
          <div ref={sectionRef} className="relative pl-6 sm:pl-12 md:pl-32">
            <div className="pointer-events-none absolute inset-y-0 left-5 sm:left-10 md:left-16 hidden sm:flex justify-center">
              <span className="block h-full w-px bg-black/15" />
              <span
                ref={timelineProgressRef}
                className="absolute top-0 left-1/2 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-black via-black/80 to-transparent opacity-90 origin-top"
              />
            </div>
            <div className="flex flex-col gap-10 md:gap-14">
              {workHistory.map((role, index) => {
                const step = String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={`${role.company}-${role.period}`}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/85 backdrop-blur-2xl shadow-[0_40px_90px_-60px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <span className="workhistory-card-accent pointer-events-none absolute -inset-px rounded-[34px] bg-[radial-gradient(circle_at_top_left,rgba(207,163,85,0.4),rgba(207,163,85,0)_65%)] opacity-0 blur-[0px] transition-opacity duration-500 group-hover:opacity-80" />
                    <span className="workhistory-card-connector hidden sm:block absolute left-[-3.5rem] top-14 h-px w-[3.5rem] origin-right bg-gradient-to-r from-transparent via-black/30 to-black/60 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                    <span className="workhistory-card-node hidden sm:block absolute left-[-3.5rem] top-[2.65rem] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-black bg-white shadow-[0_0_0_6px_rgba(0,0,0,0.05)]" />
                    <div className="grid gap-8 p-6 sm:p-8 md:p-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.8fr)] md:items-start">
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] text-black/50">
                          <span className="workhistory-card-index inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-sm font-medium text-black/70 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.6)]">
                            {step}
                          </span>
                          <span
                            className="h-px w-8 bg-black/15 sm:w-12"
                            aria-hidden="true"
                          />
                          <span>{role.period}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight heading-font text-black">
                          {role.role}
                        </h2>
                        <div className="space-y-1">
                          <p className="text-base sm:text-lg uppercase tracking-[0.35em] text-black/60">
                            {role.company}
                          </p>
                          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/35">
                            {role.location}
                          </p>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-black/70 max-w-xl">
                          {role.summary}
                        </p>
                      </div>
                      <div className="flex flex-col gap-6">
                        <ul className="space-y-4 text-sm md:text-base leading-relaxed text-black/70">
                          {role.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex items-start gap-3"
                            >
                              <Icon
                                icon="lucide:sparkles"
                                className="mt-1 h-4 w-4 text-[#cfa355]"
                                aria-hidden="true"
                              />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {role.stack.map((tech) => (
                            <span
                              key={`${role.company}-${tech}`}
                              className="inline-flex items-center rounded-full border border-black/[0.08] bg-gradient-to-r from-black/[0.04] via-white/60 to-white/80 px-4 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-black/60 backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;
