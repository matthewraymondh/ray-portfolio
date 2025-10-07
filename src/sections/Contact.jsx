import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Ready to deploy an intelligent platform or modernize operations?
Let’s align on outcomes, architecture, and the teams required to deliver.`;
  const items = [
    "ship genai products",
    "ship genai products",
    "ship genai products",
    "ship genai products",
    "ship genai products",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div className="content-container">
        <AnimatedHeaderSection
          subTitle={"Supervisor • Web, AI & Mobile"}
          title={"Let's Collab"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2 className="heading-font text-[32px] lg:text-[42px] tracking-tight">
                E-mail
              </h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="mailto:raymondhartono76@gmail.com"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-gold transition-colors duration-200"
              >
                raymondhartono76@gmail.com
              </a>
            </div>
            <div className="social-link">
              <h2 className="heading-font text-[32px] lg:text-[42px] tracking-tight">
                Phone
              </h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="tel:+6287712346050"
                className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-gold transition-colors duration-200"
              >
                +62&nbsp;877&nbsp;1234&nbsp;6050
              </a>
            </div>
            <div className="social-link">
              <h2 className="heading-font text-[32px] lg:text-[42px] tracking-tight">
                Social Media
              </h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="focus-ring inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-xs leading-loose tracking-[0.35em] uppercase md:text-sm hover:border-gold hover:text-gold transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
