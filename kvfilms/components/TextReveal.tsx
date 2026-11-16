"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const inits = new Set<Element>();
    const run = () => {
      document.querySelectorAll<HTMLElement>("[data-text-reveal='true']").forEach((el) => {
        if (inits.has(el)) return;
        inits.add(el);
        const split = SplitText.create(el.children, {
          type: "lines, words",
          mask: "lines",
          linesClass: "line",
          wordsClass: "word",
          charsClass: "char",
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 80%",
            toggleActions: "none play none none",
          },
        });
        tl.from(split.lines, {
          opacity: 0,
          yPercent: 110,
          delay: 0.05,
          duration: 0.6,
          stagger: { amount: 0.1 },
          ease: "power4.out",
        });
        gsap.set(el, { visibility: "visible" });
      });
    };
    run();
    window.addEventListener("load", run);
    return () => window.removeEventListener("load", run);
  }, []);

  return (
    <span data-text-reveal="true" style={{ visibility: "hidden" }} className={className}>
      {children}
    </span>
  );
}
