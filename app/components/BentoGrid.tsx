"use client";

import React, { useRef, useState, MouseEvent, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Target, Brain, Shield, ChevronRight, Database, Code, ShieldCheck } from "lucide-react";

// Individual Bento Card with Mouse Spotlight Effect
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Emil Kowalski spring configuration: provides fluid, elegant lag and inertia
  const springConfig = { damping: 40, stiffness: 200, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950/65 backdrop-blur-md p-8 transition-colors duration-300 hover:border-white/[0.22] ${className}`}
    >
      {/* Light glow overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${springX}px ${springY}px,
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
              320px circle at ${springX}px ${springY}px,
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
    <section id="features" className="relative py-10 md:py-14 px-6 bg-black z-10 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-5xl w-full text-center mb-16">
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
          <div className="flex-1 min-h-[180px] bg-zinc-900/20 border border-white/[0.08] rounded-xl flex items-center justify-center p-6 relative overflow-hidden">
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

        {/* Card 2: Exploit Verification */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-2 w-fit rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
                <Brain size={20} />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Exploit Verification
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Stop wasting developer hours on false positives. CodeGate's active validation sandbox runs and verifies threat alerts automatically, ensuring your team only spends time fixing real, confirmed risks.
            </p>
          </div>

          {/* Logic Tree Visual */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex items-center justify-between relative overflow-hidden font-mono text-[10px]">
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

        {/* Card 3: Sovereign & Cost-Controlled */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 mb-6">
              <Shield size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Sovereign & Cost-Controlled
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Deploy CodeGate inside your firewall. Since repo scanning must be periodic and codebases grow continuously, pay-per-token API costs scale non-linearly. CodeGate guarantees unlimited scans for a predictable, flat compute cost.
            </p>
          </div>

          {/* Secure Firewall Shield Visual */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex items-center justify-center relative overflow-hidden">
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

        {/* Card 4: Private Model Fine-Tuning */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-400 mb-6">
              <Brain size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Private Model Tuning
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Secure Custom Models. Train and run security models (like Qwen-30B) on your own secure infrastructure. Keep your codebase, proprietary APIs, and intellectual property entirely private within your firewall.
            </p>
          </div>

          {/* Training Progress Visual */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-zinc-400 font-semibold text-[9px]">Local LoRA Training Console</span>
              <span className="text-cyan-400 text-[8px] animate-pulse bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 font-medium">Training...</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Model Base</span>
              <span className="text-zinc-500">Qwen3-Coder-30B-A3B-Instruct</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Loss: 0.124</span>
                <span className="text-zinc-500">Epoch 3/5</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="bg-purple-500 h-full rounded-full"
                />
              </div>
            </div>
            <div className="text-[8px] text-zinc-500 leading-normal">
              Dataset prepared: prep_dataset.py // 12,450 local samples parsed
            </div>
          </div>

          <a href="#architecture" className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider">
            Start Tuning Pipeline <ChevronRight size={14} />
          </a>
        </BentoCard>

        {/* Card 5: Developer-First Integrations */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-pink-950/40 border border-pink-500/20 text-pink-400 mb-6">
              <Code size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Developer Integrations
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Plug CodeGate directly into your existing development workflows, local IDEs, and CI/CD pipelines (GitHub, GitLab, Jenkins) to patch issues automatically.
            </p>
          </div>

          {/* Pipelines mini visualizer */}
          <div className="my-6 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex flex-col gap-3 font-mono text-[9px]">
            <div className="flex items-center justify-between text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>git commit -m "update api"</span>
              </div>
              <span className="text-zinc-500">main</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 pl-4 border-l border-cyan-500/20 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>codegate: verifying sandbox...</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Pull Request #147 opened</span>
              </div>
              <span className="text-[8px] bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 font-bold">1-Click Patch</span>
            </div>
          </div>

          <a href="#lifecycle" className="inline-flex items-center gap-1 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-wider">
            View Integration Guides <ChevronRight size={14} />
          </a>
        </BentoCard>
      </div>
    </section>
  );
}
