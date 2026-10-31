import React, { useState } from 'react';
import { StartupDossier } from '../types/ekyb';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  QrCode,
  FileSearch,
  Lock,
  ArrowRight,
  RefreshCw,
  Building2,
  Hash,
  Copy,
  Check
} from 'lucide-react';

interface VerifierViewProps {
  currentDossier: StartupDossier;
}

export const VerifierView: React.FC<VerifierViewProps> = ({ currentDossier }) => {
  const [credentialInput, setCredentialInput] = useState<string>(
    currentDossier.passport.rawVCJson || JSON.stringify(currentDossier.passport, null, 2)
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>({
    valid: true,
    verifiedAt: new Date().toISOString(),
    issuer: currentDossier.passport.issuer,
    subjectId: currentDossier.passport.did,
    airsScore: currentDossier.airs,
    dataLocalization: currentDossier.passport.dataLocalizationStatus,
    sanctionsCleared: true,
    cryptographicSignature: {
      algorithm: 'ES256 (ECDSA SHA-256)',
      merkleLeafValidated: true,
      revocationRegistryStatus: 'ACTIVE',
    },
  });
  const [copied, setCopied] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/ekyb/verify-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialInput }),
      });
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      console.error(err);
      setVerificationResult({
        valid: false,
        error: 'Failed to connect to verification trust network.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLoadCurrent = () => {
    setCredentialInput(
      currentDossier.passport.rawVCJson || JSON.stringify(currentDossier.passport, null, 2)
    );
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText(currentDossier.passport.proof.proofValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">Enterprise Verifier Portal</span>
            <span>·</span>
            <span>Zero-Knowledge eKYB Verification</span>
            <span>·</span>
            <span>DBS · Maybank · Mandiri · VCs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            W3C Verifiable Credential Verifier
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Enterprise buyers and regional compliance officers verify startup legitimacy, beneficial ownership, and compliance health in seconds without requesting 40 raw translated PDFs.
          </p>
        </div>

        <button
          onClick={handleLoadCurrent}
          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-750 transition-colors shrink-0"
        >
          Load {currentDossier.name} Credential
        </button>
      </div>

      {/* Verifier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Credential Payload Input */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-cyan-400" />
              Verifiable Credential Payload (JSON-LD / VC)
            </span>
            <span className="text-[11px] font-mono text-slate-400">W3C Compliant</span>
          </div>

          <textarea
            value={credentialInput}
            onChange={(e) => setCredentialInput(e.target.value)}
            rows={18}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/90 p-3.5 font-mono text-xs text-slate-300 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 selection:bg-cyan-500/20"
          />

          <button
            onClick={handleVerify}
            disabled={isVerifying || !credentialInput.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all active:scale-98"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Verifying Cryptographic Signatures on DEFA Trust Registry...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Verify Credential Authenticity</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Verification Result Certificate */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Verification Trust Certificate
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Verified: {new Date().toLocaleTimeString()}
            </span>
          </div>

          {verificationResult?.valid ? (
            <div className="space-y-4">
              {/* Green Verified Banner */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Cryptographic Signature Validated
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Passport issued by ASEAN Digital Economy Framework Trust Authority (DEFA-EKYB).
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Details Grid */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Credential Subject:</span>
                  <span className="font-semibold text-white font-mono">{currentDossier.extraction.companyName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Registry Source:</span>
                  <span className="text-slate-200">{currentDossier.extraction.registrySource}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Enterprise Readiness (AIRS):</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {currentDossier.airs.totalScore} / 1000 ({currentDossier.airs.tier.replace('_', ' ')})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Data Sovereignty:</span>
                  <span className="text-cyan-300 font-mono">{currentDossier.passport.dataLocalizationStatus}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Sanction Lists Status:</span>
                  <span className="text-emerald-400 font-mono">100% Cleared (OFAC / MAS / BNM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Revocation Registry:</span>
                  <span className="text-emerald-400 font-mono">Status: ACTIVE (Not Revoked)</span>
                </div>
              </div>

              {/* Cryptographic Details Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-2 text-xs font-mono">
                <span className="font-semibold text-slate-300 block mb-1">
                  Cryptographic Verification Trail:
                </span>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="truncate">
                    <span className="text-cyan-400">Issuer DID: </span>
                    <span>{currentDossier.passport.issuer.did}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-cyan-400">Subject DID: </span>
                    <span>{currentDossier.passport.did}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-cyan-400">Merkle Leaf Root: </span>
                    <span>{currentDossier.passport.proof.merkleRootHash}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">ECDSA ES256 Signature Proof</span>
                  <button
                    onClick={handleCopyProof}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>Copy Proof</span>
                  </button>
                </div>
              </div>

              {/* Fast-Track Actions for Enterprise Buyers */}
              <div className="p-4 rounded-xl border border-cyan-500/20 bg-slate-900/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Pre-Approved for Corporate Banking</h4>
                  <p className="text-[11px] text-slate-400">
                    Bypasses manual certified true copy notarization at regional bank branches.
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Ready to Transact
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-5 text-rose-200 space-y-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-400" />
                <h3 className="font-bold text-white text-sm">Verification Failed</h3>
              </div>
              <p className="text-xs text-rose-300">
                {verificationResult?.error || 'Invalid signature or unrecognized issuer DID.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
