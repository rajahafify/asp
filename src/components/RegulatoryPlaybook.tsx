import React from 'react';
import { useLanguage } from '../i18n';
import { ASEAN_REGISTRIES } from '../data/mockDossiers';
import { ShieldCheck, BookOpen, Scale, Globe2, FileText, CheckCircle2 } from 'lucide-react';

export const RegulatoryPlaybook: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span className="font-semibold text-cyan-400 uppercase tracking-wider">{t('ASEAN DEFA Compliance Guide')}</span>
          <span>·</span>
          <span>{t('Cross-Border Legal Matrix')}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Regional Regulatory Framework & Gemma Extraction Matrix
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          Why regulatory fragmentation is the primary tax on ASEAN cross-border deals, and how Gemma bridges Common Law (Singapore, Malaysia) and Civil Law (Indonesia, Thailand, Vietnam) jurisdictions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(ASEAN_REGISTRIES).map((reg) => (
          <div key={reg.countryCode} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{reg.flag}</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{reg.countryName}</h3>
                  <span className="text-[11px] font-mono text-cyan-400">{reg.registryAcronym}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {reg.primaryLanguage}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Registry
                </span>
                <span className="text-slate-200">{reg.registryName}</span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Core Filings Parsed by Gemma
                </span>
                <ul className="mt-1 space-y-1 text-slate-300 list-disc list-inside">
                  {reg.coreDocuments.map((doc, idx) => (
                    <li key={idx} className="text-[11px] truncate">{doc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Foreign Equity Cap / Rule
                </span>
                <span className="text-slate-300 text-[11px] block">{reg.foreignOwnershipCapDefault}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Data Sovereignty Statute
                </span>
                <span className="text-emerald-400 text-[11px] font-mono">{reg.dataSovereigntyLaw}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Scale className="h-5 w-5 text-cyan-400" />
          The Gemma Unfair Advantage for ASEAN eKYB
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60">
            <span className="font-semibold text-white block mb-1">1. Data Sovereignty via Local VPC</span>
            <p className="text-slate-400">
              Unlike public US-based APIs that violate Vietnam Decree 13 and Indonesia UU PDP, Gemma models can be self-hosted on regional VPCs (Singapore, Jakarta, Kuala Lumpur) so sensitive director passports and financial statements never cross legal borders.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60">
            <span className="font-semibold text-white block mb-1">2. Multilingual Token Density</span>
            <p className="text-slate-400">
              Gemma handles complex script nuances—such as Thai shareholder rolls (บอจ. 5), Vietnamese diacritics in ERC forms, and Indonesian notarial Akta legalese mixed with English terminology—without layout degradation.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60">
            <span className="font-semibold text-white block mb-1">3. W3C Portable Verifiable Proofs</span>
            <p className="text-slate-400">
              Transforms weeks of manual notary translations into a single cryptographically verifiable credential accepted across regional banking partners and institutional VCs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
