"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Cpu, Lock, Database, GitPullRequest } from "lucide-react";
import MagneticButton from "./MagneticButton";

const SIMULATION_STEPS = [
  {
    status: "ingest",
    message: "Local Ingest & Regex PII Credential Scrub...",
    subtext: "Redacting environment variables, secrets, and auth tokens...",
    icon: Lock,
    iconColor: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "process",
    message: "Smart Token Batching & Context Optimization...",
    subtext: "Partitioning codebase file graphs into context-capped limits...",
    icon: Cpu,
    iconColor: "text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "retrieve",
    message: "Local Threat Context Retrieval...",
    subtext: "Matching detected anomalies against local security intelligence database...",
    icon: Database,
    iconColor: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.15)",
    codeState: "vulnerable",
  },
  {
    status: "triage",
    message: "Automated Sandbox Exploit Verification...",
    subtext: "Executing unsafe code inside isolated Docker container to verify threats...",
    icon: Terminal,
    iconColor: "text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.15)",
    codeState: "patching",
  },
  {
    status: "remediate",
    message: "Sovereign Pull Request Remediation (Preview)...",
    subtext: "Generating secure Git patches and automated pull requests...",
    icon: GitPullRequest,
    iconColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.15)",
    codeState: "resolved",
  },
];

const INTEGRATIONS = [
  // IDEs and Developer Clients
  { name: "VS Code", type: "IDE Proxy" },
  { name: "JetBrains", type: "IDE Proxy" },
  { name: "Cursor", type: "IDE Proxy" },
  { name: "GitHub Copilot", type: "AI Client" },
  { name: "Continue.dev", type: "AI Client" },
  { name: "Cline", type: "AI Client" },
  { name: "Aider", type: "AI Client" },

  // Issue Trackers and Ticketing
  { name: "GitHub Issues", type: "Ticketing" },
  { name: "Jira Software", type: "Ticketing" },

  // Identity and Auth Providers (SSO)
  { name: "Google SSO", type: "Identity" },
  { name: "Microsoft SSO", type: "Identity" },

  // LLM Engines and Inference
  { name: "Qwen3-Coder", type: "Private LLM" },
  { name: "Ollama", type: "LLM Engine" },
  { name: "vLLM", type: "LLM Engine" },
  { name: "OpenAI", type: "LLM Engine" },
  { name: "Anthropic", type: "LLM Engine" },
  { name: "Gemini", type: "LLM Engine" },

  // Data and Logging Stack
  { name: "Grafana Loki", type: "Logging" },
  { name: "Promtail", type: "Log Shipping" },
  { name: "ChromaDB", type: "Vector Store" },
  { name: "PostgreSQL", type: "Database" },
  { name: "Redis", type: "Message Broker" },
];

