"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Eye, ShieldCheck, Terminal, Users, BarChart3 } from "lucide-react";

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
    desc: "Automate manual triage. CodeGate autonomously simulates exploit pathways and validates every alert against active database configurations.",
    benefit: "End alert fatigue. Drastically reduce false positives through intelligent AI reasoning.",
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
    <section id="value-prop" className="relative py-24 px-6 bg-black z-10 flex flex-col items-center">
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
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer select-none"
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
            <motion.div
              key={perspective.id}
              variants={cardVariants}
              onClick={() => setActiveTab(perspective.id)}
              className={`group flex flex-col justify-between p-8 rounded-2xl border transition-all duration-500 cursor-pointer select-none ${
                isHighlighted
                  ? "bg-zinc-950 border-white/[0.12] shadow-2xl scale-[1.02]"
                  : "bg-zinc-950/40 border-white/[0.04] hover:border-white/[0.08]"
              }`}
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
                    ? `bg-gradient-to-br ${perspective.color} border-white/[0.06]`
                    : "bg-zinc-900/10 border-white/[0.02]"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Primary Outcome
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {perspective.benefit}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
