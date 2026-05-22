"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  // Start off-screen so there's no flash of glow in the top-left on mount
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Emil Kowalski spring configuration: provides fluid, elegant lag and inertia
  const springConfig = { damping: 50, stiffness: 200, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the 600px glow circle on the cursor
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-0 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[120px] will-change-transform"
      style={{
        x: glowX,
        y: glowY,
        background: "radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 100%)",
      }}
    />
  );
}
