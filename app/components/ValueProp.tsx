"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Code, Eye, ShieldCheck, Terminal, Users, BarChart3 } from "lucide-react";

interface ValuePropCardProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted: boolean;
  onClick: () => void;
  colorType: "devs" | "secops" | "execs";
  variants?: any;
}

function ValuePropCard({ children, className = "", isHighlighted, onClick, colorType, variants }: ValuePropCardProps) {
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

  let glowColor = "rgba(6, 182, 212, 0.08)";
  let secondaryGlowColor = "rgba(99, 102, 241, 0.04)";
  let borderGlowColor = "rgba(6, 182, 212, 0.15)";

  if (colorType === "secops") {
    glowColor = "rgba(99, 102, 241, 0.08)";
    secondaryGlowColor = "rgba(168, 85, 247, 0.04)";
    borderGlowColor = "rgba(99, 102, 241, 0.15)";
  } else if (colorType === "execs") {
    glowColor = "rgba(168, 85, 247, 0.08)";
    secondaryGlowColor = "rgba(16, 185, 129, 0.04)";
    borderGlowColor = "rgba(168, 85, 247, 0.15)";
  }

  // Construct card wrapper classes conditional on isHighlighted state
  const baseClasses = "group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer select-none";
  let stateClasses = "";
  if (isHighlighted) {
    if (colorType === "devs") {
      stateClasses = "border border-cyan-500/50 hover:border-cyan-500/40 bg-zinc-950/90 backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.12)] scale-[1.02]";
    } else if (colorType === "secops") {
      stateClasses = "border border-indigo-500/50 hover:border-indigo-500/40 bg-zinc-950/90 backdrop-blur-md shadow-[0_0_35px_rgba(99,102,241,0.12)] scale-[1.02]";
    } else {
      stateClasses = "border border-purple-500/50 hover:border-purple-500/40 bg-zinc-950/90 backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.12)] scale-[1.02]";
    }
  } else {
    // Inactive card uses premium glassmorphic border styling matching BentoCard
    stateClasses = "border border-white/[0.12] hover:border-white/[0.22] bg-zinc-950/65 backdrop-blur-md";
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      variants={variants}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      {/* Light glow overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${springX}px ${springY}px,
              ${glowColor} 0%,
              ${secondaryGlowColor} 50%,
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
              ${borderGlowColor},
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
    </motion.div>
  );
}

const PERSPECTIVES = [
  {
    id: "devs",
    label: "For Developers",
    icon: Code,
    title: "Write features, not exploits",
    desc: "CodeGate acts as a silent secondary reviewer, identifying security slip-ups in local workspaces and IDEs prior to code commits.",
    benefit: "Actionable fixes with context-rich data-flow paths and AI-generated remediation code.",
    color: "from-cyan-500/20 to-indigo-500/10",
    accent: "text-cyan-400",
  },
  {
    id: "secops",
    label: "For Security Teams",
    icon: Users,
    title: "Zero-trust verification loops",
    desc: "Automate manual threat triage. CodeGate runs active validation sandboxes and queries local databases to prove exploitability, cutting response times from days to seconds.",
    benefit: "Zero false positives. Developers only get alerts for confirmed, exploitable security risks.",
    color: "from-indigo-500/20 to-purple-500/10",
    accent: "text-indigo-400",
  },
  {
    id: "execs",
    label: "For Executives",
    icon: BarChart3,
    title: "Enterprise sovereignty",
    desc: "Integrate AppSec checks inside the firewall. Deploy models on local hyper-scalers or VPCs with full audit compliance logs.",
    benefit: "De-risk the enterprise. Achieve continuous compliance and protect against zero-days.",
    color: "from-purple-500/20 to-emerald-500/10",
    accent: "text-purple-400",
  },
];

export default function ValueProp() {
  const [activeTab, setActiveTab] = useState("devs");
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay loop every 16s on idle
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIdx = PERSPECTIVES.findIndex((p) => p.id === prev);
        const nextIdx = (currentIdx + 1) % PERSPECTIVES.length;
        return PERSPECTIVES[nextIdx].id;
      });
    }, 16000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Capture phase events to halt autoplay permanently upon user interaction
  const handleInteraction = () => {
    if (!isPaused) {
      setIsPaused(true);
    }
  };

  // Framer Motion spring physics configurations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 16,
        mass: 0.8,
      },
    },
  };

  return (
    <section 
      id="value-prop" 
      onClickCapture={handleInteraction}
      onKeyDownCapture={handleInteraction}
      className="relative py-10 md:py-14 px-6 bg-black z-10 flex flex-col items-center"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="max-w-5xl w-full text-center mb-16 relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
          Security That Empowers, Not Impedes
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          AppSec built for the speed of AI.
        </h2>
        <p className="text-zinc-400 font-normal leading-relaxed text-sm max-w-xl mx-auto">
          We align the friction-filled triad of software development. Every stakeholder gets a dedicated interface, optimized workflow, and direct security outcomes.
        </p>

        {/* Tab perspective selector (Emil Kowalski style spring indicator) */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/60 border border-white/[0.06] backdrop-blur-md">
            {PERSPECTIVES.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer select-none active:scale-[0.97] transition-transform duration-150"
                  style={{
                    color: isActive ? "#ffffff" : "#a1a1aa",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 rounded-full bg-zinc-800/80 border border-white/[0.05]"
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    />
                  )}
                  <TabIcon size={14} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid columns */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
      >
        {PERSPECTIVES.map((perspective) => {
          const PIcon = perspective.icon;
          const isHighlighted = activeTab === perspective.id;

          return (
            <ValuePropCard
              key={perspective.id}
              variants={cardVariants}
              onClick={() => setActiveTab(perspective.id)}
              isHighlighted={isHighlighted}
              colorType={perspective.id as any}
              className="p-8"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`p-2.5 rounded-xl bg-zinc-900 border border-white/5 ${
                      isHighlighted ? perspective.accent : "text-zinc-500"
                    } transition-colors`}
                  >
                    <PIcon size={18} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isHighlighted ? perspective.accent : "text-zinc-600"
                    } transition-colors`}
                  >
                    {perspective.label}
                  </span>
                </div>

                {/* Body Title */}
                <h3 className="text-lg font-semibold text-zinc-100 tracking-tight mb-3">
                  {perspective.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                  {perspective.desc}
                </p>
              </div>

              {/* Benefit highlight box */}
              <div
                className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-500 ${
                  isHighlighted
                    ? `bg-gradient-to-br ${perspective.color} border-white/[0.12]`
                    : "bg-zinc-900/10 border-white/[0.08]"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Primary Outcome
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {perspective.benefit}
                </div>
              </div>
            </ValuePropCard>
          );
        })}
      </motion.div>
    </section>
  );
}
