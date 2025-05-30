"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const FadeInAnimation = ({ children }: { children: React.ReactNode }) => {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!el.current) return;
    const navItems = el.current.querySelectorAll(".fade-in");
    if (navItems.length > 0) {
      gsap.fromTo(
        navItems,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
    const delayFadeIn = el.current.querySelectorAll(".fade-in-delay1");
    if (delayFadeIn.length > 0) {
      gsap.fromTo(
        delayFadeIn,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }
    const fadeappearItems = el.current.querySelectorAll(".fade-appear");
    if (fadeappearItems.length > 0) {
      gsap.fromTo(
        fadeappearItems,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [pathname]);

  return <div ref={el}>{children}</div>;
};

export default FadeInAnimation;
