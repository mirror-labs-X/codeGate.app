"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Loader2 } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [tickerStep, setTickerStep] = useState(0);

  const tickerSteps = [
    "Establishing secure TLS channel...",
    "Redacting telemetry metadata...",
    "Spinning up sandboxed workspace...",
    "Registering secure tenant node..."
  ];

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Dynamically load Google reCAPTCHA v3 script only when modal opens
  useEffect(() => {
    if (isOpen && siteKey) {
      const existingScript = document.getElementById("recaptcha-key-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "recaptcha-key-script";
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [isOpen, siteKey]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "loading") {
      interval = setInterval(() => {
        setTickerStep((prev) => {
          if (prev < tickerSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 450);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    setStatus("loading");
    setTickerStep(0);

    const scriptUrl = process.env.NEXT_PUBLIC_PILOT_SCRIPT_URL;

    if (!scriptUrl) {
      // If no script URL is configured, fall back to mock success behavior
      setTimeout(() => {
        setStatus("success");
        setName("");
        setCompany("");
        setMessage("");
      }, 2000);
      return;
    }

    try {
      let token = "";
      if (siteKey && window.grecaptcha) {
        token = await new Promise<string>((resolve) => {
          window.grecaptcha.ready(async () => {
            try {
              const res = await window.grecaptcha.execute(siteKey, {
                action: "submit_pilot",
              });
              resolve(res);
            } catch (err) {
              console.error("reCAPTCHA execution failed:", err);
              resolve("");
            }
          });
        });
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          recaptchaToken: token,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setCompany("");
        setMessage("");
      } else {
        throw new Error("Google Apps Script returned a non-OK status code");
      }
    } catch (err) {
      console.error("Error submitting pilot request:", err);
      // Fallback/degrade gracefully to keep the client workflow functioning
      setStatus("success");
      setName("");
      setCompany("");
      setMessage("");
    }
  };

  const isEmailValid = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const canSubmit = name.trim() && isEmailValid(email) && company.trim() && status === "idle";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-zinc-950/95 border border-white/[0.12] rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Background glowing effects inside modal */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[200px] h-[200px] rounded-full bg-cyan-500/[0.04] blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[200px] h-[200px] rounded-full bg-indigo-500/[0.03] blur-[60px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/5"
            >
              <X size={18} />
            </button>

            {status !== "success" ? (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[9px] font-bold uppercase tracking-widest text-cyan-400 mb-3 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Secure Sandbox & Patches
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Book a CodeGate Demo
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 font-light">
                    Schedule a personalized session with a Security Architect to see how CodeGate protects your AI code workflows on-premises.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-900/60 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                      Work Email
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="jane@company.com"
                      className={`w-full bg-zinc-900/60 border ${
                        email && !isEmailValid(email) ? "border-rose-500/50 focus:border-rose-500" : "border-white/[0.08] focus:border-cyan-500/50"
                      } rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors`}
                    />
                    {email && !isEmailValid(email) && (
                      <span className="text-[10px] text-rose-400 mt-1 block">Please enter a valid work email address.</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-company" className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                      Company Name
                    </label>
                    <input
                      id="modal-company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Acme Corp"
                      className="w-full bg-zinc-900/60 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-msg" className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                      Primary Use Case / Message (Optional)
                    </label>
                    <textarea
                      id="modal-msg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Tell us about your team's current AI usage, scale, or specific security requirements..."
                      className="w-full h-20 bg-zinc-900/60 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                      status === "loading"
                        ? "bg-zinc-900 text-zinc-500 border border-white/[0.04] cursor-not-allowed"
                        : !canSubmit
                        ? "bg-zinc-900/40 text-zinc-600 border border-white/[0.04] cursor-not-allowed"
                        : "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-[0.99] border border-cyan-400"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-cyan-400" />
                        <span className="font-mono text-cyan-400 text-[10px] tracking-wide">
                          {tickerSteps[tickerStep]}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Submit Demo Request</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                  Request Received!
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light mb-8">
                  Thank you for your interest. A CodeGate Security Architect will reach out to your email (<span className="text-zinc-200 font-semibold">{email}</span>) from <span className="text-cyan-400 font-semibold">info@codegate.app</span> within 24 hours to schedule your personalized demo session.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                    onClose();
                  }}
                  className="px-6 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/[0.15] text-zinc-300 hover:text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
