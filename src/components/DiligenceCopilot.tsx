import React, { useState, useRef, useEffect } from 'react';
import { StartupDossier } from '../types/ekyb';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface DiligenceCopilotProps {
  dossier: StartupDossier;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemma';
  text: string;
  timestamp: string;
}

export const DiligenceCopilot: React.FC<DiligenceCopilotProps> = ({ dossier }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'gemma',
      text: `Hello! I am your Gemma-Powered Due-Diligence Agent for **${dossier.name}** (${dossier.country}).\n\nI have cross-analyzed the company's official corporate registry filings (${dossier.extraction.registrySource}), multi-tier cap table down to natural person UBOs, and compliance health under national data laws.\n\nWhat cross-border diligence questions can I help you investigate today?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    `How does ${dossier.name} satisfy local data sovereignty laws?`,
    `Trace all ultimate beneficial owners and verify sanctions clearance.`,
    `Are there any red flags between declared capital and audited tax filings?`,
    `Analyze cross-border expansion risks to Singapore, Malaysia, or Vietnam.`,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ekyb/chat-diligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          contextDossier: dossier,
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `gemma-${Date.now()}`,
        sender: 'gemma',
        text: data.answer || 'Diligence query processed successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `gemma-${Date.now()}`,
        sender: 'gemma',
        text: 'Apologies, unable to complete query. Please check server status.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">AI Diligence Copilot</span>
            <span>·</span>
            <span>Gemma 2 9B On-Prem Legal Reasoner</span>
            <span>·</span>
            <span>Cross-Border Diligence Q&A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Multilingual Due-Diligence Copilot
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Query Gemma directly regarding tax treaties, cap table structures, foreign business caps, and data residency across ASEAN member states.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 px-3 py-1.5 rounded-lg shrink-0">
          <Building2 className="h-4 w-4 text-cyan-400" />
          <span>Active Context: {dossier.name}</span>
        </div>
      </div>

      {/* Suggested prompts strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-white whitespace-nowrap shrink-0 transition-all text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 flex flex-col h-[560px] overflow-hidden shadow-xl">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`mt-1.5 text-[10px] ${isUser ? 'text-cyan-200' : 'text-slate-500'} font-mono`}>
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="h-8 w-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                <RefreshCw className="h-4 w-4 animate-spin" />
              </div>
              <div className="rounded-2xl rounded-bl-none bg-slate-900 border border-slate-800 px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <span>Gemma is analyzing corporate filings & statutory frameworks...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-925">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask Gemma about ${dossier.name}'s regulatory, cap table, or cross-border compliance...`}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold transition-all shrink-0 active:scale-95"
            >
              <Send className="h-4 w-4" />
              <span>Ask Agent</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
