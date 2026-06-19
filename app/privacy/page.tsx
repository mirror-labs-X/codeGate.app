"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DemoModal from "../components/DemoModal";
import NoiseTexture from "../components/NoiseTexture";
import CursorGlow from "../components/CursorGlow";

export default function PrivacyPolicy() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <NoiseTexture />
      <CursorGlow />
      <Header onOpenDemo={openDemo} />

      <main className="relative z-10 w-full pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header section */}
          <div className="mb-12 border-b border-white/[0.08] pb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              Security & Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-500 font-mono">
              Last Updated: June 19, 2026
            </p>
          </div>

          {/* Policy content */}
          <div className="space-y-10 text-zinc-300 text-sm leading-relaxed font-light">
            <p>
              At CodeGate, we design developer tools with an absolute commitment to privacy. 
              As an on-premises AppSec proxy for agentic workflows, our core architectural 
              design is simple: <strong>your source code should never leave your control</strong>. 
              This Privacy Policy explains how CodeGate (“we”, “our”, or “us”) handles 
              information collected through our local gateway software, command center portal, 
              and website.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                1. Local-First Processing Architecture
              </h2>
              <p>
                Unlike traditional cloud SaaS security scanners, CodeGate is built to run 
                locally in your private cloud or local environment.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-200">Source Code Isolation:</strong> The CodeGate proxy intercepts agentic requests locally. Your raw source code is parsed, analyzed, and scrubbed inside your network perimeter.
                </li>
                <li>
                  <strong className="text-zinc-200">Telemetry Redaction:</strong> Sensitive identifiers, secrets, and private keys are removed before queries reach third-party LLM APIs.
                </li>
                <li>
                  <strong className="text-zinc-200">Zero Retention:</strong> Our servers do not receive or retain your source code, project metadata, or LLM telemetry payloads.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                2. Information We Collect
              </h2>
              <p>
                To provide our services, we collect minimal data in the following categories:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-200">Account Credentials:</strong> If you sign up for an enterprise license or request a pilot, we collect your name, work email, and company name to manage authorization.
                </li>
                <li>
                  <strong className="text-zinc-200">Usage Analytics:</strong> On our website and cloud command portal, we collect anonymized, aggregated telemetry (such as page views and feature usage) to improve performance. This does not contain source code or API key data.
                </li>
                <li>
                  <strong className="text-zinc-200">Diagnostic Logs (Optional):</strong> If you opt-in to send crash reports from your local gateway instance, these logs are fully scrubbed of proprietary code before dispatch.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                3. How We Use Data
              </h2>
              <p>
                We use the limited data we collect to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Deliver, maintain, and upgrade the CodeGate software.</li>
                <li>Validate license status and coordinate pilot sandbox workspaces.</li>
                <li>Analyze aggregate website usage to optimize landing page performance.</li>
                <li>Respond to support tickets and secure communication requests.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                4. Third-Party Interactions & AI Providers
              </h2>
              <p>
                CodeGate integrates with third-party LLMs (e.g., OpenAI, Anthropic, Gemini) 
                chosen by your enterprise. While CodeGate actively sanitizes the traffic sending 
                to these endpoints:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Data transmitted to these providers is governed by your corporate agreements with them.</li>
                <li>CodeGate does not sell, rent, or trade your data to third parties for marketing purposes.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                5. Data Security and Safeguards
              </h2>
              <p>
                We employ robust defense-in-depth security measures to protect account information 
                stored in our portal. For local deployments, security relies on standard container 
                isolation practices. We recommend running CodeGate inside virtualized network environments 
                (VPCs) with restricted ingress.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                6. Changes to this Policy
              </h2>
              <p>
                We may revise this Privacy Policy from time to time. The date of the latest update 
                will always be reflected at the top of this page. We encourage you to review this policy 
                periodically.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                7. Contact
              </h2>
              <p>
                For questions regarding this policy or CodeGate's on-premises security controls, 
                please email us at <a href="mailto:hello@codegate.app" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">hello@codegate.app</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenDemo={openDemo} />
      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
}
