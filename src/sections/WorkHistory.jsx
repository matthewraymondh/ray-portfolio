import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { workHistory } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

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
      const animation = gsap.from(card, {
        opacity: 0,
        y: 120,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      animations.push(animation);
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
            <div className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 md:left-16 hidden md:flex justify-center">
              <span className="block h-full w-px bg-black/15" />
              <span
                ref={timelineProgressRef}
                className="absolute top-0 left-1/2 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-black via-black/80 to-transparent opacity-90 origin-top"
              />
            </div>
            <div className="flex flex-col gap-10 md:gap-14">
              {workHistory.map((role, index) => (
                <article
                  key={`${role.company}-${role.period}`}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/80 backdrop-blur-2xl shadow-[0_40px_90px_-60px_rgba(0,0,0,0.8)]"
                >
                  <span className="hidden md:block absolute left-[-4rem] top-12 h-px w-[4rem] bg-black/15 opacity-60 transition-colors duration-500 group-hover:bg-black/40" />
                  <span className="hidden md:block absolute left-[-4rem] top-12 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-black bg-white shadow-[0_0_0_6px_rgba(0,0,0,0.05)]" />
                  <div className="grid gap-8 p-6 sm:p-8 md:p-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.8fr)] md:items-start">
                    <div className="space-y-4 sm:space-y-5">
                      <p className="text-xs uppercase tracking-[0.4em] text-black/50">
                        {role.period}
                      </p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight heading-font">
                        {role.role}
                      </h2>
                      <p className="text-base sm:text-lg uppercase tracking-[0.35em] text-black/60">
                        {role.company}
                      </p>
                      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/40">
                        {role.location}
                      </p>
                      <p className="text-base md:text-lg leading-relaxed text-black/70 max-w-xl">
                        {role.summary}
                      </p>
                    </div>
                    <div className="flex flex-col gap-6">
                      <ul className="space-y-3 text-sm md:text-base leading-relaxed text-black/70 list-disc pl-5">
                        {role.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {role.stack.map((tech) => (
                          <span
                            key={`${role.company}-${tech}`}
                            className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-black/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;
