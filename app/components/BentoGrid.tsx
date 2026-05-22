"use client";

import React, { useRef, useState, MouseEvent, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Target, Brain, Shield, ChevronRight, Database, Code, ShieldCheck } from "lucide-react";

// Individual Bento Card with Mouse Spotlight Effect
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/65 backdrop-blur-md p-8 transition-colors duration-300 hover:border-white/[0.12] ${className}`}
    >
      {/* Light glow overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.08) 0%,
              rgba(99, 102, 241, 0.04) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Glassmorphic border overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.15),
              transparent 70%
            )
          `,
          maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function BentoGrid() {
  const [pulseNodes, setPulseNodes] = useState([true, false, true]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseNodes((prev) => [!prev[0], !prev[1], !prev[2]]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className="relative py-24 px-6 bg-black z-10 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-5xl w-full text-center md:text-left mb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          The Threat-Informed Analyst
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
          Meet CodeGate.
        </h2>
      </div>

      {/* Grid Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Large ( Threat-Informed Hunting ) */}
        <BentoCard className="md:col-span-2 flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="p-2 w-fit rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 mb-6">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
                Threat-Informed Hunting
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                We ingest global vulnerability databases, threat feeds, and security bulletins in real-time. CodeGate proactively scans and hunts for newly disclosed vulnerabilities the moment they occur in public feeds.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 mt-6 hover:text-cyan-300 transition-colors uppercase tracking-wider">
              Explore Feeds <ChevronRight size={14} />
            </a>
          </div>

          {/* Interactive Radar Visualizer */}
          <div className="flex-1 min-h-[180px] bg-zinc-900/20 border border-white/[0.04] rounded-xl flex items-center justify-center p-6 relative overflow-hidden">
            {/* Radar concentric rings */}
            <div className="w-36 h-36 rounded-full border border-white/[0.03] flex items-center justify-center relative">
              <div className="w-24 h-24 rounded-full border border-white/[0.04] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/[0.06] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-400/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Scanning sweep */}
              <div
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,240,255,0.12)_0deg,transparent_120deg)] animate-[spin_6s_linear_infinite]"
                style={{ transformOrigin: "center" }}
              />

              {/* Pingable nodes */}
              <div className="absolute top-6 left-8 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full bg-red-400/80 transition-opacity duration-1000 ${pulseNodes[0] ? "opacity-100 scale-110" : "opacity-30 scale-95"}`} />
              </div>
              <div className="absolute bottom-8 right-6 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full bg-amber-400/80 transition-opacity duration-1000 ${pulseNodes[1] ? "opacity-100 scale-110" : "opacity-30 scale-95"}`} />
              </div>
              <div className="absolute top-16 right-10 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full bg-emerald-400/80 transition-opacity duration-1000 ${pulseNodes[2] ? "opacity-100 scale-110" : "opacity-30 scale-95"}`} />
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Medium ( Agentic Reasoning - ReAct ) */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 mb-6">
              <Brain size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Agentic Reasoning (ReAct)
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Instead of just highlighting code matches, the agent queries environment contexts and runs data-flow validation models to mathematically prove if a vulnerability can be executed.
            </p>
          </div>

          {/* Logic Tree Visual */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.04] flex items-center justify-between relative overflow-hidden font-mono text-[10px]">
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="p-1.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400">
                <Code size={14} />
              </div>
              <span className="text-zinc-500 text-[8px] uppercase tracking-wider">AST Code</span>
            </div>

            {/* Connecting lines */}
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-indigo-500 relative opacity-40 mx-2">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,1)]"
              />
            </div>

            <div className="flex flex-col items-center gap-1 z-10">
              <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 animate-pulse">
                <Brain size={14} />
              </div>
              <span className="text-cyan-400 text-[8px] uppercase tracking-wider">ReAct</span>
            </div>

            {/* Connecting lines */}
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500 to-emerald-400 relative opacity-40 mx-2">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)]"
              />
            </div>

            <div className="flex flex-col items-center gap-1 z-10">
              <div className="p-1.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400">
                <Database size={14} />
              </div>
              <span className="text-zinc-500 text-[8px] uppercase tracking-wider">DB Proof</span>
            </div>
          </div>

          <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">
            Deep-Dive Logic <ChevronRight size={14} />
          </a>
        </BentoCard>

        {/* Card 3: Medium ( Sovereign & On-Premises ) */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 mb-6">
              <Shield size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              100% Sovereign & On-Prem
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              CodeGate packages localized Small Language Models (SLMs) configured and deployed directly inside your secure VPC. Your proprietary IP never touches external SaaS nodes.
            </p>
          </div>

          {/* Secure Firewall Shield Visual */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.04] flex items-center justify-center relative overflow-hidden">
            <div className="relative w-28 h-20 flex items-center justify-center">
              {/* Outer firewall ring */}
              <div className="absolute inset-0 rounded-lg border border-dashed border-emerald-500/20 flex items-center justify-center animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-2 rounded-lg border border-emerald-500/30 flex items-center justify-center" />

              {/* Center Lock node */}
              <div className="z-10 p-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>

          <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider">
            View Compliance <ChevronRight size={14} />
          </a>
        </BentoCard>
      </div>
    </section>
  );
}
