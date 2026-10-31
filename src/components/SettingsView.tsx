import React, { useState } from 'react';
import {
  Settings,
  Cpu,
  Key,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Server,
  Lock,
  Globe2,
  Check
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'gemini-4-argon' | 'gemini-3.8-flash'>('gemini-4-argon');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    connected: boolean;
    latencyMs?: number;
    model?: string;
    message?: string;
  } | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: selectedModel }),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        connected: false,
        message: err?.message || 'Server connection failed',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* View Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
          <Settings className="h-4 w-4" />
          <span>System & Security Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Configure your AI model engines, API credentials, and ASEAN eKYB compliance settings.
        </p>
      </div>

      {/* AI Model & BYOK API Key Panel */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Diligence Model Engine (Gemini 4 / Gemma)
              </h2>
              <p className="text-xs text-slate-500">
                Select the primary reasoning model for multilingual document extraction and verification.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 font-mono">
            Active
          </span>
        </div>

        {/* Model Engine Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-4-argon')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedModel === 'gemini-4-argon'
                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-100 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-slate-900">Gemini 4 / Gemma Legal</span>
              {selectedModel === 'gemini-4-argon' && <Check className="h-4 w-4 text-indigo-600" />}
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-1">
              gemini-4-argon
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-reasoning model optimized for complex multilingual statutory documents, notarial deeds, and cap table unrolling.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedModel('gemini-3.8-flash')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedModel === 'gemini-3.8-flash'
                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-100 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-slate-900">Gemini 3.8 Flash</span>
              {selectedModel === 'gemini-3.8-flash' && <Check className="h-4 w-4 text-indigo-600" />}
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-1">
              gemini-3.8-flash
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ultra-fast inference engine for low-latency identity card verification and real-time validation checks.
            </p>
          </button>
        </div>

        {/* API Key Security Notice & Secrets Management */}
        <div className="rounded-2xl border border-indigo-100 bg-slate-50 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900">
                API Key Configuration (Bring Your Own Key / Secrets)
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Configured via Secrets</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your Google AI Gemini API key is securely managed on the backend through the platform's Secrets panel (<span className="font-semibold text-slate-800">Settings &gt; Secrets</span>). This keeps your production credentials safe from browser exposure while powering server-side eKYB extraction.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 text-xs">
            <span className="font-mono text-slate-500 text-[11px]">
              Active Env Var: <span className="font-bold text-slate-700">process.env.GEMINI_API_KEY</span>
            </span>

            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-60"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Test Connection & Latency</span>
                </>
              )}
            </button>
          </div>

          {/* Test Result Display */}
          {testResult && (
            <div
              className={`mt-2 p-3 rounded-xl border text-xs font-mono ${
                testResult.connected
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-rose-200 bg-rose-50 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  {testResult.connected ? '✓ API Connected Successfully' : '✕ Connection Warning'}
                </span>
                {testResult.latencyMs && (
                  <span>Latency: {testResult.latencyMs}ms</span>
                )}
              </div>
              <p className="mt-1 text-[11px] font-sans">
                {testResult.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compliance & Data Sovereignty Settings */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              eKYB Diligence & Regional Localization
            </h2>
            <p className="text-xs text-slate-500">
              Cross-border enterprise readiness benchmarks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Primary Hosting Region</span>
            <span className="font-bold text-slate-900 block mt-0.5 font-mono">asia-southeast1</span>
            <span className="text-slate-500 text-[11px]">Singapore & Malaysia VPC</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Biometric Match Threshold</span>
            <span className="font-bold text-slate-900 block mt-0.5 font-mono">95.0% Required</span>
            <span className="text-emerald-600 text-[11px] font-semibold">Strict Liveness</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Data Privacy Framework</span>
            <span className="font-bold text-slate-900 block mt-0.5">ASEAN DEFA Model</span>
            <span className="text-slate-500 text-[11px]">PDPA & Decree 13 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
