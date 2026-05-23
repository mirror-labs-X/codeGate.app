"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
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
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
          <span className="text-[9px] text-zinc-500 uppercase">Status: Ingesting</span>
        </div>

        <div className="space-y-2.5">
          {envLines.map((line, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border transition-all duration-300 ${
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
                  <span className={`text-[9px] font-bold ${redacted[idx] ? "text-emerald-400" : "text-rose-400 animate-pulse"}`}>
                    {redacted[idx] ? "Scrubbed" : "Sensitive"}
                  </span>
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

  useEffect(() => {
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
  }, [queue]);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Token Partition Manager</span>
          </div>
          <span className="text-[9px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded font-bold">FLAT COMPUTE ACTIVE</span>
        </div>

        {/* Incoming Files Queue */}
        <div className="mb-4">
          <span className="text-zinc-500 block mb-1.5 uppercase text-[9px] tracking-wider font-bold">Scanning Queue:</span>
          <div className="flex gap-2">
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
        <div className="grid grid-cols-3 gap-3">
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

      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] text-zinc-500 flex justify-between">
        <span>MAX PACKET: 8,192 TOKENS</span>
        <span>COMPUTE LOAD: PARALLELIZED</span>
      </div>
    </div>
  );
}

// Step 3: Semantic Threat Context
function ThreatContextSimulator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{ cve: string; desc: string; score: number }[]>([]);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let cycleInterval: NodeJS.Timeout;

    const startCycle = () => {
      clearTimeout(timer1);
      clearTimeout(timer2);

      setSearchQuery("");
      setResults([]);

      timer1 = setTimeout(() => {
        setSearchQuery("CVE dynamic execution taint eval");
      }, 800);

      timer2 = setTimeout(() => {
        setResults([
          { cve: "CVE-2023-30551", desc: "Dynamic payload taint propagation to execution sinks", score: 0.98 },
          { cve: "CVE-2024-21092", desc: "Command injection vulnerability via dynamic eval loading", score: 0.87 }
        ]);
      }, 2000);
    };

    startCycle();
    cycleInterval = setInterval(startCycle, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-950 p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-cyan-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Local Threat Intelligence Search</span>
          </div>
          <span className="text-[9px] text-indigo-400 font-bold uppercase bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">LOCAL RETRIEVAL</span>
        </div>

        {/* Search bar simulation */}
        <div className="w-full bg-zinc-900 border border-white/[0.08] rounded-lg p-2 flex items-center gap-2 mb-4">
          <Search size={12} className="text-zinc-500" />
          <span className="text-zinc-200">
            {searchQuery || <span className="text-zinc-600 italic">Querying local threat database...</span>}
          </span>
          <span className="w-1 h-3.5 bg-cyan-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-bold">Matched Advisories:</span>
          {results.map((res, idx) => (
            <motion.div
              key={idx}
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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runStep = (step: number) => {
      if (step < SANDBOX_STEPS.length) {
        timer = setTimeout(() => {
          setLogs((prev) => [...prev, SANDBOX_STEPS[step]]);
          setCurrentStep(step + 1);
          runStep(step + 1);
        }, 1000);
      } else {
        timer = setTimeout(() => {
          setLogs([]);
          setCurrentStep(0);
          runStep(0);
        }, 3000);
      }
    };

    runStep(0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-black p-6 font-mono text-[11px] text-zinc-300">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-rose-400" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Active Validation Sandbox</span>
          </div>
          <span className="text-[9px] text-emerald-400 font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">ACTIVE SERVICE</span>
        </div>

        <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
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
          {currentStep < SANDBOX_STEPS.length && (
            <div className="flex items-center gap-1 text-cyan-400">
              <span>typing</span>
              <span className="w-1 h-3 bg-cyan-400 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] text-zinc-500 flex justify-between">
        <span>SANDBOX STATUS: ACTIVE</span>
        <span>CLEANUP STATE: PRISTINE</span>
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
    description: "Codebases grow non-linearly, which standard pay-per-token API schemes scale exponentially. CodeGate partitions codebase graphs into optimized context chunks, reducing compute load and maintaining flat billing control.",
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
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === activeStepId;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`group w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden active:scale-[0.97] ${
                    isActive
                      ? "z-10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.08)] bg-zinc-950/60 scale-[1.02] hover:scale-[1.04] hover:border-cyan-500/60"
                      : "z-0 hover:z-20 border-white/[0.08] bg-zinc-950/20 hover:bg-zinc-900/40 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)] hover:scale-[1.04]"
                  }`}
                >
                  {/* Shared backdrop selection capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="active-step-bg"
                      className="absolute inset-0 bg-zinc-900/60 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  <div
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                        : "bg-zinc-950 border-white/[0.08] text-zinc-500 group-hover:border-cyan-500/30 group-hover:text-cyan-400 group-hover:bg-cyan-500/10"
                    }`}
                  >
                    <Icon size={22} className={isActive ? "animate-pulse" : ""} />
                  </div>

                  <div className="flex-1">
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
            })}
          </div>

          {/* Right Column: Tab View Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full bg-zinc-950/40 border border-white/[0.12] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
            {/* Visual Simulator Viewer Wrapper */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden">
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
            <div className="mt-8 relative z-10">
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
          </div>
        </div>
      </div>
    </section>
  );
}
