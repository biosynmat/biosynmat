"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function SitePreloader() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  useGSAP(
    () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      timeline
        .to({}, { duration: 0.5 })
        .to(".panel-one", {
          xPercent: 100,
          duration: 1.2,
          ease: "power3.inOut",
        })
        .to({}, { duration: 0.1 })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => setLoading(false),
        });

      return () => {
        timeline.kill();
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden font-bold"
    >
      {/* Bottom Layer - Panel 2 */}
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white text-slate-900">
        <h1 className="text-center text-3xl leading-15!  sm:text-5xl md:text-6xl lg:text-7xl!">
          Science as the{" "}
          <span className="bg-black text-white italic py-1 pl-1 pr-2">
            tool
          </span>
          .
        </h1>
      </div>

      {/* Top Layer - Panel 1 (Slides Out) */}
      <div className="panel-one absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black text-white">
        <h1 className="text-center text-3xl leading-15!  sm:text-5xl md:text-6xl lg:text-7xl!">
          Nature as the{" "}
          <span className="bg-white text-black italic p-1">blueprint</span>,
        </h1>
      </div>
    </div>
  );
}
