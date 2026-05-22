"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, CheckCircle, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import MagneticButton from "./MagneticButton";

const SIMULATION_STEPS = [
  {
    status: "scanning",
    message: "Initializing sovereign SLM for data-flow analysis...",
    subtext: "Scanning src/auth/client_session.py...",
    icon: Cpu,
    iconColor: "text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "detected",
    message: "CRITICAL: Remote Code Execution hazard detected on line 4.",
    subtext: "Direct execution of client data payload via eval().",
    icon: ShieldAlert,
    iconColor: "text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "reasoning",
    message: "Executing Agentic reasoning loop (ReAct model)...",
    subtext: "Simulating sandbox SQL injection to verify taint propagation...",
    icon: Terminal,
    iconColor: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "patching",
    message: "Verifying exploit paths & generating sovereign SLM patch...",
    subtext: "Replacing unsafe eval() with validated json parser.",
    icon: Cpu,
    iconColor: "text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.15)",
    codeState: "patching",
  },
  {
    status: "resolved",
    message: "SUCCESS: Security patch compiled and validated on-prem.",
    subtext: "Creating zero-day remediation pull request... All checks passed.",
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.15)",
    codeState: "resolved",
  },
];

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % SIMULATION_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeStep = SIMULATION_STEPS[currentStep];
  const StepIcon = activeStep.icon;

  // Emil Kowalski spring configs
  const springFadeUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100, damping: 15 },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-black">
      {/* Background Spotlight & Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.06),transparent_50%)]" />
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/[0.08] backdrop-blur-md text-xs text-cyan-400 font-medium tracking-wide mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          Autonomous Zero-Day Hunting
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.1] mb-6"
        >
          Agile Security.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 bg-[length:200%_auto] animate-gradient-flow font-bold">
            Autonomous AI.
          </span>{" "}
          Absolute Data Sovereignty.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mb-8 tracking-wide"
        >
          CodeGate is the Agentic AI platform that actively hunts for zero-day threats in your codebase—without slowing down developers or exposing your proprietary data.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <MagneticButton range={60} actionStrength={0.3}>
            <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Request a Pilot <ArrowRight size={16} />
            </button>
          </MagneticButton>

          <MagneticButton range={60} actionStrength={0.3}>
            <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-900 border border-white/[0.08] hover:border-white/[0.15] text-zinc-300 font-medium text-sm transition-all hover:bg-zinc-800/80">
              Read Architecture
            </button>
          </MagneticButton>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="text-xs text-zinc-500 font-medium tracking-widest uppercase mb-16"
        >
          Engineered for modern enterprises requiring strict compliance
        </motion.div>

        {/* The Live Sandbox Simulator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.3 }}
          className="w-full max-w-3xl rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-md shadow-2xl overflow-hidden text-left"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              codegate-sandbox // autonomous-hunt
            </div>
            <div className="w-12" /> {/* spacer to center title */}
          </div>

          {/* Terminal Sandbox Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-[300px]">
            {/* Left Console logs (Col span 2) */}
            <div className="p-4 md:col-span-2 bg-black/60 border-r border-white/[0.05] font-mono text-xs flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="text-zinc-500 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider">
                  Active Log Ticker
                </div>

                <div className="space-y-3">
                  {SIMULATION_STEPS.map((step, idx) => {
                    const isPassedOrCurrent = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div
                        key={idx}
                        className={`transition-all duration-300 ${
                          isPassedOrCurrent ? "opacity-100" : "opacity-20"
                        } ${isCurrent ? "scale-[1.02] origin-left" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 text-[10px] ${
                              idx < currentStep
                                ? "text-emerald-400"
                                : isCurrent
                                ? "text-cyan-400"
                                : "text-zinc-600"
                            }`}
                          >
                            {idx < currentStep ? "✓" : "●"}
                          </span>
                          <p
                            className={
                              isCurrent
                                ? "text-zinc-100 font-semibold"
                                : "text-zinc-400"
                            }
                          >
                            {step.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Subtext Status */}
              <div className="p-3 rounded-lg bg-zinc-900/40 border border-white/[0.04] relative overflow-hidden">
                {/* Glow behind box */}
                <div
                  className="absolute inset-0 opacity-10 transition-colors duration-500 blur-lg"
                  style={{ backgroundColor: activeStep.glowColor }}
                />
                <div className="relative z-10 flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded bg-zinc-950 border border-white/[0.06] ${activeStep.iconColor}`}
                  >
                    <StepIcon size={14} className="animate-pulse" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <div className="text-zinc-500 font-bold uppercase tracking-wider">
                      Status Detail
                    </div>
                    <div className="text-zinc-300 mt-0.5">{activeStep.subtext}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Code Display (Col span 3) */}
            <div className="p-4 md:col-span-3 bg-zinc-950 flex flex-col font-mono text-[11px] leading-normal justify-between overflow-x-auto">
              <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-3">
                Source File: src/auth/client_session.py
              </div>

              <div className="flex-1 select-none">
                <pre className="text-zinc-300">
                  <code>
                    {"1: import json\n"}
                    {"2:\n"}
                    {"3: def process_user_data(data):\n"}

                    {/* vulnerable state code */}
                    {activeStep.codeState === "vulnerable" && (
                      <motion.div
                        key="vuln"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-rose-950/20 text-rose-300 border-l-2 border-rose-500 pl-2 py-0.5 my-1"
                      >
                        {"4:     # DANGER: direct execution of input\n"}
                        {"5:     eval(data[\"config\"])\n"}
                      </motion.div>
                    )}

                    {/* patching state code */}
                    {activeStep.codeState === "patching" && (
                      <motion.div
                        key="patch"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-amber-950/20 text-amber-300 border-l-2 border-amber-500 pl-2 py-0.5 my-1"
                      >
                        {"4:     # SECURE: parsing & validation (resolving)\n"}
                        {"5:     config = json.loads(data[\"config\"])\n"}
                      </motion.div>
                    )}

                    {/* resolved state code */}
                    {activeStep.codeState === "resolved" && (
                      <motion.div
                        key="resolved"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500 pl-2 py-0.5 my-1"
                      >
                        {"4:     # SECURE: validation & safe parsing\n"}
                        {"5:     config = json.loads(data[\"config\"])\n"}
                        {"6:     validate_schema(config)\n"}
                      </motion.div>
                    )}

                    {"7:     return config\n"}
                  </code>
                </pre>
              </div>

              {/* Patch badge overlay */}
              <div className="flex justify-end pt-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border tracking-wider transition-all duration-300 ${
                    activeStep.codeState === "resolved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : activeStep.codeState === "patching"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {activeStep.codeState === "resolved" ? (
                    <>Patched & Sovereign</>
                  ) : activeStep.codeState === "patching" ? (
                    <>Patching in progress...</>
                  ) : (
                    <>Vulnerable to Zero-Day</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
