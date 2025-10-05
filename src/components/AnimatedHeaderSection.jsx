import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
  primaryCta,
  secondaryCta,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  const isLightText = textColor?.includes("white");
  const subtitleTone = isLightText ? "text-white/60" : "text-black/60";
  const dividerTone = isLightText ? "border-white/15" : "border-black/10";
  const primaryCtaClasses = isLightText
    ? "focus-ring inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-black text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:text-black"
    : "focus-ring inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-white text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:text-black";
  const secondaryCtaClasses = isLightText
    ? "focus-ring inline-flex items-center justify-center rounded-full border border-white px-8 py-3 text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black"
    : "focus-ring inline-flex items-center justify-center rounded-full border border-black px-8 py-3 text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white";
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16 content-container"
        >
          <p
            className={`text-xs sm:text-sm font-light tracking-[0.35rem] uppercase ${subtitleTone} ${textColor}`}
          >
            {subTitle}
          </p>
          <h1
            className={`flex flex-col gap-10 uppercase banner-text-responsive sm:gap-16 md:block ${textColor}`}
          >
            {titleParts.map((part, index) => (
              <span key={index}>{part} </span>
            ))}
          </h1>
        </div>
      </div>
      <div className={`relative ${textColor}`}>
        <div className={`absolute inset-x-0 border-t-2 ${dividerTone}`} />
        <div className="content-container py-12 sm:py-16">
          <AnimatedTextLines
            text={text}
            className={`font-light value-text-responsive text-right ${textColor}`}
          />
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap justify-end gap-4 mt-10">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className={primaryCtaClasses}
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className={secondaryCtaClasses}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
