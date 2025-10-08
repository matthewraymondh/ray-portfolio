import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const About = () => {
  const text = `AI-driven product leadership crafted around web, mobile, and intelligence platforms that keep teams shipping at scale.`;
  const introText = `I’m Matthew Raymond Hartono—Supervisor of Web, AI, and Mobile Development at PT Erlangga Edi Laboratories. I steward GenAI research into resilient products, lead multi-disciplinary delivery teams, and cultivate calm execution even when timelines and experiments get intense.`;

  const highlights = [
    "Published SINTA 2 research on YOLOv5 + Optical Flow achieving 94% player tracking accuracy.",
    "Launched a nationwide loyalty ecosystem for ERELA spanning Next.js, Flutter, Node.js, and Google ML Kit.",
    "Automated ERP payroll for 2,000+ employees at PT Arindo Garmentama with biometric integrations.",
    "Modernised university operations at UDINUS through synchronized web + Flutter platforms and AI copilots.",
    "Designed GenAI readiness playbooks—evaluation, red teaming, and prompt governance—for 20+ product squads.",
    "Built a Scholar Publication ingestion pipeline with proxy rotation, Prisma, and resilient Next.js APIs for faculty analytics.",
    "Mentored cross-functional engineers transitioning into AI/ML roles via hands-on labs, architecture reviews, and delivery rituals.",
    "Scaled the ERELA sales superapp with offline-first Flutter + Go architecture powering 200+ field reps across Indonesia.",
    "Led AI evaluation guilds that keep hallucination rates under 3% through automated regression, human review, and cost telemetry.",
  ];

  const certifications = [
    "Alibaba Cloud Certified Developer & System Operator (ACA)",
    "React.js State Management & Advanced Asynchronous JavaScript",
    "Outstanding Class Student • Codepolitan Reference • Best Department 2025",
  ];

  const education = [
    {
      institution: "Universitas Dian Nuswantoro",
      program: "B.Sc. Computer Science · Jul 2021 – Sep 2025",
      detail:
        "CGPA 3.89 • Deep focus on AI, ML, computer vision, and full-stack engineering across campus-wide projects.",
    },
    {
      institution: "CS50 • Harvard University",
      program: "CS50x Computer Science Fundamentals · Jan 2021 – Mar 2021",
      detail:
        "Solid grounding in algorithms, C, Python, and web programming—basis for later GenAI and systems work.",
    },
    {
      institution: "Sedes Sapientiae Senior High School",
      program: "Science Track · Jul 2018 – Jul 2021",
      detail:
        "STEM-intensive curriculum with early exposure to programming, research competitions, and leadership roles.",
    },
  ];

  const focusAreas = [
    "Retrieval-Augmented Generation & GenAI Safety",
    "Go + Node.js services with observability and governance",
    "Next.js and Flutter ecosystems with platform cohesion",
    "AWS ECR, container orchestration, and cloud-native ops",
  ];

  const imgRef = useRef(null);
  const cardsRef = useRef([]);
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

    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
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
        <div className="flex flex-col gap-16 text-white/80">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            <div className="relative w-full max-w-md overflow-hidden rounded-[40px] border border-white/15 bg-white/5 shadow-[0_40px_90px_-60px_rgba(0,0,0,0.85)]">
              <img
                ref={imgRef}
                src="/images/man.jpg"
                alt="Matthew Raymond Hartono portrait"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 rounded-[40px] border border-white/10 mix-blend-soft-light" />
              <span className="pointer-events-none absolute inset-x-6 bottom-6 rounded-3xl border border-white/15 bg-black/60 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
                Supervisor · Web, AI & Mobile Development
              </span>
            </div>
            <div className="flex-1 space-y-8 text-lg font-light leading-relaxed tracking-wide md:text-xl">
              <AnimatedTextLines text={introText} className={"text-white/70"} />
              <div className="grid gap-6 text-sm uppercase tracking-[0.35em] text-white/60 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
                  <p className="text-white/50">Current Mission</p>
                  <p className="mt-3 text-base normal-case tracking-normal text-white/75">
                    Shipping enterprise GenAI copilots and full-stack platforms
                    that keep ERELA’s teams aligned from field ops to corporate
                    HQ.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
                  <p className="text-white/50">Operating Style</p>
                  <p className="mt-3 text-base normal-case tracking-normal text-white/75">
                    Calm leadership, tight feedback loops, and production
                    discipline—from prompt orchestration to infrastructure
                    rollout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="about-card relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
                <span className="h-px w-10 bg-white/15" aria-hidden="true" />
                <span>Highlights</span>
              </div>
              <ul className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon
                      icon="lucide:check-circle"
                      className="mt-1 h-4 w-4 text-[#cfa355]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div
                ref={(el) => (cardsRef.current[1] = el)}
                className="about-card rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
                  <span className="h-px w-10 bg-white/15" aria-hidden="true" />
                  <span>Certifications & Recognition</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/75">
                  {certifications.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Icon
                        icon="lucide:medal"
                        className="mt-1 h-4 w-4 text-[#cfa355]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div
                  ref={(el) => (cardsRef.current[2] = el)}
                  className="about-card rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
                    <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                    <span>Education</span>
                  </div>
                  <ul className="mt-5 space-y-4 text-sm text-white/75">
                    {education.map(({ institution, program, detail }) => (
                      <li
                        key={`${institution}-${program}`}
                        className="space-y-1 text-xs uppercase tracking-[0.25em] text-white/65"
                      >
                        <p className="text-white/80">{institution}</p>
                        <p className="text-white/50">{program}</p>
                        <p className="text-[0.7rem] normal-case tracking-normal text-white/55">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  ref={(el) => (cardsRef.current[3] = el)}
                  className="about-card rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
                    <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                    <span>Focus Areas</span>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-white/75">
                    {focusAreas.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs uppercase tracking-[0.25em] text-white/60"
                      >
                        <span
                          className="mt-1 h-1.5 w-1.5 rounded-full bg-[#cfa355]"
                          aria-hidden="true"
                        />
                        <span className="normal-case tracking-normal text-white/75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
