"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DemoModal from "../components/DemoModal";
import NoiseTexture from "../components/NoiseTexture";
import CursorGlow from "../components/CursorGlow";

export default function TermsOfService() {
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
              Legal Framework
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-500 font-mono">
              Last Updated: June 19, 2026
            </p>
          </div>

          {/* Terms content */}
          <div className="space-y-10 text-zinc-300 text-sm leading-relaxed font-light">
            <p>
              Welcome to CodeGate. Please read these Terms of Service (“Terms”) carefully before 
              downloading, installing, or interacting with the CodeGate local gateway, website, 
              or CLI tools. By using our software or services, you agree to be bound by these 
              Terms. If you are entering into these terms on behalf of a company, you represent 
              that you have the authority to bind that entity.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                1. Description of Services
              </h2>
              <p>
                CodeGate provides an on-premises Application Security (AppSec) gateway proxy designed to 
                intercept developer queries sent to AI models, redact sensitive credentials, audit 
                payloads for malicious code injections, and intercept zero-day exploits.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                2. Software License and Deployment
              </h2>
              <p>
                Subject to compliance with these Terms and payment of any applicable licensing fees:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-200">License Grant:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to deploy, run, and interact with the CodeGate binary/container solely within your internal corporate networks or private cloud infrastructure.
                </li>
                <li>
                  <strong className="text-zinc-200">Restrictions:</strong> You shall not reverse engineer, decompile, modify, or distribute the CodeGate proprietary scanner logic, threat intelligence rulesets, or metadata filters without written consent.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                3. Customer Code Ownership & Intellectual Property
              </h2>
              <p>
                CodeGate operates on an on-premises model to ensure total code sovereignty:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-200">Your Code is Yours:</strong> CodeGate does not claim any ownership rights over your source code, configuration files, prompts, LLM responses, or telemetry. All remains your sole intellectual property.
                </li>
                <li>
                  <strong className="text-zinc-200">Threat Signatures:</strong> CodeGate retains all rights and titles to the core scanning engine, signature definitions, threat indicators, and product documentation developed by us.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                4. Acceptable Use Policy
              </h2>
              <p>
                You agree not to use CodeGate to build competitive code security tools, bypass 
                enterprise access controls, or intentionally inject malicious data or payloads to 
                harm our central infrastructure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                5. AppSec Disclaimer (Defense in Depth)
              </h2>
              <p>
                CodeGate is designed to actively protect your agentic workflows against 
                unauthorized data extraction and malicious code injection:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>
                  CodeGate is a security layer and should be deployed as part of a comprehensive 
                  multi-tiered defense-in-depth framework.
                </li>
                <li>
                  While CodeGate drastically reduces exposure, we do not warrant that the software 
                  is completely error-free or that it will neutralize 100% of all potential security threats 
                  or zero-day exploits.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                6. Warranties and Limitation of Liability
              </h2>
              <p>
                THE CODEGATE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EITHER 
                EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CODEGATE BE LIABLE FOR ANY INDIRECT, SPECIAL, 
                INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF PROFITS, DATA LOSS, 
                OR WORK STOPPAGE) ARISING OUT OF THE USE OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                OUR TOTAL CUMULATIVE LIABILITY UNDER THESE TERMS OR IN CONNECTION WITH THE SOFTWARE SHALL NOT EXCEED THE TOTAL FEES ACTUALLY 
                PAID BY YOU TO CODEGATE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM (OR $100 USD, WHICHEVER IS GREATER).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                7. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your license key and access to our portal 
                if we determine that you have violated these Terms or breached licensing agreements. 
                Upon termination, you must destroy or remove all deployed instances of the CodeGate software.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                8. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of 
                Canada, without regard to conflicts of law principles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                9. Contact
              </h2>
              <p>
                If you have questions regarding these Terms or licensing structures, please contact 
                us at <a href="mailto:hello@codegate.app" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">hello@codegate.app</a>.
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
