import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  const text = `GenAI leadership combined with full-stack execution.
From RAG research to enterprise rollouts, every layer is production-ready.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const triggers = [];

    serviceRefs.current.forEach((el, index) => {
      if (!el) return;
      const card = el.querySelector(".service-card");

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });

      if (!prefersReducedMotion && card) {
        gsap.set(card, {
          transformOrigin: "center top",
          willChange: "transform, opacity",
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.94,
          pointerEvents: index === 0 ? "auto" : "none",
        });

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.set(card, { pointerEvents: "auto" });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.set(card, { pointerEvents: "auto" });
          },
          onLeave: () => {
            gsap.to(card, {
              opacity: 0,
              scale: 0.94,
              duration: 0.4,
              ease: "power2.in",
              overwrite: "auto",
            });
            gsap.set(card, { pointerEvents: "none" });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              scale: 0.94,
              duration: 0.4,
              ease: "power2.in",
              overwrite: "auto",
            });
            gsap.set(card, { pointerEvents: "none" });
          },
        });

        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="content-container">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            className="sticky text-white border-t border-white/15"
            style={
              isDesktop
                ? {
                    top: `calc(16vh + ${index * 5}em)`,
                    marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                    zIndex: servicesData.length - index,
                  }
                : { top: 0, zIndex: servicesData.length - index }
            }
          >
            <div className="flex items-center gap-3 pb-6 text-xs uppercase tracking-[0.6em] text-white/50">
              <span>0{index + 1}</span>
              <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              <span className="tracking-[0.35em] text-white/70">
                {service.title}
              </span>
            </div>
            <div className="py-12 md:py-20">
              <div className="service-card relative overflow-hidden rounded-[32px] border border-white/15 bg-black/80 backdrop-blur-lg shadow-[0_40px_80px_-60px_rgba(0,0,0,0.9)]">
                <div className="grid gap-10 p-8 md:p-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl heading-font uppercase tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-white/70 text-pretty max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-col divide-y divide-white/10 rounded-3xl bg-white/[0.04] backdrop-blur-xl overflow-hidden">
                    {service.items.map((item, itemIndex) => (
                      <div
                        key={`item-${index}-${itemIndex}`}
                        className="flex flex-col gap-2 p-6 md:p-8"
                      >
                        <h3 className="text-base md:text-lg uppercase tracking-[0.35em] text-white/80 flex items-center gap-4">
                          <span className="text-gold">0{itemIndex + 1}</span>
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/60">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
