import React, { useState } from 'react';
import { Sparkles, Cpu, CheckCircle2, ShieldAlert, ArrowRight, DollarSign, Clock, Leaf } from 'lucide-react';
import { AIOptimizedRouteOption, TransportMode } from '../types';

export const OptimizerView: React.FC = () => {
  const [origin, setOrigin] = useState('Shanghai Megaport (SHA)');
  const [destination, setDestination] = useState('Rotterdam Gateway (RTM)');
  const [cargo, setCargo] = useState('Lithium Battery Power Units (40ft High Cube)');
  const [weightKg, setWeightKg] = useState<number>(24000);
  const [mode, setMode] = useState<TransportMode>('ocean');
  const [priority, setPriority] = useState<'speed' | 'cost' | 'eco' | 'balanced'>('balanced');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ analysisSummary: string; options: AIOptimizedRouteOption[] } | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/optimize-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          cargoDescription: cargo,
          weightKg,
          mode,
          priority
        })
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          analysisSummary: data.analysisSummary,
          options: data.options
        });
      }
    } catch (err) {
      console.error('Failed optimization query:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      {/* Header Banner */}
      <div className="glass rounded-2xl p-8 border border-emerald-500/30 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#06120b] via-[#091f13] to-[#040e09]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              MO$ MAKIN L.L.C. • NEURAL REVENUE ENGINE
            </div>
            <h1 className="text-3xl font-light text-white">AI Multi-Corridor Optimizer</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
              Synthesize geopolitical risks, real-time spot tariffs, and automated yield algorithms. Powered by server-side Gemini 3.5.
            </p>
          </div>
        </div>
      </div>

      {/* Dispatch Simulation Form */}
      <div className="glass rounded-2xl p-6 border border-emerald-500/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#050e0a]/80">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Origin Hub / Terminal</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Destination Gateway</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Cargo Description</label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Yield Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 focus:outline-none cursor-pointer"
          >
            <option value="balanced">⚖️ BALANCED MARGIN</option>
            <option value="speed">⚡ ULTRA SPEED (EXPRESS)</option>
            <option value="cost">💰 MAX CASHFLOW (LOWEST COST)</option>
            <option value="eco">🌱 LOW CO2 (ESG COMPLIANT)</option>
          </select>
        </div>

        <div className="col-span-full pt-2 flex justify-end">
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 hover:opacity-95 text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg glow-emerald transition-all active:scale-95 cursor-pointer flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-black" />
                <span>Simulating Neural Corridor Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Run Neural Dispatch Strategy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Output */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="glass p-5 rounded-2xl border border-emerald-500/40 bg-[#06120b] text-sm text-emerald-200 flex items-start space-x-3 shadow-xl">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white uppercase text-xs font-mono block mb-1">Executive Dispatch Synthesis:</span>
              <p className="leading-relaxed text-xs sm:text-sm font-sans">{result.analysisSummary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.options.map((opt, i) => (
              <div
                key={opt.id}
                className={`glass glass-hover rounded-2xl p-6 border flex flex-col justify-between relative overflow-hidden transition-all shadow-2xl bg-[#050e0a] ${
                  i === 0 ? 'border-amber-400/60 glow-amber bg-amber-950/10' : 'border-white/10 hover:border-emerald-500/40'
                }`}
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 bg-amber-400 text-black font-extrabold text-[10px] uppercase font-mono px-3 py-1 rounded-bl-xl shadow">
                    ⭐ RECOMMENDED YIELD
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-white mb-2 pr-16 font-sans">{opt.title}</h3>
                  <p className="text-xs text-slate-300 min-h-[40px] leading-relaxed mb-4 font-sans">{opt.modeStrategy}</p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/5 font-mono mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">EST. FREIGHT</span>
                      <span className="text-base font-extrabold text-emerald-400">{formatUSD(opt.totalCostUsd)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">DOOR TRANSIT</span>
                      <span className="text-base font-bold text-emerald-300">{Math.round(opt.transitTimeHours/24)} Days</span>
                    </div>
                  </div>

                  {/* Waypoints */}
                  <div className="space-y-1.5 mb-4 text-xs font-mono">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Routing Waypoints:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {opt.keyWaypoints.map((wp, idx) => (
                        <React.Fragment key={idx}>
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-[11px] border border-white/10">{wp}</span>
                          {idx < opt.keyWaypoints.length - 1 && <ArrowRight className="w-3 h-3 text-slate-500" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="space-y-2 mb-4 text-xs font-mono">
                    {opt.pros.map((pro, pIdx) => (
                      <div key={pIdx} className="flex items-start text-emerald-300 space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-[11px] font-mono text-amber-300 italic">
                    ⚠️ {opt.riskAnalysis}
                  </div>
                  <button className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-emerald-400 hover:opacity-90 text-black font-extrabold text-xs uppercase font-mono rounded-xl glow-amber cursor-pointer transition-all">
                    LOCK IN THIS ROUTE & DISPATCH
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
