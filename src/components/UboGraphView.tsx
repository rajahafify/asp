import React, { useState } from 'react';
import { StartupDossier, ShareholderNode } from '../types/ekyb';
import { ASEAN_REGISTRIES } from '../data/mockDossiers';
import {
  Network,
  UserCheck,
  Building2,
  ShieldCheck,
  Globe,
  PieChart,
  CheckCircle2,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';

interface UboGraphViewProps {
  dossier: StartupDossier;
}

export const UboGraphView: React.FC<UboGraphViewProps> = ({ dossier }) => {
  const [selectedNode, setSelectedNode] = useState<ShareholderNode>(dossier.uboTree);
  const registry = ASEAN_REGISTRIES[dossier.country];

  // Flatten nodes for quick list selection
  const allNodes: ShareholderNode[] = [];
  function collectNodes(node: ShareholderNode) {
    allNodes.push(node);
    if (node.children) {
      node.children.forEach(collectNodes);
    }
  }
  collectNodes(dossier.uboTree);

  // Compute total foreign equity ratio
  const foreignRatio = dossier.passport.foreignEquityRatio;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-cyan-400 uppercase tracking-wider">Cap Table Diligence</span>
            <span>·</span>
            <span>UBO Unrolling</span>
            <span>·</span>
            <span>Sanctions & PEP Screening</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Beneficial Ownership & Cap Table Architecture
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Gemma recursively unrolls multi-tier corporate shareholding chains (Singapore HoldCos, Cayman funds, nominee structures) down to natural person beneficial controllers.
          </p>
        </div>

        {/* Foreign Equity Stat */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 shrink-0">
          <Scale className="h-5 w-5 text-cyan-400" />
          <div className="text-right">
            <span className="block text-[11px] text-slate-400">Foreign Equity Ratio</span>
            <span className="text-base font-bold text-white font-mono">{foreignRatio}% Foreign</span>
          </div>
        </div>
      </div>

      {/* Regulatory Foreign Ownership Cap Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">
              {registry.countryName} Statutory Foreign Ownership Framework:
            </span>
            <span className="text-slate-300">{registry.foreignOwnershipCapDefault}</span>
          </div>
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Statutory Cap Satisfied
          </span>
        </div>
      </div>

      {/* Graph & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Visual Multi-Tier Tree (Left 2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Network className="h-4 w-4 text-cyan-400" />
              Hierarchical Ownership Tree
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Click any node to inspect diligence records
            </span>
          </div>

          {/* Tier 0: Operating Entity */}
          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tier 0: Operating Entity (Target of Due Diligence)
            </div>
            <button
              onClick={() => setSelectedNode(dossier.uboTree)}
              className={`w-full text-left rounded-xl p-4 transition-all border ${
                selectedNode.id === dossier.uboTree.id
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{dossier.uboTree.name}</h3>
                    <p className="text-xs text-slate-400">{dossier.uboTree.jurisdiction}</p>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-cyan-300">100% Equity</span>
                  <span className="block text-[10px] text-emerald-400">Sanctions Cleared</span>
                </div>
              </div>
            </button>

            {/* Connecting Line Downward */}
            <div className="flex justify-center">
              <div className="h-6 w-0.5 bg-slate-800" />
            </div>

            {/* Tier 1: Direct Shareholders */}
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tier 1: Direct Registered Shareholders
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dossier.uboTree.children?.map((child) => {
                const isSelected = selectedNode.id === child.id;
                const isPerson = child.type === 'natural_person';
                const hasSub = (child.children?.length ?? 0) > 0;

                return (
                  <button
                    key={child.id}
                    onClick={() => setSelectedNode(child)}
                    className={`text-left rounded-xl p-3.5 transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="p-1.5 rounded-md bg-slate-800 text-slate-300">
                          {isPerson ? <UserCheck className="h-4 w-4 text-emerald-400" /> : <Building2 className="h-4 w-4 text-cyan-400" />}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-100">
                          {child.ownershipPercentage}%
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-white line-clamp-1">{child.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{child.jurisdiction}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-400 font-mono">Sanctions: Cleared</span>
                      {hasSub && (
                        <span className="text-cyan-400 flex items-center gap-0.5">
                          <span>Unroll</span>
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tier 2 & 3: Intermediate HoldCo Unrolling */}
            {dossier.uboTree.children?.some((c) => (c.children?.length ?? 0) > 0) && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-slate-800" />
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Tier 2 & 3: Unrolled Intermediate Holding Entities & Natural Person UBOs
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dossier.uboTree.children
                    ?.filter((c) => (c.children?.length ?? 0) > 0)
                    .flatMap((parent) =>
                      parent.children?.map((sub) => {
                        const isSelected = selectedNode.id === sub.id;
                        const isPerson = sub.type === 'natural_person';

                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedNode(sub)}
                            className={`text-left rounded-xl p-3.5 transition-all border ${
                              isSelected
                                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950'
                                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="p-1 rounded bg-slate-800 text-slate-300">
                                {isPerson ? <UserCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Building2 className="h-3.5 w-3.5 text-cyan-400" />}
                              </span>
                              <div className="text-right font-mono">
                                <span className="text-xs font-bold text-emerald-400">
                                  {sub.ownershipPercentage}% Effective
                                </span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-xs text-white">{sub.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{sub.jurisdiction}</p>
                            {sub.notes && (
                              <p className="mt-1.5 text-[10px] text-slate-400 italic line-clamp-2">
                                {sub.notes}
                              </p>
                            )}
                          </button>
                        );
                      })
                    )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Node Inspector Panel (Right 1 col) */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Node Diligence Profile
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-cyan-400">
                {selectedNode.type.replace('_', ' ')}
              </span>
              {selectedNode.isUBO && (
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">
                  Declared UBO
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              {selectedNode.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Jurisdiction: {selectedNode.jurisdiction}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[11px] block">Equity Percentage</span>
              <span className="text-sm font-bold text-white">{selectedNode.ownershipPercentage}%</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Voting Rights</span>
              <span className="text-sm font-bold text-white">{selectedNode.votingRightsPercentage}%</span>
            </div>
          </div>

          {selectedNode.tinOrRegistration && (
            <div className="text-xs font-mono">
              <span className="text-slate-400 text-[11px] block">Tax ID / NRIC / UEN</span>
              <span className="text-slate-200">{selectedNode.tinOrRegistration}</span>
            </div>
          )}

          {/* Sanctions & PEP Check Box */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Watchlist Screening</span>
              <span className="text-emerald-400 font-mono text-[11px]">CLEARED</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>OFAC Specially Designated Nationals</span>
                <span className="text-emerald-400">✓ No Hit</span>
              </div>
              <div className="flex justify-between">
                <span>MAS Enforcement & Sanctions List</span>
                <span className="text-emerald-400">✓ No Hit</span>
              </div>
              <div className="flex justify-between">
                <span>Bank Negara Malaysia PEP Register</span>
                <span className="text-emerald-400">✓ No Hit</span>
              </div>
            </div>
          </div>

          {selectedNode.notes && (
            <div className="text-xs text-slate-400 bg-slate-900/40 p-3 rounded-lg border border-slate-850">
              <span className="font-semibold text-slate-300 block mb-1">Diligence Notes:</span>
              <p className="leading-relaxed">{selectedNode.notes}</p>
            </div>
          )}

          {/* Cap Table Breakdown Summary */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs">
            <span className="font-semibold text-slate-300 block mb-2 flex items-center gap-1.5">
              <PieChart className="h-3.5 w-3.5 text-cyan-400" />
              Direct Cap Table Distribution
            </span>
            <div className="space-y-1.5">
              {dossier.extraction.shareholders.map((sh, idx) => (
                <div key={idx} className="flex justify-between text-[11px] text-slate-300">
                  <span className="truncate max-w-[150px]">{sh.name}</span>
                  <span className="font-mono text-cyan-300">{sh.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
