"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="relative py-32 px-6 bg-black z-10 overflow-hidden flex flex-col items-center border-t border-white/[0.04]">
      {/* Background Glow spotlight at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 w-[600px] h-[300px] rounded-t-full bg-cyan-500/[0.04] blur-[100px]" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
        {/* Subtle badge */}
        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-6">
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
            <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
              Book a Demo Today <Calendar size={16} />
            </button>
          </MagneticButton>
        </div>

        {/* Bottom footer bar */}
        <div className="w-full pt-10 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-500"
            >
              <path d="M12 2L3 7v9c0 5.5 4.5 10 9 11 4.5-1 9-5.5 9-11V7l-9-5z" />
            </svg>
            <span>CodeGate</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <a href="mailto:security@codegate.app" className="hover:text-zinc-300 transition-colors">
              Contact
            </a>
          </div>

          <div>© 2026 CodeGate.app. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
