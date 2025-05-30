"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const NavFadeInAnimation = ({ children }: { children: React.ReactNode }) => {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!el.current) return;

    gsap.fromTo(
      el.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power1.out" }
    );

    const navItems = el.current.querySelectorAll(".nav");
    if (navItems.length > 0) {
      gsap.fromTo(
        navItems,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }
  }, [pathname]);

  return <div ref={el}>{children}</div>;
};

export default NavFadeInAnimation;
