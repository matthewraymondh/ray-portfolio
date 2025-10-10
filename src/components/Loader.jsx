import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const clampProgress = (value) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
};

const statusCopy = [
  { threshold: 20, label: "Calibrating surfaces" },
  { threshold: 45, label: "Bootstrapping pipelines" },
  { threshold: 70, label: "Syncing assets" },
  { threshold: 95, label: "Priming experience" },
  { threshold: 100, label: "Ready" },
];

const stylizeProgress = (value) => {
  const clamped = clampProgress(value);
  if (clamped <= 50) {
    return gsap.utils.interpolate(0, 42, clamped / 50);
  }
  if (clamped <= 65) {
    const holdProgress = (clamped - 50) / 15; // 0 -> 1
    return 42 + Math.pow(holdProgress, 0.65) * 5; // ease-in hold to ~47%
  }
  return 47 + ((clamped - 65) / 35) * 53; // accelerate to 100%
};

const Loader = ({ progress = 0, isComplete = false, onComplete }) => {
  const containerRef = useRef(null);
  const counter = useRef({ value: 0 });
  const contentRef = useRef(null);
  const hasExitStarted = useRef(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [counterComplete, setCounterComplete] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(".loader-progress-wheel", {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".loader-bars div", {
        width: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const target = clampProgress(progress);

    if (target < 100 && counterComplete) {
      setCounterComplete(false);
      hasExitStarted.current = false;
    }

    const currentValue = counter.current.value;
    const progressDelta = Math.abs(target - currentValue);

    const tweenDuration = gsap.utils.clamp(
      0.8,
      2.4,
      0.8 + progressDelta * 0.03
    );

    gsap.killTweensOf(counter.current);
    gsap.to(counter.current, {
      value: target,
      duration: tweenDuration,
      ease: "power1.inOut",
      onUpdate: () => {
        setDisplayProgress(Math.round(counter.current.value));
      },
      onComplete: () => {
        setDisplayProgress(Math.round(counter.current.value));
        if (target >= 100) {
          setCounterComplete(true);
        }
      },
    });
  }, [progress, counterComplete]);

  const stylizedProgressValue = useMemo(
    () => stylizeProgress(displayProgress),
    [displayProgress]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const bottomInset = Math.max(0, stylizedProgressValue);
    containerRef.current.style.clipPath = `inset(0% 0% ${bottomInset}% 0%)`;
    if (contentRef.current && viewportHeight) {
      const targetY = gsap.utils.mapRange(
        0,
        100,
        0,
        -viewportHeight * 0.92,
        stylizedProgressValue
      );

      gsap.set(contentRef.current, { y: targetY });
    }
  }, [stylizedProgressValue, viewportHeight]);

  useEffect(() => {
    if (!isComplete || !counterComplete || hasExitStarted.current) return;

    hasExitStarted.current = true;
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(containerRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    tl.set(containerRef.current, { display: "none" });

    return () => tl.kill();
  }, [isComplete, counterComplete, onComplete]);

  const statusLabel = useMemo(() => {
    const found = statusCopy.find(
      ({ threshold }) => displayProgress < threshold
    );
    return found ? found.label : "Ready";
  }, [displayProgress]);

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    []
  );

  const outerRadius = 140;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const outerDashoffset = outerCircumference * (1 - displayProgress / 100);

  const innerRadius = 85;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerDashoffset = innerCircumference * (1 - displayProgress / 100);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[999] flex items-stretch justify-center overflow-hidden text-white"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="absolute inset-0 bg-[#0b0b0b]" />
      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 pb-10 pt-16 sm:px-10"
      >
        <div className="loader-progress-wheel pointer-events-none absolute right-[6vw] top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[360px] w-[360px]">
            <svg
              viewBox="0 0 360 360"
              className="h-full w-full rotate-[-90deg]"
              aria-hidden="true"
            >
              <circle
                cx="180"
                cy="180"
                r={outerRadius}
                stroke="#2f2f2f"
                strokeWidth="24"
                fill="none"
              />
              <circle
                cx="180"
                cy="180"
                r={outerRadius}
                stroke="#cfa355"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={outerCircumference}
                strokeDashoffset={outerDashoffset}
              />
              <circle
                cx="180"
                cy="180"
                r={innerRadius}
                stroke="#2f2f2f"
                strokeWidth="18"
                fill="none"
              />
              <circle
                cx="180"
                cy="180"
                r={innerRadius}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={innerCircumference}
                strokeDashoffset={innerDashoffset}
              />
            </svg>
            <div className="pointer-events-none absolute right-[-72px] top-[28px] hidden h-[230px] w-[76px] rounded-t-[18px] border border-[#2f2f2f] bg-[#191919] lg:flex">
              <div
                className="mt-auto w-full bg-[#cfa355]/80 transition-all duration-500"
                style={{ height: `${stylizedProgressValue}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-end">
          <div className="flex w-full flex-col gap-10">
            <div className="flex flex-wrap items-baseline gap-4 text-white">
              <span className="text-[10vw] font-semibold leading-none sm:text-7xl lg:text-8xl xl:text-9xl">
                {displayProgress.toString().padStart(2, "0")}
                <span className="ml-1 text-4xl align-top text-white/60">%</span>
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-white/40">
                {statusLabel}
              </span>
            </div>

            <div className="loader-bars flex w-full max-w-xs flex-col gap-3">
              {[0, 1, 2].map((idx) => (
                <div
                  key={`loader-bar-${idx}`}
                  className="h-3 rounded-full bg-[#141824]"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-[0.65rem] uppercase tracking-[0.35em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Powered by Matthew Raymond Hartono</span>
          <span className="mx-auto hidden items-center gap-2 text-white/50 sm:flex">
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
            Scroll down
          </span>
          <span className="text-right sm:text-left">{todayLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
