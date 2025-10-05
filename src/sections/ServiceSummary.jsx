import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });
  return (
    <section className="mt-20 mb-32 overflow-hidden font-light leading-snug text-center contact-text-responsive">
      <div className="content-container space-y-10">
        <div id="title-service-1" className="tracking-tight">
          <p>GenAI Platforms</p>
        </div>
        <div
          id="title-service-2"
          className="flex flex-wrap items-center justify-center gap-4 translate-x-6 md:translate-x-16"
        >
          <p className="font-normal">Retrieval-Augmented</p>
          <div className="w-10 h-1 md:w-24 bg-gold" />
          <p>LLM Apps</p>
        </div>
        <div
          id="title-service-3"
          className="flex flex-wrap items-center justify-center gap-4 -translate-x-10 md:-translate-x-32"
        >
          <p>Next.js</p>
          <div className="w-10 h-1 md:w-24 bg-gold" />
          <p className="italic">Flutter</p>
          <div className="w-10 h-1 md:w-24 bg-gold" />
          <p>Node.js</p>
        </div>
        <div
          id="title-service-4"
          className="translate-x-10 md:translate-x-32 tracking-tight"
        >
          <p>Cloud Ops</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
