import React from 'react';

export const AspLogo: React.FC<{ className?: string; showTagline?: boolean }> = ({
  className = 'h-10',
  showTagline = true,
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 p-0.5 shadow-md shadow-indigo-500/25">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-white"
        >
          {/* Stylized ASP Delta Ribbon */}
          <path
            d="M8 28L18 8L28 28H21L18 20L15 28H8Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M18 8L24 20H12L18 8Z"
            fill="url(#asp_grad)"
            fillOpacity="0.4"
          />
          <defs>
            <linearGradient id="asp_grad" x1="18" y1="8" x2="18" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            ASP
          </span>
        </div>
        <span className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
          ASEAN Startup
        </span>
        <span className="text-xs font-bold text-slate-800 tracking-tight leading-none">
          Passport
        </span>
        {showTagline && (
          <span className="mt-1 text-[10px] text-slate-400 font-medium tracking-wide">
            Connect. Match. Grow.
          </span>
        )}
      </div>
    </div>
  );
};

export const CorporateLogoBadge: React.FC<{
  type: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ type, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10 w-16 text-xs',
    md: 'h-14 w-20 text-sm',
    lg: 'h-16 w-24 text-base',
  }[size];

  switch (type.toLowerCase()) {
    case 'nusantara':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-[#e6f4ea] px-3 font-bold text-[#137333] ${sizeClasses}`}>
          <span className="tracking-tight text-xs font-black font-sans uppercase">Nusantara</span>
        </div>
      );
    case 'greenventures':
      return (
        <div className={`flex items-center justify-center gap-1 rounded-xl bg-[#edf7ed] px-3 font-bold text-[#2e7d32] ${sizeClasses}`}>
          <span className="text-[11px] font-black tracking-tight uppercase">GreenVC</span>
        </div>
      );
    case 'pacificcare':
      return (
        <div className={`flex items-center justify-center gap-1 rounded-xl bg-[#e8f0fe] px-3 font-bold text-[#1a73e8] ${sizeClasses}`}>
          <span className="text-[11px] font-black tracking-tight">PacificCare</span>
        </div>
      );
    case 'vietagri':
      return (
        <div className={`flex items-center justify-center gap-1 rounded-xl bg-[#fef7e0] px-3 font-bold text-[#b06000] ${sizeClasses}`}>
          <span className="text-[11px] font-black tracking-tight">VietAgri</span>
        </div>
      );
    case 'grab':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-[#e8f8f0] px-3 font-bold text-[#00b14f] ${sizeClasses}`}>
          <span className="tracking-tight text-lg font-black font-sans">Grab</span>
        </div>
      );
    case 'dbs':
      return (
        <div className={`flex items-center justify-center gap-1.5 rounded-xl bg-[#fff1f1] px-3 font-bold text-[#e11d2a] ${sizeClasses}`}>
          <div className="h-4 w-4 rotate-45 bg-[#e11d2a]" />
          <span className="font-black tracking-tight text-slate-900">DBS</span>
        </div>
      );
    case 'petronas':
      return (
        <div className={`flex items-center justify-center gap-1 rounded-xl bg-[#e6f7f6] px-3 font-bold text-[#00a39d] ${sizeClasses}`}>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00a39d] text-white text-[10px]">
            P
          </div>
          <span className="text-xs font-extrabold text-[#00a39d]">PETRONAS</span>
        </div>
      );
    case 'cimb':
      return (
        <div className={`flex items-center justify-center gap-1.5 rounded-xl bg-[#fdf2f2] px-3 font-bold text-[#ee2737] ${sizeClasses}`}>
          <div className="h-4 w-4 rounded-sm bg-[#ee2737]" />
          <span className="font-extrabold tracking-tight text-slate-900 text-xs">CIMB</span>
        </div>
      );
    case 'goto':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-[#e6f8ea] px-3 font-bold text-[#00aa13] ${sizeClasses}`}>
          <span className="font-extrabold text-sm">go<span className="text-[#00aa13]">to</span></span>
        </div>
      );
    case 'kbank':
      return (
        <div className={`flex items-center justify-center rounded-xl bg-[#eaf7ee] px-3 font-bold text-[#138f2d] ${sizeClasses}`}>
          <span className="font-extrabold text-xs">KBank</span>
        </div>
      );
    default:
      return (
        <div className={`flex items-center justify-center rounded-xl bg-slate-100 px-3 font-bold text-slate-700 ${sizeClasses}`}>
          <span>{name.slice(0, 4)}</span>
        </div>
      );
  }
};
