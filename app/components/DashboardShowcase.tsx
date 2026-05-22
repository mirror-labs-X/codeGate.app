"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Emil Kowalski spring configs: slow inertia and high damping
  const springX = useSpring(x, { stiffness: 80, damping: 22 });
  const springY = useSpring(y, { stiffness: 80, damping: 22 });

  // Map mouse offsets to 3D rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cursorX = e.clientX - left;
    const cursorY = e.clientY - top;

    // Normalizing between -0.5 and 0.5
    x.set(cursorX / width - 0.5);
    y.set(cursorY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="architecture" className="relative py-24 px-6 bg-black z-10 flex flex-col items-center overflow-hidden">
      {/* Background soft glow behind showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />

      <div className="max-w-5xl w-full text-center mb-16 relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          Sovereign Control Plane
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          The CodeGate Command Center
        </h2>
        <p className="text-zinc-400 font-normal leading-relaxed text-sm max-w-2xl mx-auto">
          Manage your VPC security agent configurations, analyze on-premise scan records, and inspect agentic ReAct workflows in a state-of-the-art interface.
        </p>
      </div>

      {/* 3D Tilt Container */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-4xl w-full aspect-[16/10] rounded-2xl border border-white/[0.08] bg-zinc-950/40 backdrop-blur-md p-2 overflow-hidden shadow-2xl transition-all duration-300 z-10"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="w-full h-full relative rounded-xl overflow-hidden border border-white/[0.04] bg-black"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Custom generated dashboard image mockup */}
          <Image
            src="/codegate_dashboard_mockup.png"
            alt="CodeGate Security Command Center Dashboard"
            fill
            className="object-cover opacity-90 select-none pointer-events-none"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          {/* Subtle glossy reflection glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-cyan-400/[0.05] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
