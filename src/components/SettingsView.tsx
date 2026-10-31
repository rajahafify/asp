import React, { useState, useEffect } from 'react';
import {
  Settings,
  Cpu,
  Key,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Check,
  Trash2,
  AlertCircle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemma-4');
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    connected: boolean;
    latencyMs?: number;
    model?: string;
    message?: string;
    keySource?: string;
  } | null>(null);

  // Load API key and selected model from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('asp_demo_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
    const savedModel = localStorage.getItem('asp_preferred_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('asp_demo_gemini_api_key', apiKey.trim());
      setIsSaved(true);
      setTestResult({
        connected: true,
        message: 'API Key saved locally for this demo session.',
      });
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('asp_demo_gemini_api_key');
    setApiKey('');
    setIsSaved(false);
    setTestResult(null);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem('asp_preferred_model', model);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const activeKey = apiKey.trim() || localStorage.getItem('asp_demo_gemini_api_key') || '';

    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(activeKey ? { 'x-gemini-api-key': activeKey } : {}),
        },
        body: JSON.stringify({
          model: selectedModel === 'gemma-4' ? 'gemma-4-26b-a4b-it' : selectedModel,
          apiKey: activeKey,
        }),
      });
      const data = await res.json();
      setTestResult(data);
      if (data.connected && activeKey) {
        setIsSaved(true);
        localStorage.setItem('asp_demo_gemini_api_key', activeKey);
      }
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
          <span>System & Model Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & AI Engine
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Configure Gemma 4, enter your demo API key directly on the website, and test live response latency.
        </p>
      </div>

      {/* DEMO MODE: DIRECT API KEY INPUT CARD */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Demo Mode: Add API Key Directly
                </h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  Demo Interactive
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enter your Google AI Studio Gemini / Gemma API key directly to run live eKYB verifications in this session.
              </p>
            </div>
          </div>

          {isSaved && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-xl">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Key Active</span>
            </span>
          )}
        </div>

        {/* Input box */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Google AI / Gemma API Key
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                }}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-xs font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-40"
            >
              Save Key
            </button>

            {apiKey && (
              <button
                type="button"
                onClick={handleClearKey}
                title="Clear key"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Your key is stored securely in your browser's local demo storage and passed to <code className="font-mono text-slate-700">/api/ekyb/verify-simple</code> via the <code className="font-mono text-slate-700">x-gemini-api-key</code> header for real-time model extraction.
          </p>
        </div>

        {/* Live Test Connection Action */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target Engine: <strong>Gemma 4</strong> (gemini-4-argon / gemini-3.8-flash)</span>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 active:scale-95 transition-all shadow-sm disabled:opacity-60"
          >
            {isTesting ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Pinging Gemma 4...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Test Live Gemma 4 Connection</span>
              </>
            )}
          </button>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl border text-xs font-mono transition-all ${
              testResult.connected
                ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                : 'border-rose-200 bg-rose-50/80 text-rose-900'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                {testResult.connected ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-rose-600" />}
                <span>{testResult.connected ? 'Gemma 4 Connected Successfully' : 'Connection Alert'}</span>
              </span>
              {testResult.latencyMs && <span>{testResult.latencyMs}ms</span>}
            </div>
            <p className="mt-1 text-[11px] font-sans leading-relaxed">
              {testResult.message}
            </p>
            {testResult.keySource && (
              <span className="mt-1 block text-[10px] text-slate-500 font-mono">
                Source: {testResult.keySource}
              </span>
            )}
          </div>
        )}
      </div>

      {/* AI MODEL SELECTOR */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Diligence Model Engine
              </h2>
              <p className="text-xs text-slate-500">
                Select the preferred model reasoning architecture for ASEAN eKYB verification.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 font-mono">
            Gemma 4 Default
          </span>
        </div>

        {/* Model Engine Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleModelChange('gemma-4')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedModel === 'gemma-4'
                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-100 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-slate-900">Gemma 4 (Regulatory Legal Engine)</span>
              {selectedModel === 'gemma-4' && <Check className="h-4 w-4 text-indigo-600" />}
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-1">
              gemma-4-26b-a4b-it
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Google Gemma high-reasoning legal engine optimized for cross-border ASEAN regulatory registries (SSM, ACRA, AHU, DBD, ERC), director IC biometric checks, and premises video liveness.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleModelChange('gemini-3.8-flash')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedModel === 'gemini-3.8-flash'
                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-100 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-slate-900">Gemini 3.8 Flash (Low Latency)</span>
              {selectedModel === 'gemini-3.8-flash' && <Check className="h-4 w-4 text-indigo-600" />}
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-1">
              gemini-3.8-flash
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ultra-fast inference engine suitable for quick demonstration runs and high-throughput real-time checks.
            </p>
          </button>
        </div>
      </div>

      {/* Regional Regulatory Compliance Benchmarks */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              ASEAN Cross-Border Trust Parameters
            </h2>
            <p className="text-xs text-slate-500">
              Harmonized data sovereignty and enterprise readiness thresholds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Primary Model</span>
            <span className="font-bold text-slate-900 block mt-0.5 font-mono">Gemma 4</span>
            <span className="text-emerald-600 text-[11px] font-semibold">Active & Pre-loaded</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Demo Mode API Key</span>
            <span className="font-bold text-slate-900 block mt-0.5 font-mono">
              {isSaved ? 'Configured (Active)' : 'Client / Env Fallback'}
            </span>
            <span className="text-slate-500 text-[11px]">Direct UI Entry</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Sovereignty Model</span>
            <span className="font-bold text-slate-900 block mt-0.5">ASEAN DEFA</span>
            <span className="text-slate-500 text-[11px]">Malaysia PDPA & Indonesia UU PDP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
