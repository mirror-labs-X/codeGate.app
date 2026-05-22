"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import NoiseTexture from "./components/NoiseTexture";
import CursorGlow from "./components/CursorGlow";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import ThreatLifecycle from "./components/ThreatLifecycle";
import DashboardShowcase from "./components/DashboardShowcase";
import ValueProp from "./components/ValueProp";
import DemoModal from "./components/DemoModal";
import Footer from "./components/Footer";

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <NoiseTexture />
      <CursorGlow />
      <Header onOpenDemo={openDemo} />
      
      <main className="relative z-10 w-full">
        <Hero onOpenDemo={openDemo} />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <BentoGrid />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <ThreatLifecycle />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <DashboardShowcase />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <ValueProp />
      </main>

      <Footer onOpenDemo={openDemo} />

      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
}
