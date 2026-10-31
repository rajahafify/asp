import React from 'react';
import { StartupDossier } from '../types/ekyb';
import { SAMPLE_DOSSIERS, ASEAN_REGISTRIES } from '../data/mockDossiers';
import { Building2, Globe2, ShieldCheck, CheckCircle2, PlusCircle } from 'lucide-react';

interface DossierSelectorProps {
  currentDossier: StartupDossier;
  onSelectDossier: (dossier: StartupDossier) => void;
  onOpenSandbox: () => void;
  isCustomActive?: boolean;
}

export const DossierSelector: React.FC<DossierSelectorProps> = ({
  currentDossier,
  onSelectDossier,
  onOpenSandbox,
  isCustomActive = false,
}) => {
  const currentRegistry = ASEAN_REGISTRIES[currentDossier.country];

  return (
    <div className="w-full border-b border-slate-800 bg-slate-900/60 py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Dossier switch chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" />
              Startup Dossier:
            </span>
            {SAMPLE_DOSSIERS.map((dossier) => {
              const reg = ASEAN_REGISTRIES[dossier.country];
              const isSelected = !isCustomActive && currentDossier.id === dossier.id;

              return (
                <button
                  key={dossier.id}
                  onClick={() => onSelectDossier(dossier)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 shadow-sm shadow-cyan-950'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-base leading-none">{reg.flag}</span>
                  <span className="font-semibold">{dossier.name}</span>
                  <span className="text-slate-400 text-[11px] font-mono">({reg.registryAcronym})</span>
                </button>
              );
            })}

            <button
              onClick={onOpenSandbox}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 border ${
                isCustomActive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-800/80 border-dashed border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-300'
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Custom Ingestion Sandbox</span>
            </button>
          </div>

          {/* Quick country compliance status summary */}
          <div className="flex items-center gap-3 text-xs text-slate-300 self-start lg:self-auto shrink-0">
            <div className="flex items-center gap-1.5 font-mono text-cyan-400">
              <Globe2 className="h-3.5 w-3.5" />
              <span>{currentRegistry?.countryName}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{currentRegistry?.registryAcronym}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>AIRS {currentDossier.airs.totalScore}</span>
              <span className="text-slate-500">/1000</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>Sanctions Cleared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
