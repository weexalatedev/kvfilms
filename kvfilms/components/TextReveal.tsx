"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Small GSAP entrance used by the hero headings. Text stays visible in the
 * server-rendered markup, so it also works without JavaScript.
 */
export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.from(el, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
