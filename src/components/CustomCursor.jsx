import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, [data-cursor='interactive']";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const interactiveActive = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const shouldEnable = hoverQuery.matches && !motionQuery.matches;
      setEnabled(shouldEnable);
      if (!shouldEnable) {
        document.body.classList.remove("has-custom-cursor");
      }
    };

    const addMediaListener = (query, handler) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", handler);
      } else {
        query.addListener(handler);
      }
    };

    const removeMediaListener = (query, handler) => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", handler);
      } else {
        query.removeListener(handler);
      }
    };

    evaluate();
    addMediaListener(hoverQuery, evaluate);
    addMediaListener(motionQuery, evaluate);

    return () => {
      removeMediaListener(hoverQuery, evaluate);
      removeMediaListener(motionQuery, evaluate);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !dotRef.current) return;

    document.body.classList.add("has-custom-cursor");

    gsap.set([cursorRef.current, dotRef.current], {
      xPercent: -50,
      yPercent: -50,
    });

    const cursorX = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const cursorY = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });
    const dotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.18,
      ease: "power3.out",
    });
    const dotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.18,
      ease: "power3.out",
    });

    const handlePointerMove = ({ clientX, clientY }) => {
      setVisible(true);
      cursorX(clientX);
      cursorY(clientY);
      dotX(clientX);
      dotY(clientY);
    };

    const handlePointerLeaveWindow = () => {
      setVisible(false);
      setVariant("default");
      interactiveActive.current = false;
    };

    const handlePointerOver = (event) => {
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (!target) return;
      interactiveActive.current = true;
      setVariant("interactive");
    };

    const handlePointerOut = (event) => {
      if (!interactiveActive.current) return;
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (!target) return;
      if (event.relatedTarget && target.contains(event.relatedTarget)) return;
      interactiveActive.current = false;
      setVariant("default");
    };

    const handlePointerDown = () => {
      setVariant(interactiveActive.current ? "interactive" : "pressed");
    };

    const handlePointerUp = () => {
      setVariant(interactiveActive.current ? "interactive" : "default");
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("pointerleave", handlePointerLeaveWindow);
    window.addEventListener("blur", handlePointerLeaveWindow);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("pointerleave", handlePointerLeaveWindow);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const baseOuterClass =
    "custom-cursor pointer-events-none fixed top-0 left-0 z-[1100] rounded-full mix-blend-difference transform-gpu transition-[opacity,transform,border-color,background-color] duration-200 ease-out";

  const baseDotClass =
    "custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[1100] rounded-full transform-gpu transition-[opacity,transform,background-color] duration-150 ease-out";

  const visibilityClass = visible ? "opacity-100" : "opacity-0";

  let outerVariantClass = "";
  let outerScaleClass = "";
  switch (variant) {
    case "pressed":
      outerVariantClass =
        "w-10 h-10 border-[2px] border-[rgba(31,29,26,0.72)] bg-[rgba(31,29,26,0.08)]";
      outerScaleClass = "scale-95";
      break;
    case "interactive":
      outerVariantClass =
        "w-[3.5rem] h-[3.5rem] border-[1.6px] border-[rgba(207,163,85,0.88)] bg-[rgba(207,163,85,0.14)] backdrop-blur-[3px]";
      outerScaleClass = "scale-105";
      break;
    default:
      outerVariantClass =
        "w-12 h-12 border border-[rgba(31,29,26,0.6)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[2px]";
      outerScaleClass = "scale-100";
  }

  let dotVariantClass = "";
  switch (variant) {
    case "pressed":
      dotVariantClass = "w-2 h-2 bg-[rgba(31,29,26,0.85)] opacity-100 scale-75";
      break;
    case "interactive":
      dotVariantClass =
        "w-2.5 h-2.5 bg-[rgba(207,163,85,0.95)] opacity-95 scale-150";
      break;
    default:
      dotVariantClass =
        "w-2.5 h-2.5 bg-[rgba(31,29,26,0.88)] opacity-100 scale-100";
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`${baseOuterClass} ${outerVariantClass} ${outerScaleClass} ${visibilityClass}`}
      />
      <div
        ref={dotRef}
        className={`${baseDotClass} ${dotVariantClass} ${visibilityClass}`}
      />
    </>
  );
};

export default CustomCursor;
