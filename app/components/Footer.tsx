"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface FooterProps {
  onOpenDemo: () => void;
}

export default function Footer({ onOpenDemo }: FooterProps) {
  return (
    <footer className="relative py-10 md:py-14 px-6 bg-black z-10 overflow-hidden flex flex-col items-center border-t border-white/[0.04]">
      {/* Background Glow spotlight at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 w-[600px] h-[300px] rounded-t-full bg-cyan-500/[0.04] blur-[100px]" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
        {/* Subtle badge */}
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">
          Pilot Phase Enrolling
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Ready to modernize your AppSec?
        </h2>
        <p className="text-sm text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed font-normal">
          Deploy CodeGate in your own cloud perimeter in under an hour. Discover security blindspots instantly.
        </p>

        {/* Magnetic CTA button */}
        <div className="mb-20">
          <MagneticButton range={60} actionStrength={0.35}>
            <button
              onClick={onOpenDemo}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
            >
              Book a Demo Today <Calendar size={16} />
            </button>
          </MagneticButton>
        </div>

        {/* Bottom footer bar */}
        <div className="w-full pt-10 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium tracking-wide">
          <a href="#" className="flex items-center gap-2 group active:scale-[0.97] transition-transform duration-150 cursor-pointer">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-950 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.15)] overflow-hidden transition-all duration-300">
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 opacity-100 transition-opacity duration-300" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-400 transition-colors duration-300"
              >
                <path d="M12 2L4.8 6v7.2c0 4.4 3.6 8 7.2 8.8 3.6-0.8 7.2-4.4 7.2-8.8V6l-7.2-4z" />
                <path d="M12 14v-4.8" />
                <path d="M9.6 9.2h4.8" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-tight text-zinc-300 transition-colors duration-300">
              Code<span className="text-cyan-400 transition-colors duration-300">Gate</span>
            </span>
          </a>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <a href="mailto:hello@codegate.app" className="hover:text-zinc-300 transition-colors">
              Contact
            </a>
          </div>

          <div className="hover:text-cyan-400 transition-colors duration-300 cursor-default select-none">
            © 2026 CodeGate.app. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
