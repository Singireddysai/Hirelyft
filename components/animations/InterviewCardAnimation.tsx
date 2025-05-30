"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const InterviewCardAnimation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!el.current) return;

    const cards = el.current.querySelectorAll(".interview-card");
    if (cards.length > 0) {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.4, y: 50 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 99%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return <div ref={el}>{children}</div>;
};

export default InterviewCardAnimation;
