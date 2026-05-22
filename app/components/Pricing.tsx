"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, HelpCircle, Code } from "lucide-react";
import MagneticButton from "./MagneticButton";

const TIERS = [
  {
    name: "Community",
    price: "Free",
    desc: "For security researchers, academics, and open-source contributors.",
    icon: Code,
    features: [
      "Access to standard vulnerability feeds",
      "Local IDE plug-in scans",
      "Basic ReAct engine checks",
      "Community support forums",
    ],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/developer /month",
    desc: "Designed for independent contractors and fast-growing startups.",
    icon: Zap,
    features: [
      "Rapid SaaS onboarding (get started in 5m)",
      "Continuous CI/CD pipeline scans",
      "Pre-commit git hook automation",
      "Standard configurable rules",
      "Email & Slack support",
    ],
    cta: "Get Started Now",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/developer /month",
    desc: "For fintechs and scaleups needing custom rules and analytics.",
    icon: Shield,
    features: [
      "Customizable rules dashboard",
      "Team & project segregation",
      "SOC2 / PCI-DSS compliance checks",
      "Live database taint verification",
      "Priority 24/7 support SLAs",
    ],
    cta: "Upgrade to Enterprise",
    highlight: true,
  },
  {
    name: "Sovereign",
    price: "Custom",
    desc: "For Fortune 500 and heavily-regulated corporate environments.",
    icon: Shield,
    features: [
      "100% On-premise VPC deployment",
      "Custom SLM model weights",
      "360° Executive compliance forecasting",
      "Dedicated integration support",
      "Vulnerability audit logging export",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-6 bg-black z-10 flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute bottom-1/2 left-1/4 pointer-events-none z-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px]" />

      <div className="max-w-5xl w-full text-center mb-16 relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          Pricing & Deployment
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          Scale sovereignty to your needs.
        </h2>
        <p className="text-zinc-400 font-normal leading-relaxed text-sm max-w-xl mx-auto">
          Choose from rapid cloud onboarding or fully air-gapped sovereign setups. Predictable licensing for modern software companies.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {TIERS.map((tier, idx) => {
          const TierIcon = tier.icon;

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 18,
                delay: idx * 0.1,
              }}
              className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                tier.highlight
                  ? "bg-zinc-950 border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.05)]"
                  : "bg-zinc-950/40 border-white/[0.05] hover:border-white/[0.1]"
              }`}
            >
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-black text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-zinc-300 tracking-tight">
                    {tier.name}
                  </span>
                  <div
                    className={`p-2 rounded-lg bg-zinc-900 border border-white/5 ${
                      tier.highlight ? "text-cyan-400" : "text-zinc-500"
                    }`}
                  >
                    <TierIcon size={16} />
                  </div>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-semibold tracking-tight text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[10px] text-zinc-500 font-medium">
                      {tier.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-normal mb-6 font-normal min-h-[48px]">
                  {tier.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/[0.04] mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[11px] leading-tight text-zinc-300">
                      <Check size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                <MagneticButton range={50} actionStrength={0.25}>
                  <button
                    className={`w-full py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      tier.highlight
                        ? "bg-white text-black hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                        : "bg-zinc-900 text-zinc-300 border border-white/[0.08] hover:bg-zinc-800/80"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
