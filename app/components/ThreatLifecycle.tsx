"use client";

import React, { useState, useEffect, useMemo, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  GitPullRequest,
  Database,
  Cpu,
  Lock,
  Check,
  Terminal,
  FileCode,
  Search,
  ArrowRight,
  Loader2
} from "lucide-react";

// --- Simulators ---

// Step 1: Ingest & Local PII Scrub
function IngestScrubSimulator() {
  const [activeLine, setActiveLine] = useState(0);
  const [redacted, setRedacted] = useState<boolean[]>([false, false, false, false]);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    if (isInteracted) return;
    const interval = setInterval(() => {
      setActiveLine((prev) => {
        const next = (prev + 1) % 4;
        if (next === 0) {
          setRedacted([false, false, false, false]);
        } else {
          setRedacted((old) => {
            const updated = [...old];
            updated[prev] = true;
            return updated;
          });
        }
        return next;
      });
    }, 1800);

    return () => {
      clearInterval(interval);
    };
  }, [isInteracted]);

  const envLines = [
    { label: "DB_PASSWORD", value: '"super_secret_db_pass_2026"', secret: true },
    { label: "AWS_SECRET_KEY", value: '"wJalrXUtnFEMI/K7MDENG/bPxRfiCYKEY"', secret: true },
    { label: "STRIPE_API_KEY", value: '"rk_live_51Nx892..."', secret: true },
    { label: "PORT", value: "8080", secret: false }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">PII & Secrets Scrub Shield</span>
          </div>
          <span className="text-[9px] text-zinc-500 uppercase">{isInteracted ? "Manual Mode" : "Status: Ingesting"}</span>
        </div>

        <div className="space-y-2.5">
          {envLines.map((line, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (line.secret) {
                  setIsInteracted(true);
                  setRedacted((old) => {
                    const updated = [...old];
                    updated[idx] = !updated[idx];
                    return updated;
                  });
                }
              }}
              className={`group p-2.5 rounded-lg border transition-all duration-300 ${
                line.secret ? "cursor-pointer hover:border-cyan-500/30 hover:bg-zinc-900/10" : ""
              } ${
                activeLine === idx
                  ? "bg-zinc-900 border-cyan-500/30"
                  : "bg-zinc-950 border-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  <span className="text-zinc-500">{line.label}</span>
                  <span className="text-white font-bold"> = </span>
                  {line.secret && redacted[idx] ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold inline-flex items-center gap-1"
                    >
                      <Lock size={10} /> [REDACTED]
                    </motion.span>
                  ) : (
                    <span className={line.secret ? "text-rose-400" : "text-cyan-400"}>{line.value}</span>
                  )}
                </span>
                {line.secret && (
                  <div className="flex flex-col items-end gap-0.5 select-none">
                    <span className={`text-[9px] font-bold ${redacted[idx] ? "text-emerald-400" : "text-rose-400 animate-pulse"}`}>
                      {redacted[idx] ? "Scrubbed" : "Sensitive"}
                    </span>
                    <span className="text-[7px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-wider">
                      {redacted[idx] ? "Click to reveal" : "Click to redact"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-zinc-500 text-[9px]">
        <span>TOTAL SCAN RATE: 14.2 MB/s</span>
        <span className="text-emerald-400 font-bold">✓ 0 CREDENTIAL LEAKS PERMITTED</span>
      </div>
    </div>
  );
}

// Step 2: Token-Optimized Batching
function TokenBatchingSimulator() {
  const [batches, setBatches] = useState<{ id: string; files: string[]; size: number }[]>([
    { id: "Batch A", files: ["auth.py", "session.py"], size: 4120 },
    { id: "Batch B", files: ["utils.js", "helpers.js"], size: 3890 },
    { id: "Batch C", files: [], size: 0 }
  ]);

  const queue = useMemo(() => ["payment.py", "routes.py", "config.yaml"], []);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setQueueIndex((prev) => {
        if (prev < queue.length) {
          const nextFile = queue[prev];
          setBatches((oldBatches) => {
            const next = oldBatches.map((b) => ({ ...b, files: [...b.files] }));
            const targetBatch = next[2].files.length < 2 ? next[2] : next[1];
            targetBatch.files.push(nextFile);
            targetBatch.size += Math.floor(Math.random() * 1200) + 800;
            return next;
          });
          return prev + 1;
        } else {
          setBatches([
            { id: "Batch A", files: ["auth.py", "session.py"], size: 4120 },
            { id: "Batch B", files: ["utils.js", "helpers.js"], size: 3890 },
            { id: "Batch C", files: [], size: 0 }
          ]);
          return 0;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [queue, isAutoPlaying]);

  const handleProcessNext = () => {
    setIsAutoPlaying(false);
    if (queueIndex < queue.length) {
      const nextFile = queue[queueIndex];
      setBatches((oldBatches) => {
        const next = oldBatches.map((b) => ({ ...b, files: [...b.files] }));
        const targetBatch = next[2].files.length < 2 ? next[2] : next[1];
        targetBatch.files.push(nextFile);
        targetBatch.size += Math.floor(Math.random() * 1200) + 800;
        return next;
      });
      setQueueIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsAutoPlaying(false);
    setBatches([
      { id: "Batch A", files: ["auth.py", "session.py"], size: 4120 },
      { id: "Batch B", files: ["utils.js", "helpers.js"], size: 3890 },
      { id: "Batch C", files: [], size: 0 }
    ]);
    setQueueIndex(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Token Partition Manager</span>
          </div>
          <span className="text-[9px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded font-bold">
            {isAutoPlaying ? "FLAT COMPUTE ACTIVE" : "MANUAL MODE"}
          </span>
        </div>

        {/* Incoming Files Queue */}
        <div className="mb-4">
          <span className="text-zinc-500 block mb-1.5 uppercase text-[9px] tracking-wider font-bold">Scanning Queue:</span>
          <div className="flex flex-wrap gap-2">
            {queue.map((file, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded border transition-all duration-300 flex items-center gap-1.5 ${
                  idx < queueIndex
                    ? "opacity-30 border-white/[0.04] bg-white/[0.02]"
                    : idx === queueIndex
                    ? "border-cyan-500/50 bg-cyan-500/5 text-white scale-105"
                    : "border-white/[0.08] bg-zinc-900 text-zinc-400"
                }`}
              >
                <FileCode size={12} /> {file}
              </span>
            ))}
          </div>
        </div>

        {/* Token Partition Batches */}
        <span className="text-zinc-500 block mb-1.5 uppercase text-[9px] tracking-wider font-bold">Context-Optimized Batches:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {batches.map((batch, idx) => (
            <div key={idx} className="p-3 bg-zinc-900/60 border border-white/[0.08] rounded-xl flex flex-col justify-between min-h-[100px]">
              <div>
                <span className="text-white font-bold block mb-1">{batch.id}</span>
                <div className="space-y-1 mt-2">
                  {batch.files.map((f, fIdx) => (
                    <motion.div
                      key={fIdx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-zinc-950 border border-white/[0.05] p-1 rounded text-[9px] text-zinc-400"
                    >
                      {f}
                    </motion.div>
                  ))}
                  {batch.files.length === 0 && (
                    <span className="text-zinc-600 italic text-[10px] block py-2">Empty</span>
                  )}
                </div>
              </div>
              <div className="text-[9px] text-cyan-400 font-bold border-t border-white/[0.04] pt-2 mt-2">
                {batch.size > 0 ? `${(batch.size / 1000).toFixed(1)}k tokens` : "Idle"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleProcessNext}
            disabled={queueIndex >= queue.length}
            className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98] cursor-pointer"
          >
            Process Next File
          </button>
          <button
            onClick={handleReset}
            className="bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-400 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98] cursor-pointer"
          >
            Reset Queue
          </button>
          {!isAutoPlaying && (
            <button
              onClick={() => setIsAutoPlaying(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98] cursor-pointer"
            >
              Resume Auto
            </button>
          )}
        </div>
        <div className="pt-2 border-t border-white/[0.04] text-[9px] text-zinc-500 flex justify-between">
          <span>MAX PACKET: 8,192 TOKENS</span>
          <span>COMPUTE LOAD: PARALLELIZED</span>
        </div>
      </div>
    </div>
  );
}

// Step 3: Semantic Threat Context
function ThreatContextSimulator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{ cve: string; desc: string; score: number }[]>([]);
  const [isManual, setIsManual] = useState(false);

  const threatDatabase = useMemo(() => [
    { cve: "CVE-2023-30551", desc: "Dynamic payload taint propagation to execution sinks", score: 0.98, keywords: ["eval", "taint", "dynamic", "execution"] },
    { cve: "CVE-2024-21092", desc: "Command injection vulnerability via dynamic eval loading", score: 0.87, keywords: ["eval", "command", "injection", "dynamic"] },
    { cve: "CVE-2026-0041", desc: "Remote Command Execution via shell metacharacters in parameter ingestion", score: 0.95, keywords: ["cve-2026-0041", "command", "injection", "shell", "rce"] },
    { cve: "CVE-2025-1049", desc: "SQL injection vulnerability in input parser session handler", score: 0.91, keywords: ["sql", "injection", "database", "parser"] },
    { cve: "CVE-2026-1049", desc: "Prototype pollution in package merger vulnerability bypass", score: 0.89, keywords: ["prototype", "pollution", "merge", "object"] },
    { cve: "CVE-2026-3022", desc: "Cross-site scripting (XSS) in markdown parser utility", score: 0.82, keywords: ["xss", "cross-site", "markdown", "parser"] }
  ], []);

  // Autoplay cycle
  useEffect(() => {
    if (isManual) return;
    let timer1: NodeJS.Timeout | undefined = undefined;
    let cycleInterval: NodeJS.Timeout | undefined = undefined;

    const startCycle = () => {
      setSearchQuery("");
      setResults([]);

      timer1 = setTimeout(() => {
        setSearchQuery("CVE dynamic execution taint eval");
        setResults([
          { cve: "CVE-2023-30551", desc: "Dynamic payload taint propagation to execution sinks", score: 0.98 },
          { cve: "CVE-2024-21092", desc: "Command injection vulnerability via dynamic eval loading", score: 0.87 }
        ]);
      }, 1500);
    };

    startCycle();
    cycleInterval = setInterval(startCycle, 7000);

    return () => {
      if (timer1) clearTimeout(timer1);
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isManual]);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Local Threat Intelligence Search</span>
          </div>
          <span className="text-[9px] text-indigo-400 font-bold uppercase bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
            {isManual ? "MANUAL SEARCH" : "LOCAL RETRIEVAL"}
          </span>
        </div>

        {/* Search bar input */}
        <div className="w-full bg-zinc-900 border border-white/[0.08] focus-within:border-cyan-500/50 rounded-lg p-2.5 flex items-center gap-2 mb-4 transition-all">
          <Search size={12} className="text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setIsManual(true);
              const val = e.target.value;
              setSearchQuery(val);
              
              if (val.trim() === "") {
                setResults([]);
                return;
              }

              // Simple client-side search logic
              const queryTerms = val.toLowerCase().split(/\s+/).filter(Boolean);
              const matched = threatDatabase
                .map((item) => {
                  let matchCount = 0;
                  queryTerms.forEach((term) => {
                    if (
                      item.cve.toLowerCase().includes(term) ||
                      item.desc.toLowerCase().includes(term) ||
                      item.keywords.some((k) => k.includes(term))
                    ) {
                      matchCount++;
                    }
                  });
                  // Calculate dynamic match score
                  const baseScore = item.score;
                  const calculatedScore = queryTerms.length > 0 
                    ? (matchCount / queryTerms.length) * 0.4 + baseScore * 0.6
                    : baseScore;
                  
                  return {
                    ...item,
                    matchCount,
                    finalScore: Math.min(0.99, Math.max(0.3, calculatedScore))
                  };
                })
                .filter((item) => item.matchCount > 0)
                .sort((a, b) => b.finalScore - a.finalScore)
                .map((item) => ({
                  cve: item.cve,
                  desc: item.desc,
                  score: item.finalScore
                }));

              setResults(matched);
            }}
            placeholder="Type query (e.g. 'eval', 'injection', 'prototype')..."
            className="bg-transparent border-none outline-none text-zinc-200 w-full placeholder-zinc-600 text-[11px] font-mono"
          />
          {searchQuery && isManual && (
            <button 
              onClick={() => {
                setSearchQuery("");
                setResults([]);
              }}
              className="text-zinc-500 hover:text-zinc-300 text-[9px] px-1 font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-bold">Matched Advisories:</span>
          {results.map((res, idx) => (
            <motion.div
              key={res.cve + idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2.5 bg-zinc-900/60 border border-white/[0.06] rounded-lg"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-rose-400 font-bold text-[10px]">{res.cve}</span>
                <span className="text-emerald-400 font-bold text-[9px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  {(res.score * 100).toFixed(0)}% Match
                </span>
              </div>
              <p className="text-zinc-400 text-[10px] leading-relaxed">{res.desc}</p>
            </motion.div>
          ))}
          {results.length === 0 && (
            <div className="text-center py-4 text-zinc-600 italic">No advisories loaded yet...</div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] text-zinc-500 flex justify-between">
        <span>VECTORS INDEXED: 148,290</span>
        {isManual && (
          <button 
            onClick={() => setIsManual(false)} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-bold"
          >
            Reset Autoplay
          </button>
        )}
        <span>LATENCY: 8ms</span>
      </div>
    </div>
  );
}

// Step 4: Isolated Sandbox Triage (Preview)
const SANDBOX_STEPS = [
  "$ docker run --rm -it codegate/sandbox:triaging",
  "[sandbox] Initializing isolated triaging container...",
  "[sandbox] Injecting threat payload & tracing execution flow...",
  "[sandbox] TRACE: Taint path verified (input.data -> eval())",
  "[sandbox] ALERT: Remote Code Execution verified!",
  "[sandbox] Cleaning up sandbox environment... done."
];

function SandboxTriageSimulator() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTriageLoading, setIsTriageLoading] = useState(false);
  const [isManual, setIsManual] = useState(false);

  // Autoplay logic
  useEffect(() => {
    if (isManual) return;
    let timer: NodeJS.Timeout;

    const autoplayStep = (step: number) => {
      if (step < SANDBOX_STEPS.length) {
        timer = setTimeout(() => {
          setLogs((prev) => [...prev, SANDBOX_STEPS[step]]);
          setCurrentStep(step + 1);
          autoplayStep(step + 1);
        }, 1000);
      } else {
        timer = setTimeout(() => {
          setLogs([]);
          setCurrentStep(0);
          autoplayStep(0);
        }, 3000);
      }
    };

    autoplayStep(0);
    return () => clearTimeout(timer);
  }, [isManual]);

  const triggerManualTriage = () => {
    setIsManual(true);
    setIsTriageLoading(true);
    setLogs([]);
    setCurrentStep(0);

    setTimeout(() => {
      setIsTriageLoading(false);
      
      let stepIndex = 0;
      const stream = () => {
        if (stepIndex < SANDBOX_STEPS.length) {
          setLogs((prev) => [...prev, SANDBOX_STEPS[stepIndex]]);
          setCurrentStep(stepIndex + 1);
          stepIndex++;
          setTimeout(stream, 850);
        }
      };
      stream();
    }, 1200); // 1.2s loader mimic
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-black p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-rose-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Active Validation Sandbox</span>
          </div>
          <span className="text-[9px] text-emerald-400 font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            {isManual ? "MANUAL RUN" : "ACTIVE SERVICE"}
          </span>
        </div>

        <div className="space-y-1.5 max-h-[160px] overflow-y-auto min-h-[120px]">
          {isTriageLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-zinc-500 gap-2 h-full">
              <Loader2 size={20} className="animate-spin text-rose-500/80" />
              <span className="text-[10px] animate-pulse text-zinc-500">PROVISIONING ISOLATED SANDBOX...</span>
            </div>
          ) : (
            <>
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.startsWith("$")
                      ? "text-zinc-400"
                      : log.includes("ALERT")
                      ? "text-rose-400 font-bold bg-rose-950/15 border border-rose-500/10 p-1.5 rounded"
                      : log.includes("TRACE")
                      ? "text-amber-400"
                      : "text-zinc-500"
                  }`}
                >
                  {log}
                </div>
              ))}
              {currentStep < SANDBOX_STEPS.length && !isTriageLoading && (
                <div className="flex items-center gap-1 text-cyan-400">
                  <span>typing</span>
                  <span className="w-1 h-3 bg-cyan-400 animate-pulse" />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={triggerManualTriage}
            disabled={isTriageLoading || (currentStep > 0 && currentStep < SANDBOX_STEPS.length)}
            className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 disabled:hover:bg-rose-500/10 border border-rose-500/30 text-rose-400 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isTriageLoading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Terminal size={12} />
                <span>Re-run Sandbox Triage</span>
              </>
            )}
          </button>
          {isManual && (
            <button
              onClick={() => setIsManual(false)}
              disabled={isTriageLoading || (currentStep > 0 && currentStep < SANDBOX_STEPS.length)}
              className="bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-400 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-[0.98] cursor-pointer"
            >
              Resume Auto
            </button>
          )}
        </div>
        <div className="pt-2 border-t border-white/[0.04] text-[9px] text-zinc-500 flex justify-between">
          <span>SANDBOX STATUS: ACTIVE</span>
          <span>CLEANUP STATE: PRISTINE</span>
        </div>
      </div>
    </div>
  );
}

// Step 5: Sovereign Remediation (Coming Soon)
function RemediationSimulator() {
  const [prStatus, setPrStatus] = useState<"idle" | "creating" | "merged">("idle");

  const handleApplyPatch = () => {
    if (prStatus !== "idle") return;
    setPrStatus("creating");
    setTimeout(() => {
      setPrStatus("merged");
    }, 1800);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (prStatus === "merged") {
      timer = setTimeout(() => {
        setPrStatus("idle");
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [prStatus]);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <GitPullRequest size={14} className="text-purple-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Sovereign Git patch diff</span>
          </div>
          <span className="text-[9px] text-amber-400 font-bold uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">PREVIEW MODE</span>
        </div>

        {/* Diff mock */}
        <div className="bg-zinc-900 border border-white/[0.08] rounded-xl p-3.5 mb-4 text-[10px] leading-normal space-y-1">
          <div className="text-zinc-500 border-b border-white/[0.04] pb-1.5 mb-1.5 uppercase font-bold text-[9px]">src/auth/client_session.py</div>
          <div className="text-rose-400 bg-rose-950/20 border-l border-rose-500 pl-2">
            - eval(data[&apos;config&apos;])
          </div>
          <div className="text-emerald-400 bg-emerald-950/20 border-l border-emerald-500 pl-2">
            + config = json.loads(data[&apos;config&apos;])
          </div>
          <div className="text-emerald-400 bg-emerald-950/20 border-l border-emerald-500 pl-2">
            + validate_schema(config)
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {prStatus === "idle" && (
          <button
            onClick={handleApplyPatch}
            className="w-full bg-cyan-500 text-black hover:bg-cyan-400 text-[11px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] transition-transform duration-150"
          >
            <span>Apply Secure Patch (1-Click PR)</span>
            <ArrowRight size={12} />
          </button>
        )}

        {prStatus === "creating" && (
          <div className="w-full bg-zinc-900 border border-white/[0.06] py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-zinc-400 text-[11px]">
            <Loader2 size={12} className="animate-spin text-cyan-400" />
            <span>Generating secure PR and running checks...</span>
          </div>
        )}

        {prStatus === "merged" && (
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold"
          >
            <Check size={12} />
            <span>PR #142 Merged Successfully!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Steps Data ---

interface Step {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  simulator: React.ComponentType<unknown>;
  bulletPoints: string[];
}

const steps: Step[] = [
  {
    id: 1,
    badge: "01 . INGEST",
    title: "Corporate Data Privacy Shield",
    subtitle: "Local scanning and redaction of credentials within your firewall.",
    description: "CodeGate intercepts incoming files, analyzing code blocks and scanning configuration profiles locally. Sensitive API tokens, passwords, and private identifiers are redacted on-premise prior to any processing.",
    icon: Lock,
    simulator: IngestScrubSimulator,
    bulletPoints: [
      "Local Redaction: Environment keys and raw passwords scrubbed immediately.",
      "Data Sovereignty: All scanning executed locally inside your VPC structure.",
      "Zero Data Leakage: Secrets are blocked from escaping to external LLM servers."
    ]
  },
  {
    id: 2,
    badge: "02 . PROCESS",
    title: "Cost-Efficient Processing Engine",
    subtitle: "Parallel partitions designed to save API costs and respect context caps.",
    description: "Codebases grow non-linearly, while standard pay-per-token API schemes scale exponentially. CodeGate partitions codebase graphs into optimized context chunks, reducing compute load and maintaining flat billing control.",
    icon: Cpu,
    simulator: TokenBatchingSimulator,
    bulletPoints: [
      "Compute Optimization: Partitions modules to respect model context constraints.",
      "Parallel Processing: Splits scanning workloads across sandbox threads.",
      "Flat-Rate Costing: Predictable costing regardless of request frequencies."
    ]
  },
  {
    id: 3,
    badge: "03 . RETRIEVE",
    title: "Smart Context Retrieval",
    subtitle: "Matching threat patterns against local security knowledge bases.",
    description: "Instead of sending raw code to external APIs, CodeGate retrieves CVE records and threat profiles locally to enrich the AI's understanding, resulting in highly accurate threat detection.",
    icon: Database,
    simulator: ThreatContextSimulator,
    bulletPoints: [
      "Smart Search: Instantly matches code pattern anomalies against global security intelligence.",
      "Local Database: Offline repository of vulnerability profiles keeps scans private and fast."
    ]
  },
  {
    id: 4,
    badge: "04 . TRIAGE",
    title: "Automated Sandbox Verification",
    subtitle: "Proving vulnerability exploitability in isolated containers.",
    description: "Traditional scanners generate thousands of false alarms, causing alert fatigue. CodeGate runs code snippets inside a secure, isolated sandbox to confirm if they are actually exploitable before alerting developers.",
    icon: Terminal,
    simulator: SandboxTriageSimulator,
    bulletPoints: [
      "Zero False Positives: CodeGate verifies exploitability, filtering out harmless alerts.",
      "Secure Isolation: Safely executes and tests code inside locked-down sandboxes.",
      "Actionable Diagnostics: Delivers clear execution logs showing exactly how the exploit behaves."
    ]
  },
  {
    id: 5,
    badge: "05 . REMEDIATE (PREVIEW)",
    title: "Automated Patch Delivery",
    subtitle: "IDE and Git workflow integrations for secure, fast code fixes.",
    description: "Once verified, CodeGate designs a Git diff patch replacing vulnerable constructs. Developers can review the parameterized query modifications and apply a secure pull request in a single click.",
    icon: GitPullRequest,
    simulator: RemediationSimulator,
    bulletPoints: [
      "Git and IDE Workflow: Integrates directly with repository PR dashboards.",
      "Sovereign Patch: Fully parameterized remediation codes generated locally.",
      "MTTR Optimization: Resolves validated vulnerabilities in minutes, not days."
    ]
  }
];

interface StepButtonProps {
  step: Step;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function StepButton({ step, isActive, onClick, onMouseEnter, onMouseLeave }: StepButtonProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 200, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = step.icon;

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group w-full text-left p-4 sm:p-5 md:p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden active:scale-[0.97] ${
        isActive
          ? "z-10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.08)] bg-zinc-950/60 scale-[1.02] hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          : "z-0 hover:z-20 border-white/[0.08] bg-zinc-950/20 hover:bg-zinc-900/40 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] scale-100 hover:scale-105"
      }`}
    >
      {/* Light glow overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${springX}px ${springY}px,
              rgba(0, 240, 255, 0.08) 0%,
              rgba(99, 102, 241, 0.04) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Glassmorphic border overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${springX}px ${springY}px,
              rgba(0, 240, 255, 0.15),
              transparent 70%
            )
          `,
          maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Shared backdrop selection capsule */}
      {isActive && (
        <motion.div
          layoutId="active-step-bg"
          className="absolute inset-0 bg-zinc-900/60 z-0"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}

      <div
        className={`p-3 rounded-xl border transition-all duration-300 relative z-20 ${
          isActive
            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
            : "bg-zinc-950 border-white/[0.08] text-zinc-500 group-hover:border-cyan-400/50 group-hover:text-cyan-400 group-hover:bg-cyan-500/10"
        }`}
      >
        <Icon size={22} className={isActive ? "animate-pulse" : ""} />
      </div>

      <div className="flex-1 relative z-20">
        <span
          className={`text-[10px] font-bold tracking-wider transition-colors ${
            isActive ? "text-cyan-400" : "text-zinc-500 group-hover:text-cyan-400"
          }`}
        >
          {step.badge}
        </span>
        <h3
          className={`text-base font-semibold mt-1 transition-colors ${
            isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-xs mt-2 leading-relaxed transition-colors ${
            isActive ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-300"
          }`}
        >
          {step.subtitle}
        </p>
      </div>
    </button>
  );
}

interface ShowcaseCardProps {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function ShowcaseCard({ children, onMouseEnter, onMouseLeave }: ShowcaseCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 200, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="lg:col-span-7 flex flex-col justify-between h-full bg-zinc-950/40 border border-white/[0.12] rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden backdrop-blur-xl group hover:border-white/[0.22] transition-colors duration-300"
    >
      {/* Light glow overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              380px circle at ${springX}px ${springY}px,
              rgba(0, 240, 255, 0.08) 0%,
              rgba(99, 102, 241, 0.04) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Glassmorphic border overlay following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              380px circle at ${springX}px ${springY}px,
              rgba(0, 240, 255, 0.15),
              transparent 70%
            )
          `,
          maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {children}
    </div>
  );
}

export default function ThreatLifecycle() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];
  const ActiveSimulator = activeStep.simulator;

  // Autoplay loop every 16s on idle
  useEffect(() => {
    if (isPaused || isHovered) return;

    const timer = setInterval(() => {
      setActiveStepId((prev) => {
        const next = prev + 1;
        return next > steps.length ? 1 : next;
      });
    }, 16000);

    return () => clearInterval(timer);
  }, [isPaused, isHovered]);

  // Capture phase events to halt autoplay permanently upon user interaction
  const handleInteraction = () => {
    if (!isPaused) {
      setIsPaused(true);
    }
  };

  return (
    <section
      id="lifecycle"
      onClickCapture={handleInteraction}
      onKeyDownCapture={handleInteraction}
      className="relative py-10 md:py-14 px-6 bg-black z-10 overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 pointer-events-none z-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 pointer-events-none z-0 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.02] blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
            codegate-brain // autonomous-hunt
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            The Code<span className="text-cyan-400">Gate</span> Lifecycle
          </h2>
          <p className="text-zinc-400 font-normal leading-relaxed text-sm max-w-2xl mx-auto">
            End-to-end autonomous threat hunting pipeline — from local PII-scrubbed ingest through agentic reasoning, isolated sandbox triage, to one-click sovereign patch delivery.
          </p>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step) => {
              const isActive = step.id === activeStepId;
              const StepSimulator = step.simulator;
              return (
                <React.Fragment key={step.id}>
                  <StepButton
                    step={step}
                    isActive={isActive}
                    onClick={() => setActiveStepId(step.id)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                  {/* Inline Showcase Card for Mobile with smooth accordion height transition */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: "auto",
                          transition: {
                            height: {
                              type: "spring",
                              stiffness: 100,
                              damping: 20,
                              restDelta: 2
                            },
                            opacity: {
                              duration: 0.2,
                              delay: 0.05
                            }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          transition: {
                            height: {
                              duration: 0.25,
                              ease: "easeInOut"
                            },
                            opacity: {
                              duration: 0.15
                            }
                          }
                        }}
                        className="block lg:hidden w-full overflow-hidden"
                      >
                        <div className="pt-2 pb-4">
                          <ShowcaseCard
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            {/* Visual Simulator Viewer Wrapper */}
                            <div className="relative z-20 w-full aspect-auto min-h-[300px] rounded-2xl overflow-hidden">
                              <StepSimulator />
                            </div>

                            {/* Explanatory notes under the active screen */}
                            <div className="mt-6 relative z-20">
                              <h4 className="text-xs font-semibold text-white mb-2">Key Customer Benefits</h4>
                              <ul className="flex flex-col gap-2">
                                {step.bulletPoints.map((point, idx) => {
                                  const [boldText, normalText] = point.split(":");
                                  return (
                                    <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400 leading-normal">
                                      <span className="text-cyan-400 mt-0.5 font-bold flex-shrink-0">✓</span>
                                      <span>
                                        <strong className="text-zinc-200">{boldText}:</strong>
                                        {normalText}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </ShowcaseCard>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Column: Tab View Showcase (Desktop only) */}
          <div className="hidden lg:block lg:col-span-7 h-full">
            <ShowcaseCard
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Visual Simulator Viewer Wrapper */}
              <div className="relative z-20 w-full aspect-auto md:aspect-[4/3] min-h-[350px] md:min-h-0 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="w-full h-full relative"
                  >
                    <ActiveSimulator />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Explanatory notes under the active screen */}
              <div className="mt-8 relative z-20">
                <h4 className="text-sm font-semibold text-white mb-3">Key Customer Benefits</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeStep.bulletPoints.map((point, idx) => {
                    const [boldText, normalText] = point.split(":");
                    return (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400 leading-normal">
                        <span className="text-cyan-400 mt-1 font-bold">✓</span>
                        <span>
                          <strong className="text-zinc-200">{boldText}:</strong>
                          {normalText}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ShowcaseCard>
          </div>
        </div>
      </div>
    </section>
  );
}