const STEP_CODE_DETAILS = {
  ingest: {
    fileName: "config/.env",
    content: (
      <motion.div
        key="ingest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-1 text-zinc-300"
      >
        {"1: DB_HOST = \"db.internal.net\"\n"}
        {"2: DB_USER = \"admin\"\n"}
        <div className="bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"3: DB_PASSWORD = \"[REDACTED]\"\n"}
        </div>
        <div className="bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"4: AWS_SECRET_ACCESS_KEY = \"[REDACTED]\"\n"}
        </div>
        <div className="bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"5: STRIPE_API_KEY = \"[REDACTED]\"\n"}
        </div>
        {"6: PORT = 8080\n"}
      </motion.div>
    ),
    badge: "0 Secrets Leaked",
    badgeStyles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  process: {
    fileName: "scanner/partitioner.go",
    content: (
      <motion.div
        key="process"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-1 text-zinc-300"
      >
        {"1: package scanner\n"}
        {"2:\n"}
        {"3: func PartitionCodebase(files []File) [][]File {\n"}
        <div className="bg-indigo-950/20 text-indigo-300 border-l-2 border-indigo-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"4:     const MAX_BATCH_TOKENS = 30000\n"}
          {"5:     // Partitioning files into context-capped limits\n"}
          {"6:     // Part 1: [auth.py, session.py] (12.4k tokens)\n"}
          {"7:     // Part 2: [payment.py, routes.py] (18.9k tokens)\n"}
        </div>
        {"8:     return batches\n"}
        {"9: }\n"}
      </motion.div>
    ),
    badge: "Token Batching: Active",
    badgeStyles: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  retrieve: {
    fileName: "vector_db/query.py",
    content: (
      <motion.div
        key="retrieve"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-1 text-zinc-300"
      >
        {"1: # Querying offline security intelligence database\n"}
        {"2: query = \"remote code execution exploit path\"\n"}
        {"3: results = local_db.similarity_search(query)\n"}
        {"4:\n"}
        <div className="bg-cyan-950/20 text-cyan-400 border-l-2 border-cyan-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"5: # Threat profile matched:\n"}
          {"6: # - CVE-2023-30551 (eval injection) - Match: 94%\n"}
          {"7: # - CVE-2022-29881 (command injection) - Match: 81%\n"}
        </div>
      </motion.div>
    ),
    badge: "Local Matches Found",
    badgeStyles: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  triage: {
    fileName: "sandbox/docker_triage.py",
    content: (
      <motion.div
        key="triage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-1 text-zinc-300"
      >
        {"1: import docker\n"}
        {"2: # Running exploit execution inside isolated container...\n"}
        <div className="bg-rose-950/20 text-rose-300 border-l-2 border-rose-500 pl-2 py-0.5 my-1 inline-block w-full">
          {"3: container = client.containers.run(\n"}
          {"4:     image=\"python:3.10-alpine\",\n"}
          {"5:     mem_limit=\"128m\",\n"}
          {"6:     network_disabled=True\n"}
          {"7: )\n"}
          {"8: # Verification output: Taint analysis trace completed.\n"}
        </div>
      </motion.div>
    ),
    badge: "Exploit Verified",
    badgeStyles: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  remediate: {
    fileName: "src/auth/client_session.py",
    content: (
      <motion.div
        key="remediate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-1 text-zinc-300"
      >
        {"1: import json\n"}
        {"2:\n"}
        {"3: def process_user_data(data):\n"}
        <div className="bg-rose-950/20 text-rose-300 border-l-2 border-rose-500/50 pl-2 py-0.5 my-0.5 line-through">
          {"- 4:     # DANGER: direct execution of input\n"}
          {"- 5:     eval(data[\"config\"])\n"}
        </div>
        <div className="bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500 pl-2 py-0.5 my-0.5">
          {"+ 4:     # SECURE: validation & safe parsing\n"}
          {"+ 5:     config = json.loads(data[\"config\"])\n"}
          {"+ 6:     validate_schema(config)\n"}
        </div>
        {"7:     return config\n"}
      </motion.div>
    ),
    badge: "Preview Patch",
    badgeStyles: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

interface HeroProps {

  onOpenDemo: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % SIMULATION_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeStep = SIMULATION_STEPS[currentStep];
  const StepIcon = activeStep.icon;

  // Emil Kowalski spring configs
  const springFadeUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100, damping: 15 },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 md:pt-36 pb-10 md:pb-14 px-6 overflow-hidden bg-black">
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
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-white max-w-5xl leading-[1.1] mb-6"
        >
          Agile Security.{" "}
          <span className="text-cyan-400 font-bold">
            Flat-Rate Scaling.
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
          CodeGate is the Agentic AI platform that actively hunts for zero-day threats in your codebase—without slowing down developers or exposing your proprietary data. By running locally within your perimeter, it eliminates the non-linear token growth costs of periodic repository scanning.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <MagneticButton range={60} actionStrength={0.3}>
            <button 
              onClick={onOpenDemo}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
            >
              Request a Pilot <ArrowRight size={16} />
            </button>
          </MagneticButton>

          <MagneticButton range={60} actionStrength={0.3}>
            <a 
              href="#architecture"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-900 border border-white/[0.08] hover:border-white/[0.15] text-zinc-300 font-medium text-sm transition-all hover:bg-zinc-800/80 active:scale-[0.97] transition-transform duration-150 cursor-pointer"
            >
              Read Architecture
            </a>
          </MagneticButton>
        </motion.div>

        {/* Integrations/Ecosystem Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="w-full max-w-4xl overflow-hidden py-4.5 relative mb-16 border-y border-white/[0.04] bg-zinc-950/20"
        >
          {/* Left & Right gradient masks for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center mb-4">
            Securing integrations across your developer stack
          </div>

          <div className="flex w-max gap-6 animate-marquee select-none">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/30 border border-white/[0.05] hover:border-cyan-500/25 transition-colors duration-300 group"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  item.type.includes("IDE") ? "bg-cyan-400" :
                  item.type.includes("AI Client") ? "bg-indigo-400" :
                  item.type.includes("LLM") || item.type.includes("Private") ? "bg-emerald-400" :
                  item.type.includes("Ticketing") ? "bg-pink-400" :
                  item.type.includes("Identity") ? "bg-amber-400" :
                  item.type.includes("Log") || item.type.includes("Logging") ? "bg-sky-400" :
                  "bg-purple-400"
                }`} />
                <span className="text-[11px] font-semibold text-zinc-300 font-mono tracking-tight">{item.name}</span>
                <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest group-hover:text-zinc-500 transition-colors">{item.type}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Live Sandbox Simulator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.3 }}
          className="w-full max-w-3xl rounded-xl border border-white/[0.15] hover:border-cyan-500/35 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.04)] bg-zinc-950/60 backdrop-blur-md shadow-2xl overflow-hidden text-left"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5 select-none">
              <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-400" : "bg-cyan-400 animate-pulse"}`} />
              codegate-brain // {isPaused ? "interactive-mode" : "autonomous-hunt"}
            </div>
            <div className="w-12" /> {/* spacer to center title */}
          </div>

          {/* Terminal Sandbox Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-[300px]">
            {/* Left Console logs (Col span 2) */}
            <div className="p-4 md:col-span-2 bg-black/60 border-r border-white/[0.05] font-mono text-xs flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="text-zinc-500 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider select-none">
                  Active Log Ticker
                </div>

                <div className="space-y-3">
                  {SIMULATION_STEPS.map((step, idx) => {
                    const isPassedOrCurrent = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentStep(idx);
                          setIsPaused(true);
                        }}
                        className={`w-full text-left transition-all duration-300 focus:outline-none cursor-pointer group/ticker ${
                          isPassedOrCurrent ? "opacity-100" : "opacity-25 hover:opacity-75"
                        } ${isCurrent ? "scale-[1.02] origin-left" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 text-[10px] transition-colors duration-300 ${
                              idx < currentStep
                                ? "text-emerald-400"
                                : isCurrent
                                ? "text-cyan-400"
                                : "text-zinc-600 group-hover/ticker:text-zinc-400"
                            }`}
                          >
                            {idx < currentStep ? "✓" : "●"}
                          </span>
                          <p
                            className={`transition-colors duration-300 ${
                              isCurrent
                                ? "text-zinc-100 font-semibold"
                                : "text-zinc-400 group-hover/ticker:text-zinc-200"
                            }`}
                          >
                            {step.message}
                          </p>
                        </div>
                      </button>
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
                Source File: {STEP_CODE_DETAILS[activeStep.status as keyof typeof STEP_CODE_DETAILS].fileName}
              </div>

              <div className="flex-1 select-none">
                <pre className="text-zinc-300">
                  <code>
                    {STEP_CODE_DETAILS[activeStep.status as keyof typeof STEP_CODE_DETAILS].content}
                  </code>
                </pre>
              </div>

              {/* Patch badge overlay */}
              <div className="flex justify-end pt-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border tracking-wider transition-all duration-300 ${
                    STEP_CODE_DETAILS[activeStep.status as keyof typeof STEP_CODE_DETAILS].badgeStyles
                  }`}
                >
                  {STEP_CODE_DETAILS[activeStep.status as keyof typeof STEP_CODE_DETAILS].badge}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
