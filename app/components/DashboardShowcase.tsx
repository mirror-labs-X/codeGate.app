"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  FolderGit2,
  FileCheck,
  Activity,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowDownToLine,
  Loader2,
  Monitor,
  Server,
  Shield,
  GitBranch,
  Cpu,
  Database
} from "lucide-react";

// --- Tab Sub-Components ---

// Tab 0: Overview
interface OverviewTabProps {
  tokens: number;
}
function OverviewTab({ tokens }: OverviewTabProps) {
  const [logs, setLogs] = useState<string[]>([
    "[scanner-go] Scanning package.json in payment-service...",
    "[scanner-go] Secret Redacted: STRIPE_API_KEY removed from input.",
    "[sandbox-python] Running validation: Exploit verified inside isolated container."
  ]);

  const logIndex = useRef(0);

  useEffect(() => {
    const pool = [
      "[scanner-go] Commencing scanning on api-gateway...",
      "[brain-python] Matching local security database...",
      "[sandbox-python] Running validation: Exploit verified inside isolated container.",
      "[scanner-go] Scanner complete: codebase 100% compliant.",
      "[scanner-go] Scrubbed sensitive API key string from auth.go.",
      "[sandbox-python] Sandbox validation: 0 alert failures in main-service."
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = pool[logIndex.current];
        logIndex.current = (logIndex.current + 1) % pool.length;
        return [...prev.slice(1), nextLog];
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3.5 h-full min-h-0 justify-between">
      {/* Top row: 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Tokens Scanned */}
        <div className="bg-zinc-900/40 border border-white/[0.06] hover:border-cyan-500/30 p-3 rounded-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Tokens Processed</span>
            <Cpu size={14} className="text-cyan-400/80 group-hover:text-cyan-300" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-cyan-400 tracking-tight">
              {tokens.toLocaleString()}
            </div>
            <span className="text-[8px] text-zinc-500 block leading-tight mt-0.5">Real-time LLM throughput</span>
          </div>
        </div>

        {/* Card 2: Exploits Blocked */}
        <div className="bg-zinc-900/40 border border-white/[0.06] hover:border-rose-500/30 p-3 rounded-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Exploits Blocked</span>
            <Shield size={14} className="text-rose-400/80 group-hover:text-rose-300" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-rose-400 tracking-tight">
              17
            </div>
            <span className="text-[8px] text-rose-500/80 font-bold block leading-tight mt-0.5">100% Deflection Rate</span>
          </div>
        </div>

        {/* Card 3: PII Redacted */}
        <div className="bg-zinc-900/40 border border-white/[0.06] hover:border-amber-500/30 p-3 rounded-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">PII Redacted</span>
            <Sparkles size={14} className="text-amber-400/80 group-hover:text-amber-300" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-amber-400 tracking-tight">
              42
            </div>
            <span className="text-[8px] text-zinc-500 block leading-tight mt-0.5">Sensitive keys scrubbed</span>
          </div>
        </div>

        {/* Card 4: Avg Latency */}
        <div className="bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/30 p-3 rounded-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Proxy Overhead</span>
            <Activity size={14} className="text-emerald-400/80 group-hover:text-emerald-300" />
          </div>
          <div>
            <div className="text-base font-bold font-mono text-emerald-400 tracking-tight">
              14.2ms
            </div>
            <span className="text-[8px] text-zinc-500 block leading-tight mt-0.5">Near-zero local latency</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Graph & Logs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1 min-h-0">
        {/* Redesigned Large Graph Section */}
        <div className="md:col-span-3 bg-zinc-950 p-3.5 rounded-xl border border-white/[0.08] flex flex-col justify-between h-full min-h-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Traffic Optimization Telemetry</span>
              <span className="text-[8px] text-zinc-600 block mt-0.5">Prompt token validation vs bypass volumes</span>
            </div>
            <div className="flex items-center gap-3 text-[8px] font-mono">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                <span className="text-zinc-400">Total Requests</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-zinc-400">Sanitized</span>
              </div>
            </div>
          </div>

          {/* SVG Area Chart Container */}
          <div className="flex-1 min-h-0 w-full relative bg-zinc-900/10 border border-white/[0.02] rounded-lg p-1">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="total-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="sanitized-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0"/>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="300" y1="0" x2="300" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Total Request Fill & Line */}
              <path
                d="M0,100 C50,80 80,110 120,70 C160,30 200,90 240,40 C280,60 320,20 400,10 L400,120 L0,120 Z"
                fill="url(#total-glow)"
              />
              <path
                d="M0,100 C50,80 80,110 120,70 C160,30 200,90 240,40 C280,60 320,20 400,10"
                fill="none"
                stroke="rgb(6, 182, 212)"
                strokeWidth="1.5"
              />

              {/* Sanitized Fill & Line */}
              <path
                d="M0,110 C50,95 80,115 120,85 C160,45 200,100 240,55 C280,75 320,35 400,25 L400,120 L0,120 Z"
                fill="url(#sanitized-glow)"
              />
              <path
                d="M0,110 C50,95 80,115 120,85 C160,45 200,100 240,55 C280,75 320,35 400,25"
                fill="none"
                stroke="rgb(16, 185, 129)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Data points */}
              <circle cx="120" cy="70" r="2.5" fill="rgb(6, 182, 212)" />
              <circle cx="240" cy="40" r="2.5" fill="rgb(6, 182, 212)" />
              <circle cx="320" cy="20" r="2.5" fill="rgb(6, 182, 212)" />

              <circle cx="120" cy="85" r="2" fill="rgb(16, 185, 129)" />
              <circle cx="240" cy="55" r="2" fill="rgb(16, 185, 129)" />
            </svg>

            {/* Float details indicator */}
            <div className="absolute top-2 left-2 bg-black/60 border border-white/[0.04] backdrop-blur-sm rounded px-1.5 py-0.5 text-[7px] font-mono text-zinc-400">
              Auto-Compaction: Enabled
            </div>
          </div>
        </div>

        {/* Live scanner stream / Logs terminal */}
        <div className="md:col-span-2 bg-zinc-950 p-3.5 rounded-xl border border-white/[0.08] flex flex-col justify-between h-full min-h-0">
          <div className="flex flex-col flex-1 min-h-0">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Live Scanner Stream</span>
            <div className="bg-black/80 border border-white/[0.04] p-2.5 rounded-lg font-mono text-[8px] text-zinc-400 space-y-1.5 flex-1 min-h-0 overflow-hidden flex flex-col justify-end">
              {logs.map((log, idx) => (
                <div key={idx} className="truncate text-zinc-400">
                  <span className="text-cyan-500 font-bold mr-1">&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-2 mt-2 flex items-center justify-between text-[8px] text-zinc-500">
            <span className="font-mono">INTEGRATION STATE: SECURED</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab 1: Rules Editor
function RulesTab() {
  const [rulePrompt, setRulePrompt] = useState("Block external HTTP connections from payment services.");
  const [compiling, setCompiling] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toggles, setToggles] = useState({
    scrub: true,
    rag: true,
    sandbox: false,
    pii: true
  });

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rulePrompt.trim()) return;
    setCompiling(true);
    setSuccess(false);
    setTimeout(() => {
      setCompiling(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full relative">
      {/* Toggles Panel */}
      <div className="md:col-span-2 bg-zinc-950 p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
        <div className="space-y-3.5">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Security Shields</span>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-300">AWS Secret Scrub</span>
            <button
              onClick={() => setToggles((t) => ({ ...t, scrub: !t.scrub }))}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center ${toggles.scrub ? "bg-cyan-500" : "bg-zinc-800"}`}
            >
              <div className={`w-3.5 h-3.5 bg-black rounded-full absolute transition-transform ${toggles.scrub ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-300">PII Masking</span>
            <button
              onClick={() => setToggles((t) => ({ ...t, pii: !t.pii }))}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center ${toggles.pii ? "bg-cyan-500" : "bg-zinc-800"}`}
            >
              <div className={`w-3.5 h-3.5 bg-black rounded-full absolute transition-transform ${toggles.pii ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-300">CVE Vector Lookup</span>
            <button
              onClick={() => setToggles((t) => ({ ...t, rag: !t.rag }))}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center ${toggles.rag ? "bg-cyan-500" : "bg-zinc-800"}`}
            >
              <div className={`w-3.5 h-3.5 bg-black rounded-full absolute transition-transform ${toggles.rag ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-300">Sandbox Triage</span>
            <button
              onClick={() => setToggles((t) => ({ ...t, sandbox: !t.sandbox }))}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center ${toggles.sandbox ? "bg-cyan-500" : "bg-zinc-800"}`}
            >
              <div className={`w-3.5 h-3.5 bg-black rounded-full absolute transition-transform ${toggles.sandbox ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="text-[9px] text-zinc-500 border-t border-white/[0.04] pt-2 mt-4">
          POLICIES SYNCD: 14ms ago
        </div>
      </div>

      {/* Natural Language compiler input */}
      <div className="md:col-span-3 bg-zinc-950 p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between relative overflow-hidden">
        <div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Natural Language Rule Compiler</span>
          <textarea
            value={rulePrompt}
            onChange={(e) => setRulePrompt(e.target.value)}
            disabled={compiling}
            className="w-full h-24 bg-zinc-900 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none resize-none"
          />
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleCompile}
            disabled={compiling || !rulePrompt.trim()}
            className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs py-2 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-[0.98] transition-transform"
          >
            {compiling ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Compiling Policy...</span>
              </>
            ) : (
              <>
                <Sparkles size={12} />
                <span>Compile Rule</span>
              </>
            )}
          </button>
        </div>

        {/* Compile Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">Rule Compiled Successfully!</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[220px]">
                Rule integrated into on-premise pipeline in 420ms.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 hover:text-white border border-white/[0.08] rounded-full cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Tab 2: Workspaces
function WorkspacesTab() {
  const [workspace, setWorkspace] = useState("Security-Ops");
  
  const reposByWorkspace: Record<string, { name: string; lang: string; status: string; score: number }[]> = {
    "Security-Ops": [
      { name: "api-gateway", lang: "Go", status: "Secured", score: 98 },
      { name: "auth-server", lang: "Python", status: "Threat Blocked", score: 85 },
      { name: "payment-service", lang: "Go", status: "Scanning", score: 92 }
    ],
    "Billing-Team": [
      { name: "stripe-connector", lang: "Typescript", status: "Secured", score: 100 },
      { name: "invoice-pdf-worker", lang: "Python", status: "Secured", score: 96 }
    ],
    "Main-Repo": [
      { name: "frontend-dashboard", lang: "TypeScript", status: "Secured", score: 94 },
      { name: "utils-library", lang: "Go", status: "Threat Blocked", score: 78 }
    ]
  };

  const currentRepos = reposByWorkspace[workspace] || reposByWorkspace["Security-Ops"];

  return (
    <div className="bg-zinc-950 p-5 rounded-2xl border border-white/[0.08] h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Workspace Repository Registry</span>
          
          <select
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            className="bg-zinc-900 border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="Security-Ops">Security-Ops</option>
            <option value="Billing-Team">Billing-Team</option>
            <option value="Main-Repo">Main-Repo</option>
          </select>
        </div>

        {/* Repository status table */}
        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
          {currentRepos.map((repo, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-white/[0.04] rounded-xl text-[10px]">
              <div className="flex items-center gap-2">
                <FolderGit2 size={12} className="text-zinc-500" />
                <span className="text-zinc-200 font-bold">{repo.name}</span>
                <span className="text-zinc-500 font-mono text-[9px] bg-zinc-900 px-1.5 py-0.5 rounded border border-white/[0.02]">{repo.lang}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold uppercase text-[9px] px-2 py-0.5 rounded border ${
                    repo.status === "Secured"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : repo.status === "Threat Blocked"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                  }`}
                >
                  {repo.status}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 font-mono">Score:</span>
                  <span className={`font-mono font-bold ${repo.score >= 90 ? "text-emerald-400" : "text-amber-400"}`}>{repo.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[9px] text-zinc-500 border-t border-white/[0.04] pt-2 mt-4">
        WORKSPACE INTEGRATION: LOCAL GIT HOOKS ACTIVE
      </div>
    </div>
  );
}

// Tab 3: Compliance
function ComplianceTab() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setDownloaded(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1200);
  };

  const gauges = [
    { label: "SOC 2 Type II", val: 100, color: "stroke-emerald-400" },
    { label: "PCI-DSS v4.0", val: 100, color: "stroke-emerald-400" },
    { label: "ISO 27001", val: 94, color: "stroke-cyan-400" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
      {/* Gauge panel */}
      <div className="md:col-span-3 bg-zinc-950 p-5 rounded-2xl border border-white/[0.08] flex items-center justify-around">
        {gauges.map((g, idx) => {
          // Circular SVG parameters
          const radius = 24;
          const stroke = 3.5;
          const circ = 2 * Math.PI * radius;
          const strokeOffset = circ - (g.val / 100) * circ;

          return (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className="stroke-zinc-900 fill-none"
                    strokeWidth={stroke}
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className={`fill-none ${g.color}`}
                    strokeWidth={stroke}
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: strokeOffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute font-mono text-[10px] font-bold text-white">
                  {g.val}%
                </div>
              </div>
              <span className="text-[10px] text-zinc-300 font-bold mt-2 block">{g.label}</span>
            </div>
          );
        })}
      </div>

      {/* Report exporter */}
      <div className="md:col-span-2 bg-zinc-950 p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">Compliance Exporter</span>
          <p className="text-[10px] text-zinc-400 leading-normal font-light">
            Generate and export fully audited, signed compliance logs for regulatory auditors.
          </p>
        </div>

        <div>
          {downloaded ? (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={12} />
              <span>Audit Trail Exported!</span>
            </motion.div>
          ) : (
            <button
              onClick={handleExport}
              disabled={downloading}
              className="w-full bg-zinc-900 hover:bg-zinc-850 border border-white/[0.08] hover:border-white/[0.15] text-white py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-transform"
            >
              {downloading ? (
                <>
                  <Loader2 size={12} className="animate-spin text-cyan-400" />
                  <span>Generating logs...</span>
                </>
              ) : (
                <>
                  <ArrowDownToLine size={12} className="text-cyan-400" />
                  <span>Export Audit Logs</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Tab 4: Agent Orchestration
function OrchestrationTab() {
  const [activeNode, setActiveNode] = useState(0);
  const [flowProgress, setFlowProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowProgress((prev) => {
        const next = prev + 1;
        return next > 5 ? 0 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: "ide", label: "Developer IDE", sub: "VS Code / Cursor", icon: Monitor, x: 8, y: 50 },
    { id: "orchestrator", label: "Orchestrator (Go)", sub: "API Gateway Proxy", icon: Shield, x: 22, y: 50 },
    { id: "scanner", label: "Scanner (Go)", sub: "PII & Secret Redactor", icon: FolderGit2, x: 36, y: 50 },
    { id: "brain", label: "Brain (Python)", sub: "AI Threat Analyst", icon: Cpu, x: 50, y: 50 },
    { id: "sandbox", label: "Sandbox (Python)", sub: "Docker Exploit Validator", icon: Server, x: 64, y: 50 },
    { id: "intelligence", label: "Intelligence (Python)", sub: "Local Threat Database", icon: Database, x: 78, y: 50 },
    { id: "patch", label: "Secure Patch", sub: "1-Click Git PR (Preview)", icon: GitBranch, x: 92, y: 50 },
  ];

  return (
    <div className="w-full h-full bg-zinc-950 rounded-2xl border border-white/[0.08] p-5 overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Agent Orchestration Flow</span>
        <span className="text-[9px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          LIVE
        </span>
      </div>

      {/* Pipeline flow visualization */}
      <div className="relative w-full h-[200px]">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200">
          <defs>
            <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(6,182,212)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Static connection paths */}
          <path d="M80,100 L920,100" stroke="rgb(39,39,42)" strokeWidth="2" fill="none" />

          {/* Animated flow pulse */}
          {flowProgress < 6 && (
            <motion.circle
              r="5"
              fill="rgb(6,182,212)"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={
                  flowProgress === 0 ? "M80,100 L220,100" :
                  flowProgress === 1 ? "M220,100 L360,100" :
                  flowProgress === 2 ? "M360,100 L500,100" :
                  flowProgress === 3 ? "M500,100 L640,100" :
                  flowProgress === 4 ? "M640,100 L780,100" :
                  flowProgress === 5 ? "M780,100 L920,100" : ""
                }
              />
            </motion.circle>
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const NodeIcon = node.icon;
          const isActive = idx === activeNode;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(idx)}
              className="absolute flex flex-col items-center transition-all duration-300"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? "0 0 20px rgba(6,182,212,0.3)" : "none",
                }}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                    : "bg-zinc-900 border-white/[0.08] text-zinc-400 hover:border-cyan-500/20 hover:text-cyan-400"
                }`}
              >
                <NodeIcon size={18} />
              </motion.div>
              <span className="text-[9px] text-zinc-400 font-bold mt-1.5 text-center whitespace-nowrap">{node.label}</span>
              <span className="text-[7px] text-zinc-600 text-center whitespace-nowrap">{node.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Active node detail */}
      <div className="mt-4 pt-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-2 text-[9px] text-zinc-500">
          <Activity size={10} className="text-cyan-400" />
          <span>Active: <strong className="text-zinc-300">{nodes[activeNode].label}</strong> — {nodes[activeNode].sub}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Container ---

interface FeatureCard {
  id: number;
  tabIdx: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
}

export default function DashboardShowcase() {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tokens, setTokens] = useState(12804500);

  const tabs = [
    { label: "Overview", icon: Activity, comp: OverviewTab },
    { label: "Rules Editor", icon: Sliders, comp: RulesTab },
    { label: "Workspaces", icon: FolderGit2, comp: WorkspacesTab },
    { label: "Compliance", icon: FileCheck, comp: ComplianceTab },
    { label: "Orchestration", icon: GitBranch, comp: OrchestrationTab }
  ];

  const bottomCards: FeatureCard[] = [
    {
      id: 1,
      tabIdx: 1,
      title: "Custom UI Rules Editor",
      desc: "Compile prompt filters on-premise using natural language guidelines to intercept shadow API dependencies.",
      icon: Sliders
    },
    {
      id: 2,
      tabIdx: 2,
      title: "Team & Project Segregation",
      desc: "Assign repository workspaces dynamically to secure specific team segments and configure custom hooks.",
      icon: Users
    },
    {
      id: 3,
      tabIdx: 3,
      title: "Compliance & Auditing",
      desc: "Generate continuous audit logs matching PCI-DSS v4.0 and SOC 2 templates to export report details instantly.",
      icon: FileCheck
    },
    {
      id: 4,
      tabIdx: 4,
      title: "Agent Orchestration",
      desc: "Visualize the end-to-end flow from local IDE through CodeGate Proxy, sandbox triage, RAG enrichment, to local LLM inference and auto-patching.",
      icon: GitBranch
    }
  ];

  // Increment tokens processed count
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens((prev) => prev + Math.floor(Math.random() * 3200) + 1800);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Idle autoplay loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % tabs.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, tabs.length]);

  // Capture interactions to lock loop
  const handleInteraction = () => {
    if (!isPaused) {
      setIsPaused(true);
    }
  };

  const ActiveComponent = tabs[activeTabIdx].comp;

  return (
    <section
      id="architecture"
      onClickCapture={handleInteraction}
      onKeyDownCapture={handleInteraction}
      className="relative py-24 px-6 bg-black z-10 flex flex-col items-center overflow-hidden"
    >
      {/* Background soft glow behind showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />

      <div className="max-w-5xl w-full text-center mb-16 relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          Sovereign Control Plane
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          The CodeGate Command Center
        </h2>
        <p className="text-zinc-400 font-normal leading-relaxed text-sm max-w-2xl mx-auto">
          Manage your VPC security agent configurations, analyze on-premise scan records, and inspect agentic workflows in a state-of-the-art interface.
        </p>
      </div>

      {/* mock browser container */}
      <div
        className="relative max-w-4xl w-full aspect-[16/10.5] rounded-3xl border border-white/[0.12] bg-zinc-950/40 backdrop-blur-md p-3 overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {/* Browser Top nav Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.05]">
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* mock url */}
          <div className="bg-zinc-900 border border-white/[0.04] rounded-lg px-6 py-1 text-[9px] font-mono text-zinc-500 tracking-wide select-none">
            https://console.codegate.local
          </div>

          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Console Workspace Layout */}
        <div className="flex-1 grid grid-cols-12 min-h-0 pt-3">
          {/* Dashboard Left Sidebar */}
          <div className="col-span-3 border-r border-white/[0.05] pr-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest pl-2 mb-2 block">Navigation</span>
              {tabs.map((tab, idx) => {
                const TabIcon = tab.icon;
                const isActive = idx === activeTabIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTabIdx(idx)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 cursor-pointer relative transition-all ${
                      isActive
                        ? "text-cyan-400 bg-white/[0.04] border border-white/[0.05]"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <TabIcon size={14} className={isActive ? "animate-pulse" : ""} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Connection badge */}
            <div className="p-3 bg-zinc-900/40 border border-white/[0.04] rounded-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-[9px] text-zinc-500">Agent: VPC.Active</span>
            </div>
          </div>

          {/* Main Tab Content Viewport */}
          <div className="col-span-9 pl-4 h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full min-h-0 pb-1"
              >
                <ActiveComponent tokens={tokens} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Features Interactive cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10">
        {bottomCards.map((card) => {
          const CardIcon = card.icon;
          const isCorrespondingTabActive = activeTabIdx === card.tabIdx;

          return (
            <button
              key={card.id}
              onClick={() => setActiveTabIdx(card.tabIdx)}
              className={`group text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                isCorrespondingTabActive
                  ? "border-cyan-500/40 bg-zinc-900/10 shadow-lg shadow-cyan-500/[0.02]"
                  : "border-white/[0.12] bg-zinc-950/40 hover:-translate-y-1 hover:border-white/[0.22] hover:bg-zinc-900/10 hover:shadow-lg"
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-colors duration-300 ${
                    isCorrespondingTabActive
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "bg-zinc-900 border-white/[0.08] text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30"
                  }`}
                >
                  <CardIcon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-zinc-400 leading-normal font-light">{card.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
