import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const clampProgress = (value) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
};

const Loader = ({ progress = 0, isComplete = false, onComplete }) => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const barRef = useRef(null);
  const highlightRef = useRef(null);
  const sweepRef = useRef(null);
  const counter = useRef({ value: 0 });
  const hasExitStarted = useRef(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [counterComplete, setCounterComplete] = useState(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (sweepRef.current) {
        gsap.set(sweepRef.current, { y: "100%" });
      }
      if (highlightRef.current) {
        gsap.set(highlightRef.current, { scale: 0.85, opacity: 0.7 });
      }
      gsap.from(frameRef.current, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
      });
      if (highlightRef.current) {
        gsap.to(highlightRef.current, {
          scale: 1,
          opacity: 0.9,
          duration: 1.4,
          ease: "power3.out",
        });
      }
      gsap.from(".loader-ring", {
        scale: 0.92,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
      gsap.from(".loader-accent", {
        width: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
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
    const tweenDuration = gsap.utils.clamp(
      1,
      4,
      Math.max(1.2, Math.abs(target - currentValue) * 0.06)
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

    if (barRef.current) {
      gsap.killTweensOf(barRef.current);
      gsap.to(barRef.current, {
        width: `${target}%`,
        duration: tweenDuration,
        ease: "power2.inOut",
      });
    }
  }, [progress, counterComplete]);

  useEffect(() => {
    if (!isComplete || !counterComplete || hasExitStarted.current) return;

    hasExitStarted.current = true;
    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        onComplete?.();
      },
    });

    if (barRef.current) {
      tl.to(barRef.current, {
        width: "110%",
        duration: 0.7,
        ease: "power2.inOut",
      });
    }

    const sheen = containerRef.current?.querySelector(".loader-sheen");
    if (sheen) {
      tl.to(
        sheen,
        {
          x: "180%",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    if (highlightRef.current) {
      tl.to(
        highlightRef.current,
        {
          scale: 1.25,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "<"
      );
    }

    if (frameRef.current) {
      tl.to(
        frameRef.current,
        {
          scale: 1.03,
          y: -12,
          duration: 0.45,
          ease: "power2.out",
        },
        "<+0.05"
      );
    }

    if (sweepRef.current) {
      tl.to(
        sweepRef.current,
        {
          y: "-12%",
          duration: 0.65,
          ease: "power3.inOut",
        },
        "<"
      );
    }

    if (frameRef.current) {
      tl.to(
        frameRef.current,
        {
          y: -48,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.6,
          ease: "power3.in",
        },
        "<+0.2"
      );
    }

    if (sweepRef.current) {
      tl.to(
        sweepRef.current,
        {
          y: "-140%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<+0.1"
      );
    }

    tl.to(
      containerRef.current,
      {
        autoAlpha: 0,
        duration: 0.65,
        ease: "power2.inOut",
      },
      "<+0.05"
    );

    return () => tl.kill();
  }, [isComplete, counterComplete, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-[#1f1d1a] to-[#2d2924] text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={highlightRef}
          className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,163,85,0.45),transparent_70%)] blur-[90px] opacity-80 animate-[loaderPulse_6s_ease-in-out_infinite]"
        />
        <div className="loader-ring absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10 opacity-40 animate-[spin_20s_linear_infinite]" />
        <div className="loader-ring absolute bottom-12 left-16 h-24 w-24 rounded-full border border-white/10 opacity-20 animate-[spin_26s_linear_infinite]" />
        <div className="loader-ring absolute right-16 top-16 h-32 w-32 rounded-full border border-white/10 opacity-20 animate-[spin_24s_linear_infinite]" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={sweepRef}
          className="absolute inset-0 bg-[linear-gradient(160deg,rgba(207,163,85,0.35)_0%,rgba(255,255,255,0.4)_35%,rgba(27,26,24,0)_70%)] mix-blend-soft-light"
        />
      </div>
      <div
        ref={frameRef}
        className="relative z-10 flex w-full max-w-3xl flex-col gap-10 rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 uppercase tracking-[0.35em] text-xs text-white/40">
            <span className="loader-accent block h-px w-16 bg-white/30" />
            <span>Matthew Raymond Hartono</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-6xl font-light leading-none md:text-7xl">
              {displayProgress.toString().padStart(2, "0")}
            </span>
            <span className="mb-1 text-sm uppercase tracking-[0.35em] text-white/40">
              %
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-white/50 sm:text-xs">
            <span>Calibrating intelligent surfaces</span>
            <span>Initializing systems</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={barRef}
              className="relative h-full w-0 rounded-full bg-gradient-to-r from-white via-[#f5e7d4] to-[#cfa355]"
            >
              <span className="loader-sheen pointer-events-none absolute inset-y-0 w-1/3 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80 mix-blend-screen animate-[loaderSheen_2.6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/40 sm:text-xs">
          <span>GenAI systems · Full-stack delivery · Mobile ops</span>
          <span>Stay with me—experience loads soon</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
