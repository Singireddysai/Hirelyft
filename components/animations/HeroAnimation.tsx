"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroFadeInAnimation = ({ children }: { children: React.ReactNode }) => {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (el.current) {
      const navItems = el.current.querySelectorAll(".hero-animation");
      if (navItems.length > 0) {
        gsap.fromTo(
          navItems,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
          }
        );
      }
    }
  }, []);

  return <div ref={el}>{children}</div>;
};

export default HeroFadeInAnimation;
