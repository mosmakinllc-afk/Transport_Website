import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Send, Scale, Truck, AlertTriangle, FileText, Cpu, MapPin } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [cargo, setCargo] = useState('High-Density Lithium Batteries (Class 9 Hazmat)');
  const [originState, setOriginState] = useState('Illinois (ORD)');
  const [destState, setDestState] = useState('California (LAX)');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleConsult = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() && !cargo.trim()) return;

    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/ai/compliance-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query || `What are the DOT weigh station permits, hazmat placarding rules, and CARB emissions mandates for hauling ${cargo} from ${originState} to ${destState}?`,
          cargoDescription: cargo,
          originState,
          destState
        })
      });
      const data = await res.json();
      if (data.success) {
        setResponse(data.advisorResponse);
      }
    } catch (err) {
      console.error('Compliance AI err:', err);
    } finally {
      setLoading(false);
    }
  };

  const presetQueries = [
    'What are California CARB Clean Fleet & Reefer TRU compliance rules?',
    'What hazmat placarding is required for Class 9 Lithium Batteries on I-80?',
    'FMCSA 11-hour driving HOS limits and sleeper berth split guidelines.',
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      <div className="glass rounded-2xl p-8 border border-emerald-500/30 bg-gradient-to-br from-[#06120b] via-[#091f13] to-[#040e09] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
            <Scale className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            MO$ MAKIN L.L.C. • FMCSA & DOT LEGAL ENGINE
          </div>
          <h1 className="text-3xl font-light text-white">US Interstate DOT Compliance Attorney AI</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
            Instant 50-state weigh station screening, hazmat placarding verification, IFTA fuel tax calculations, and CARB clean air rules. Powered by Gemini 3.5.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
        {/* Input Consultation Panel */}
        <div className="lg:col-span-5 glass rounded-2xl p-6 border border-white/10 space-y-5 shadow-xl flex flex-col justify-between bg-[#06120b]/80">
          <div>
            <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
              <span>Hauling Parameters</span>
              <span className="text-xs text-emerald-300">FMCSA INDEXED</span>
            </h2>

            <form onSubmit={handleConsult} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 font-bold uppercase">Origin State/Hub</label>
                  <input
                    type="text"
                    value={originState}
                    onChange={e => setOriginState(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 font-bold uppercase">Dest State/Hub</label>
                  <input
                    type="text"
                    value={destState}
                    onChange={e => setDestState(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 font-bold uppercase">Cargo / Hazmat Class</label>
                <input
                  type="text"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 font-bold uppercase">Specific Regulatory Question</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Are bridge weight limits exceeded on I-70 through Colorado? Is special CARB placarding required?"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-mono text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Quick Inquiry Prompts:</span>
                <div className="space-y-1.5">
                  {presetQueries.map((pq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(pq)}
                      className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-slate-300 font-mono transition-colors truncate cursor-pointer"
                    >
                      💡 {pq}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 hover:opacity-95 text-black font-extrabold text-xs uppercase font-mono rounded-xl glow-emerald cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing US Interstate Law...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Consult DOT Legal Engine</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Assessment Panel */}
        <div className="lg:col-span-7 glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl min-h-[450px] bg-[#050e0a]/80">
          {response ? (
            <div className="space-y-4 animate-in fade-in duration-300 overflow-y-auto max-h-[600px] pr-2 font-mono text-xs text-slate-200">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-bold flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>MO$ MAKIN Certified Compliance Assessment • Corroborated with US DOT / FMCSA Title 49</span>
              </div>
              <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-line bg-black/50 p-5 rounded-2xl border border-white/5 font-sans">
                {response}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3 font-sans">
              <Truck className="w-16 h-16 text-slate-700 animate-pulse" />
              <div className="text-base font-semibold text-slate-300">Awaiting DOT consultation request</div>
              <p className="text-xs max-w-sm leading-relaxed">Enter your interstate corridor and commodity to evaluate weigh station bypass eligibility, hazmat placarding, and CARB emissions mandates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
