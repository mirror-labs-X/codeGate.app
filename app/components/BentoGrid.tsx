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
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950/65 backdrop-blur-md p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:border-white/[0.22] ${className}`}
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
  const [logIndex, setLogIndex] = useState(0);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredCard3Node, setHoveredCard3Node] = useState<string | null>(null);
  const [hoveredCard4Node, setHoveredCard4Node] = useState<string | null>(null);
  const [hoveredCard5Node, setHoveredCard5Node] = useState<string | null>(null);

  const logs = React.useMemo(() => [
    "INGESTING global vulnerability database...",
    "SCANNED npm registry: 14,204 pkgs...",
    "SCANNING github:enterprise-auth...",
    "FOUND CVE-2026-0041: Command Injection",
    "INGESTING oss advisory feed...",
    "CLEAN: zero-day threat search completed."
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseNodes((prev) => [!prev[0], !prev[1], !prev[2]]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2500);
    return () => clearInterval(logTimer);
  }, [logs.length]);

  return (
    <section id="features" className="relative py-10 md:py-14 px-6 bg-black z-10 flex flex-col items-center">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />
      {/* Heading */}
      <div className="max-w-5xl w-full text-center mb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          The Threat-Informed Analyst
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
          Meet Code<span className="text-cyan-400">Gate</span>
        </h2>
      </div>

      {/* Grid Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Large ( Threat-Informed Hunting ) */}
        <BentoCard className="md:col-span-2 flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
          <div className="flex-1 flex flex-col justify-between min-h-[220px] pb-4 md:pb-8">
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
            <div className="mt-6 mb-2 md:mb-0">
              <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">
                Explore Feeds <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Interactive Radar Visualizer */}
          <div className="flex-1 bg-zinc-900/20 border border-white/[0.08] rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 relative overflow-hidden">
            {/* Technical grid overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.5" />
                    <circle cx="24" cy="24" r="1" fill="rgba(0, 240, 255, 0.6)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Radar scanner section */}
            <div className="sm:col-span-7 flex items-center justify-center relative min-h-[176px]">
              {/* Radar concentric rings */}
              <div className="w-44 h-44 rounded-full border border-cyan-500/10 flex items-center justify-center relative bg-cyan-950/[0.02]">
                <div className="w-32 h-32 rounded-full border border-cyan-500/5 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-cyan-500/[0.08] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Scanning sweep */}
                <div
                  className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,240,255,0.12)_0deg,transparent_120deg)] animate-[spin_6s_linear_infinite]"
                  style={{ transformOrigin: "center" }}
                />

                {/* Pingable nodes with coordinates */}
                <div 
                  className="absolute top-8 left-10 flex items-center gap-1 cursor-pointer group/node select-none"
                  onMouseEnter={() => setActiveAlert("CRITICAL: CVE-2026-0041 Remote Command Execution detected in corporate authentication client.")}
                  onMouseLeave={() => setActiveAlert(null)}
                >
                  <div className={`w-2 h-2 rounded-full bg-red-400 transition-all duration-300 ${pulseNodes[0] ? "opacity-100 scale-125 shadow-[0_0_8px_rgba(248,113,113,0.8)]" : "opacity-40 scale-100"}`} />
                  <span className="text-[8px] text-red-400/80 font-mono scale-[0.9] origin-left group-hover/node:text-red-300 group-hover/node:scale-100 transition-all">CVE-2026-0041</span>
                </div>

                <div 
                  className="absolute bottom-10 right-8 flex items-center gap-1 cursor-pointer group/node select-none"
                  onMouseEnter={() => setActiveAlert("WARNING: Active scan of standard npm registry packages in progress.")}
                  onMouseLeave={() => setActiveAlert(null)}
                >
                  <span className="text-[8px] text-amber-400/80 font-mono scale-[0.9] origin-right group-hover/node:text-amber-300 group-hover/node:scale-100 transition-all">NPM-SCAN</span>
                  <div className={`w-2 h-2 rounded-full bg-amber-400 transition-all duration-300 ${pulseNodes[1] ? "opacity-100 scale-125 shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "opacity-40 scale-100"}`} />
                </div>

                <div 
                  className="absolute top-20 right-12 flex items-center gap-1 cursor-pointer group/node select-none"
                  onMouseEnter={() => setActiveAlert("CLEAN: Sovereign perimeter integrity verified. No current threats active.")}
                  onMouseLeave={() => setActiveAlert(null)}
                >
                  <div className={`w-2 h-2 rounded-full bg-emerald-400 transition-all duration-300 ${pulseNodes[2] ? "opacity-100 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "opacity-40 scale-100"}`} />
                  <span className="text-[8px] text-emerald-400/80 font-mono scale-[0.9] origin-left group-hover/node:text-emerald-300 group-hover/node:scale-100 transition-all">SECURE</span>
                </div>

                {/* Active alert status overlay inside visualizer */}
                {activeAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-3 left-3 right-3 bg-black/90 border border-cyan-500/30 rounded-lg p-2.5 z-20 text-[8px] font-mono text-cyan-400 leading-normal shadow-[0_4px_12px_rgba(0,0,0,0.5)] border-l-2 border-l-cyan-400"
                  >
                    {activeAlert}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Logs side console */}
            <div className="sm:col-span-5 flex flex-col justify-between h-full min-h-[140px] border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-4 relative z-10 font-mono text-[9px]">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5 mb-2">
                <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider">Threat Feeds Stream</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="space-y-1.5 flex-1 flex flex-col justify-end overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => {
                  const idx = (logIndex - 3 + i + logs.length) % logs.length;
                  const log = logs[idx];
                  const isLast = i === 3;
                  return (
                    <motion.div
                      key={idx}
                      initial={isLast ? { opacity: 0, y: 5 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      className={`truncate leading-tight ${
                        isLast ? "text-cyan-400 font-medium" : "text-zinc-500"
                      }`}
                    >
                      &gt; {log}
                    </motion.div>
                  );
                })}
              </div>
              <div className="border-t border-white/[0.04] pt-1.5 mt-2 flex justify-between text-[7px] uppercase tracking-wider text-zinc-600">
                <span>Rate: 1.4k/s</span>
                <span>Active</span>
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
          <div className="my-5 p-2.5 sm:p-4 pb-7 sm:pb-8 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex items-start justify-between relative overflow-hidden font-mono text-[10px]">
            {/* AST Code Node */}
            <div 
              className="relative flex flex-col items-center cursor-pointer group/node select-none"
              onMouseEnter={() => setHoveredNode("ast")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`p-1.5 rounded-lg border transition-all duration-300 z-10 ${
                hoveredNode === "ast" ? "bg-cyan-950 border-cyan-500/50 text-cyan-400 scale-110 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-zinc-950 border-white/5 text-zinc-400"
              }`}>
                <Code size={14} />
              </div>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-zinc-500 text-[8px] uppercase tracking-wider group-hover/node:text-cyan-400 transition-colors">AST Code</span>
            </div>

            {/* Connecting lines */}
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-indigo-500 relative mt-[14px] opacity-40">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,1)]"
              />
            </div>

            {/* ReAct Node */}
            <div 
              className="relative flex flex-col items-center cursor-pointer group/node select-none"
              onMouseEnter={() => setHoveredNode("react")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`p-1.5 rounded-lg border transition-all duration-300 z-10 ${
                hoveredNode === "react" ? "bg-indigo-950 border-indigo-500/50 text-indigo-400 scale-110 shadow-[0_0_10px_rgba(99,102,241,0.3)]" : "bg-cyan-950 border-cyan-500/30 text-cyan-400 animate-pulse"
              }`}>
                <Brain size={14} />
              </div>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-cyan-400 text-[8px] uppercase tracking-wider group-hover/node:text-indigo-400 transition-colors">ReAct</span>
            </div>

            {/* Connecting lines */}
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500 to-emerald-400 relative mt-[14px] opacity-40">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)]"
              />
            </div>

            {/* DB Proof Node */}
            <div 
              className="relative flex flex-col items-center cursor-pointer group/node select-none"
              onMouseEnter={() => setHoveredNode("db")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`p-1.5 rounded-lg border transition-all duration-300 z-10 ${
                hoveredNode === "db" ? "bg-emerald-950 border-emerald-500/50 text-emerald-400 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-zinc-950 border-white/5 text-zinc-400"
              }`}>
                <Database size={14} />
              </div>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-zinc-500 text-[8px] uppercase tracking-wider group-hover/node:text-emerald-400 transition-colors">DB Proof</span>
            </div>
          </div>

          {/* Interactive Info Display Overlay */}
          <div className="min-h-[44px] bg-zinc-950/80 border border-white/[0.04] rounded-lg p-2.5 mb-4 text-[9px] font-mono text-zinc-400 leading-normal flex items-center">
            {hoveredNode === "ast" && (
              <span className="text-cyan-400 animate-pulse">&gt; AST Check: Analyzing static code structure for potential sinks...</span>
            )}
            {hoveredNode === "react" && (
              <span className="text-indigo-400 animate-pulse">&gt; ReAct Loop: Triggering sandbox container check on candidate payload...</span>
            )}
            {hoveredNode === "db" && (
              <span className="text-emerald-400 animate-pulse">&gt; DB Proof: Verifying taint sink execution state against db query logs...</span>
            )}
            {!hoveredNode && (
              <span className="text-zinc-500">&gt; Hover nodes above to trace automated sandbox triage pipeline.</span>
            )}
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
          <div className="my-5 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex items-center justify-center relative overflow-hidden">
            <div className="relative w-28 h-20 flex items-center justify-center">
              {/* Outer firewall ring */}
              <div 
                className={`absolute inset-0 rounded-lg border border-dashed flex items-center justify-center animate-[spin_20s_linear_infinite] cursor-pointer transition-all duration-300 ${
                  hoveredCard3Node === "firewall" ? "border-emerald-400 bg-emerald-500/[0.03]" : "border-emerald-500/20"
                }`}
                onMouseEnter={() => setHoveredCard3Node("firewall")}
                onMouseLeave={() => setHoveredCard3Node(null)}
              />
              <div className="absolute inset-2 rounded-lg border border-emerald-500/30 flex items-center justify-center" />

              {/* Center Lock node */}
              <div 
                className={`z-10 p-2.5 rounded-full border cursor-pointer transition-all duration-300 ${
                  hoveredCard3Node === "lock" ? "bg-emerald-900 border-emerald-400 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                }`}
                onMouseEnter={() => setHoveredCard3Node("lock")}
                onMouseLeave={() => setHoveredCard3Node(null)}
              >
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>

          {/* Interactive Info Display Overlay */}
          <div className="min-h-[44px] bg-zinc-950/80 border border-white/[0.04] rounded-lg p-2.5 mb-4 text-[9px] font-mono text-zinc-400 leading-normal flex items-center select-none">
            {hoveredCard3Node === "lock" && (
              <span className="text-emerald-400 animate-pulse">&gt; Cryptographic Guard: RSA-4096 signature verification checks are active locally.</span>
            )}
            {hoveredCard3Node === "firewall" && (
              <span className="text-emerald-400 animate-pulse">&gt; Air-Gapped Scanner: 0 repository bytes exit your cloud perimeter. Flat compute model.</span>
            )}
            {!hoveredCard3Node && (
              <span className="text-zinc-500">&gt; Hover security visuals above to audit data sovereignty parameters.</span>
            )}
          </div>

          <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider">
            View Compliance <ChevronRight size={14} />
          </a>
        </BentoCard>

        {/* Card 4: Sovereign Model Updates */}
        <BentoCard className="flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="p-2 w-fit rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-400 mb-6">
              <Brain size={20} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
              Sovereign Model Updates
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Secure, tested updates. We deliver pre-trained, versioned security model weights to your VPC with staged rollout controls. Validate model updates inside your local staging perimeter before promoting them, ensuring your custom tuning, prompt gates, and adapters never break.
            </p>
          </div>

          {/* Training Progress Visual */}
          <div className="my-5 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-zinc-400 font-semibold text-[9px]">Model Staging & Update Console</span>
              <span className="text-cyan-400 text-[8px] animate-pulse bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 font-medium">Validating...</span>
            </div>
            
            <div 
              className={`flex justify-between items-center text-zinc-400 p-1.5 rounded border border-transparent hover:border-purple-500/20 hover:bg-purple-950/10 cursor-pointer transition-all ${hoveredCard4Node === "base" ? "bg-purple-950/15 border-purple-500/30" : ""}`}
              onMouseEnter={() => setHoveredCard4Node("base")}
              onMouseLeave={() => setHoveredCard4Node(null)}
            >
              <span>Model Engine</span>
              <span className="text-zinc-500 truncate max-w-[120px] sm:max-w-none text-right" title="codegate-coder-30b">codegate-coder-30b</span>
            </div>

            <div 
              className={`space-y-1.5 p-1.5 rounded border border-transparent hover:border-purple-500/20 hover:bg-purple-950/10 cursor-pointer transition-all ${hoveredCard4Node === "loss" ? "bg-purple-950/15 border-purple-500/30" : ""}`}
              onMouseEnter={() => setHoveredCard4Node("loss")}
              onMouseLeave={() => setHoveredCard4Node(null)}
            >
              <div className="flex justify-between text-zinc-400">
                <span>Staged Update: v1.2.0-stable</span>
                <span className="text-zinc-500">Test Suite: 84%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="bg-purple-500 h-full rounded-full"
                />
              </div>
            </div>

            <div 
              className={`text-[8px] text-zinc-500 leading-normal p-1 rounded border border-transparent hover:border-purple-500/20 hover:bg-purple-950/10 cursor-pointer transition-all ${hoveredCard4Node === "dataset" ? "bg-purple-950/15 border-purple-500/30 text-purple-300" : ""}`}
              onMouseEnter={() => setHoveredCard4Node("dataset")}
              onMouseLeave={() => setHoveredCard4Node(null)}
            >
              Validation checks: 0 rule regressions detected.
            </div>
          </div>

          {/* Interactive Info Display Overlay */}
          <div className="min-h-[44px] bg-zinc-950/80 border border-white/[0.04] rounded-lg p-2.5 mb-4 text-[9px] font-mono text-zinc-400 leading-normal flex items-center select-none">
            {hoveredCard4Node === "base" && (
              <span className="text-purple-400 animate-pulse">&gt; Model Engine: Sovereign pre-trained weights container ready for local inference.</span>
            )}
            {hoveredCard4Node === "loss" && (
              <span className="text-purple-400 animate-pulse">&gt; Staged Update: Validating version v1.2.0-stable against local repository test suites.</span>
            )}
            {hoveredCard4Node === "dataset" && (
              <span className="text-purple-400 animate-pulse">&gt; Verification: Automated rule assurance check complete. 0 prompt or adapter breaks.</span>
            )}
            {!hoveredCard4Node && (
              <span className="text-zinc-500">&gt; Hover staging variables above to inspect update rollout logs.</span>
            )}
          </div>

          <a href="#architecture" className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider">
            Manage Model Rollouts <ChevronRight size={14} />
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
          <div className="my-5 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] flex flex-col gap-3 font-mono text-[9px]">
            <div 
              className={`flex items-center justify-between text-zinc-400 p-1 rounded border border-transparent hover:border-pink-500/20 hover:bg-pink-950/10 cursor-pointer transition-all ${hoveredCard5Node === "commit" ? "bg-pink-950/15 border-pink-500/30 text-pink-300" : ""}`}
              onMouseEnter={() => setHoveredCard5Node("commit")}
              onMouseLeave={() => setHoveredCard5Node(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>git commit -m "update api"</span>
              </div>
              <span className="text-zinc-500">main</span>
            </div>

            <div 
              className={`flex items-center gap-2 text-cyan-400 pl-4 border-l border-cyan-500/20 py-1 hover:border-pink-500/30 hover:bg-pink-950/10 cursor-pointer transition-all ${hoveredCard5Node === "verify" ? "bg-pink-950/15 border border-pink-500/30 text-pink-300" : ""}`}
              onMouseEnter={() => setHoveredCard5Node("verify")}
              onMouseLeave={() => setHoveredCard5Node(null)}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>codegate: verifying sandbox...</span>
            </div>

            <div 
              className={`flex items-center justify-between flex-wrap gap-1.5 text-emerald-400 p-1 rounded border border-transparent hover:border-pink-500/20 hover:bg-pink-950/10 cursor-pointer transition-all ${hoveredCard5Node === "pr" ? "bg-pink-950/15 border-pink-500/30 text-pink-300" : ""}`}
              onMouseEnter={() => setHoveredCard5Node("pr")}
              onMouseLeave={() => setHoveredCard5Node(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">Pull Request #147 opened</span>
              </div>
              <span className="text-[8px] bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 font-bold whitespace-nowrap">1-Click Patch</span>
            </div>
          </div>

          {/* Interactive Info Display Overlay */}
          <div className="min-h-[44px] bg-zinc-950/80 border border-white/[0.04] rounded-lg p-2.5 mb-4 text-[9px] font-mono text-zinc-400 leading-normal flex items-center select-none">
            {hoveredCard5Node === "commit" && (
              <span className="text-pink-400 animate-pulse">&gt; Pre-Commit Hook: Scans code local-only prior to upstream commit trigger.</span>
            )}
            {hoveredCard5Node === "verify" && (
              <span className="text-pink-400 animate-pulse">&gt; Pipeline Sandbox: Triage container runs exploit validations in background.</span>
            )}
            {hoveredCard5Node === "pr" && (
              <span className="text-pink-400 animate-pulse">&gt; Git PR Action: Merges secure parameterized patches with one developer click.</span>
            )}
            {!hoveredCard5Node && (
              <span className="text-zinc-500">&gt; Hover pipeline event steps above to inspect hook integrations.</span>
            )}
          </div>

          <a href="#lifecycle" className="inline-flex items-center gap-1 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-wider">
            View Integration Guides <ChevronRight size={14} />
          </a>
        </BentoCard>
      </div>
    </section>
  );
}
