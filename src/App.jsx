import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import WorkHistory from "./sections/WorkHistory";
import Works from "./sections/Works";
import GithubPulse from "./sections/GithubPulse";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";

const App = () => {
  const { progress } = useProgress();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      setHasLoaded(true);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <CustomCursor />
      {showLoader && (
        <Loader
          progress={progress}
          isComplete={hasLoaded}
          onComplete={() => setShowLoader(false)}
        />
      )}
      <div
        className={`transition-opacity duration-1000 ${
          hasLoaded ? "opacity-100" : "opacity-0"
        } ${showLoader ? "pointer-events-none" : "pointer-events-auto"}`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <WorkHistory />
        <Works />
        <GithubPulse />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
