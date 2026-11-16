"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (e: Event) => {
      const anchor = (e.target as any).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.getAttribute("target") === "_blank") return;
      if (href.startsWith("http:") || href.startsWith("https:") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      e.preventDefault();

      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      tl.set(".transition_wrap", { display: "flex", opacity: 1, visibility: "visible" });
      tl.fromTo(
        ".transition_panel",
        { yPercent: 0 },
        { yPercent: 100, duration: 0.4, ease: "power2.inOut", stagger: 0.08 }
      );
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router]);

  return (
    <>
      {children}
      <div className="transition_wrap" aria-hidden="true">
        <div className="transition_panel" />
        <div className="transition_panel" />
        <div className="transition_panel" />
      </div>
    </>
  );
}
