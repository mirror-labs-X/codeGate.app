import React from "react";
import Header from "./components/Header";
import NoiseTexture from "./components/NoiseTexture";
import CursorGlow from "./components/CursorGlow";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import DashboardShowcase from "./components/DashboardShowcase";
import ValueProp from "./components/ValueProp";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <NoiseTexture />
      <CursorGlow />
      <Header />
      <main className="relative z-10 w-full">
        <Hero />
        <BentoGrid />
        <DashboardShowcase />
        <ValueProp />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
