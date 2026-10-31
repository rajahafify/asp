import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { StartupDossier } from '../types/ekyb';
import { X, Copy, Check, Code2, Download } from 'lucide-react';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: StartupDossier;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({ isOpen, onClose, dossier }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonContent = dossier.passport.rawVCJson || JSON.stringify(dossier.passport, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dossier.passport.passportNumber}_W3C_VC.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{t('W3C Verifiable Credential (VC) JSON-LD')}</h3>
              <p className="text-xs text-slate-400">{dossier.passport.did}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-xs font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t('Download')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs text-cyan-200/90 leading-relaxed">
          <pre className="select-text whitespace-pre-wrap">{jsonContent}</pre>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>{t('Schema: https://asean.org/trust/ekyb/v1')}</span>
          <span>Signature: ES256 (ECDSA SHA-256)</span>
        </div>
      </div>
    </div>
  );
};
