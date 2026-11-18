"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const el = ref.current;
    const inits = new Set<Element>();
    const run = () => {
      if (inits.has(el)) return;
      inits.add(el);

      // Wrap text content in spans so SplitText has elements to work with
      const textContent = el.textContent?.trim() || "";
      if (textContent) {
        el.innerHTML = "";
        const words = textContent.split(/\s+/);
        words.forEach((word, wordIdx) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "inline-block";
          word.split("").forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "inline-block";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          el.appendChild(wordSpan);
          el.appendChild(document.createTextNode(" "));
        });
      }

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
    };
    run();
    window.addEventListener("load", run);
    return () => window.removeEventListener("load", run);
  }, []);

  return (
    <span ref={ref} data-text-reveal="true" style={{ visibility: "hidden" }} className={className}>
      {children}
    </span>
  );
}
