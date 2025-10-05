import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `AI-driven product leadership
    architecting web, mobile, and intelligence platforms
    that keep teams shipping at scale`;
  const aboutText = `I’m Matthew Raymond Hartono—Supervisor of Web, AI, and Mobile Development at PT Erlangga Edi Laboratories. My craft sits at the intersection of GenAI research, pragmatic software delivery, and calm leadership.

Highlights:
• Published SINTA 2 research on YOLOv5 + Optical Flow with 94% accuracy
• Leading a customer loyalty platform (Next.js, Flutter, Node.js, Google ML Kit)
• Delivered an ERP payroll system automating 2,000+ salaries at PT Arindo Garmentama
• Guiding academic automation for Universitas Dian Nuswantoro with synchronized web + Flutter apps

Certifications & Recognition:
• Alibaba Cloud Certified Developer & System Operator (ACA)
• React.js State Management, JavaScript Asynchronous specialist
• Outstanding Class Student, Codepolitan Reference Letter, Best Department 2025

Languages:
• Indonesian — Native or Bilingual
• English — Full Professional

Focus Areas:
• Retrieval-Augmented Generation, GenAI Safety, Go Services
• Next.js & Flutter product ecosystems, AWS ECR & cloud-native ops

I thrive on complex briefs, cross-functional collaboration, and translating frontier AI into dependable products.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="content-container pb-16">
        <div className="flex flex-col items-center justify-between gap-16 text-lg font-light tracking-wide text-white/70 md:text-xl lg:flex-row lg:text-2xl">
          <img
            ref={imgRef}
            src="/images/man.jpg"
            alt="Matthew Raymond Hartono portrait"
            className="max-w-md w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <AnimatedTextLines text={aboutText} className={"w-full max-w-2xl"} />
        </div>
      </div>
    </section>
  );
};

export default About;
