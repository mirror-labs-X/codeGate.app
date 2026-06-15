"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface HeaderProps {
  onOpenDemo: () => void;
}

export default function Header({ onOpenDemo }: HeaderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Lifecycle", href: "#lifecycle" },
    { label: "Command Center", href: "#architecture" },
    { label: "Security ROI", href: "#value-prop" }
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[calc(100%-2rem)] max-w-5xl px-6 py-2.5 rounded-full bg-black/30 border border-white/[0.08] backdrop-blur-lg shadow-2xl"
    >
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2.5 group active:scale-[0.97] transition-transform duration-150">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.15)] overflow-hidden">
          {/* Glowing dot in logo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 opacity-100 transition-opacity duration-300" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-400 transition-colors duration-300"
          >
            {/* Custom geometric logo representation of a gated shield */}
            <path d="M12 2L4.8 6v7.2c0 4.4 3.6 8 7.2 8.8 3.6-0.8 7.2-4.4 7.2-8.8V6l-7.2-4z" />
            <path d="M12 14v-4.8" />
            <path d="M9.6 9.2h4.8" />
          </svg>
        </div>
        <span className="text-base font-semibold tracking-tight text-white transition-colors">
          Code<span className="text-cyan-400">Gate</span>
        </span>
      </a>

      {/* Navigation Options - Hidden on Mobile */}
      <nav 
        className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400 relative"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {navLinks.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(idx)}
            className="relative px-3 py-1.5 hover:text-white transition-colors duration-200 z-10"
          >
            {hoveredIndex === idx && (
              <motion.div
                layoutId="nav-hover-capsule"
                className="absolute inset-0 bg-white/[0.06] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA and Hamburger Menu */}
      <div className="flex items-center gap-3">
        {/* Primary CTA */}
        <MagneticButton range={50} actionStrength={0.25}>
          <button 
            onClick={onOpenDemo}
            className="relative px-5 py-2 text-xs font-semibold text-black bg-white rounded-full transition-all hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.97] transition-transform duration-150 overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Request Pilot</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-[0.1] transition-transform duration-300" />
          </button>
        </MagneticButton>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white cursor-pointer select-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-16 left-0 right-0 z-45 flex flex-col gap-1 p-3 mx-2 rounded-2xl bg-zinc-950/95 border border-white/[0.08] backdrop-blur-xl md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
