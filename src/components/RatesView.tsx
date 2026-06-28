import React, { useState } from 'react';
import { Calculator, DollarSign, ArrowRight, CheckCircle2, Truck, Plane, Anchor, Train, Flame, Snowflake, ShieldCheck } from 'lucide-react';
import { TransportMode, RateQuoteResponse } from '../types';

export const RatesView: React.FC = () => {
  const [origin, setOrigin] = useState('Shanghai (SHA)');
  const [destination, setDestination] = useState('Los Angeles (LAX)');
  const [mode, setMode] = useState<TransportMode>('ocean');
  const [weightKg, setWeightKg] = useState(15000);
  const [isHazmat, setIsHazmat] = useState(false);
  const [requiresRefrigeration, setRequiresRefrigeration] = useState(false);
  const [urgency, setUrgency] = useState<'standard' | 'express' | 'guaranteed'>('standard');
  const [quote, setQuote] = useState<RateQuoteResponse | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      let baseRatePerKg = mode === 'air' ? 4.5 : mode === 'road' ? 1.8 : mode === 'rail' ? 1.2 : 0.6;
      if (urgency === 'express') baseRatePerKg *= 1.4;
      if (urgency === 'guaranteed') baseRatePerKg *= 1.8;

      const baseFreight = Math.round(weightKg * baseRatePerKg);
      const fuelSurcharge = Math.round(baseFreight * 0.18);
      const customsFees = 450;
      const insurance = Math.round(baseFreight * 0.05);
      const specialHandling = (isHazmat ? 850 : 0) + (requiresRefrigeration ? 1200 : 0);

      const total = baseFreight + fuelSurcharge + customsFees + insurance + specialHandling;
      const transitDays = mode === 'air' ? 2 : mode === 'road' ? 4 : mode === 'rail' ? 9 : 22;

      setQuote({
        quoteId: `MO$-QT-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedCostUsd: total,
        transitTimeDays: urgency === 'guaranteed' ? Math.max(1, transitDays - 1) : transitDays,
        carbonEmissionsKg: Math.round(weightKg * (mode === 'air' ? 1.2 : mode === 'road' ? 0.35 : 0.08)),
        breakdown: {
          baseFreight,
          fuelSurcharge,
          customsFees,
          insurance,
          specialHandling
        },
        recommendedRoute: [origin, mode === 'ocean' ? 'Deepwater Port Berth' : 'Express Cargo Hub', destination]
      });
      setCalculating(false);
    }, 400);
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      <div className="glass rounded-2xl p-8 border border-amber-500/30 bg-gradient-to-br from-[#0c0f1d] via-[#141a30] to-[#080b12] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase">
            <Calculator className="w-3.5 h-3.5 mr-1 text-amber-400" />
            MO$ MAKIN L.L.C. • INSTANT PRICING GRID
          </div>
          <h1 className="text-3xl font-light text-white">Algorithmic Rate Quoter</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Generate spot tariffs and guaranteed freight contracts with live bunker fuel indexing and automated insurance calculation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quote Parameters Input */}
        <div className="lg:col-span-7 glass rounded-2xl p-6 border border-white/10 space-y-5 shadow-xl">
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3 flex justify-between items-center">
            <span>Freight Parameters</span>
            <span className="text-xs text-emerald-400">SPOT MARKET LIVE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Origin Hub</label>
              <input
                type="text"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Destination Gateway</label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Transport Mode Strategy</label>
            <div className="grid grid-cols-4 gap-2">
              {(['ocean', 'air', 'road', 'rail'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex flex-col items-center justify-center cursor-pointer ${
                    mode === m ? 'bg-amber-400 text-black shadow glow-amber font-extrabold' : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {m === 'ocean' && <Anchor className="w-4 h-4 mb-1" />}
                  {m === 'air' && <Plane className="w-4 h-4 mb-1" />}
                  {m === 'road' && <Truck className="w-4 h-4 mb-1" />}
                  {m === 'rail' && <Train className="w-4 h-4 mb-1" />}
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Total Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={e => setWeightKg(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Service Urgency</label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 focus:outline-none cursor-pointer"
              >
                <option value="standard">Standard Dispatch</option>
                <option value="express">Priority Express (+40%)</option>
                <option value="guaranteed">Guaranteed Berth (+80%)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 text-xs font-mono cursor-pointer bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10">
              <input type="checkbox" checked={isHazmat} onChange={e => setIsHazmat(e.target.checked)} className="rounded text-amber-400" />
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Hazmat Certification</span>
            </label>
            <label className="flex items-center space-x-2 text-xs font-mono cursor-pointer bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10">
              <input type="checkbox" checked={requiresRefrigeration} onChange={e => setRequiresRefrigeration(e.target.checked)} className="rounded text-amber-400" />
              <Snowflake className="w-4 h-4 text-sky-400" />
              <span>Reefer Cold Chain</span>
            </label>
          </div>

          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full mt-4 py-3.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 hover:opacity-90 text-black font-extrabold text-xs uppercase font-mono tracking-wider rounded-xl glow-emerald cursor-pointer transition-all shadow-lg active:scale-95"
          >
            {calculating ? 'Indexing Global Tariffs...' : 'Generate Spot Market Quote'}
          </button>
        </div>

        {/* Quote Breakdown Display */}
        <div className="lg:col-span-5 glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl">
          {quote ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">OFFICIAL CONTRACT TARIFF</span>
                  <div className="text-3xl font-extrabold text-white font-mono">{formatUSD(quote.estimatedCostUsd)}</div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 block">TRANSIT DURATION</span>
                  <span className="text-lg font-bold text-emerald-400">{quote.transitTimeDays} Days Door-to-Door</span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider mb-2">Cost Components</div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Base Freight Tariff:</span>
                  <span className="text-white font-bold">{formatUSD(quote.breakdown.baseFreight)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Bunker Fuel Surcharge (18%):</span>
                  <span className="text-white font-bold">{formatUSD(quote.breakdown.fuelSurcharge)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Port & Customs Clearance:</span>
                  <span className="text-white font-bold">{formatUSD(quote.breakdown.customsFees)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Master Cargo Insurance:</span>
                  <span className="text-white font-bold">{formatUSD(quote.breakdown.insurance)}</span>
                </div>
                {quote.breakdown.specialHandling > 0 && (
                  <div className="flex justify-between py-1 border-b border-white/5 text-amber-300">
                    <span>Special Handling (Hazmat/Reefer):</span>
                    <span className="font-bold">{formatUSD(quote.breakdown.specialHandling)}</span>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>MO$ MAKIN Price Guarantee: Locked for 48 hours. ESG Carbon Offset: {quote.carbonEmissionsKg}kg CO2.</span>
              </div>

              <button className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase font-mono rounded-xl glow-emerald cursor-pointer transition-all">
                Accept Quote & Proceed to Dispatch
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3 min-h-[300px]">
              <DollarSign className="w-12 h-12 text-slate-600 animate-pulse" />
              <div className="text-sm font-semibold text-slate-300">Configure parameters to generate instant spot quote.</div>
              <p className="text-xs max-w-xs leading-relaxed">Quotes include Lloyd's maritime insurance and automated fuel surcharge adjustment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
