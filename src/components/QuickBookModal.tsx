import React, { useState } from 'react';
import { X, Truck, Plane, Anchor, Train, Flame, Snowflake, Sparkles, CheckCircle2, DollarSign } from 'lucide-react';
import { TransportMode, Shipment } from '../types';

interface QuickBookModalProps {
  onClose: () => void;
  onDispatch: (newShipment: Shipment) => void;
}

export const QuickBookModal: React.FC<QuickBookModalProps> = ({ onClose, onDispatch }) => {
  const [clientName, setClientName] = useState('Apex Global Enterprises');
  const [cargo, setCargo] = useState('Industrial Titanium Turbine Components');
  const [origin, setOrigin] = useState('Rotterdam Port (RTM)');
  const [dest, setDest] = useState('Singapore Gateway (SIN)');
  const [mode, setMode] = useState<TransportMode>('ocean');
  const [weightKg, setWeightKg] = useState(32000);
  const [valueUsd, setValueUsd] = useState(480000);
  const [isHazmat, setIsHazmat] = useState(false);
  const [isReefer, setIsReefer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const tracking = `MO$-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const newShp: Shipment = {
        id: `shp-${Date.now()}`,
        trackingNumber: tracking,
        clientName,
        origin: { city: origin.split(' ')[0], country: 'Global Hub', code: origin.slice(0, 3).toUpperCase(), lat: 51.9244, lng: 4.4777 },
        destination: { city: dest.split(' ')[0], country: 'Global Hub', code: dest.slice(0, 3).toUpperCase(), lat: 1.3521, lng: 103.8198 },
        currentLocation: { name: origin, lat: 51.9244, lng: 4.4777 },
        status: 'booked',
        mode,
        cargoDescription: cargo,
        weightKg,
        volumeCbm: Math.round(weightKg / 250),
        declaredValueUsd: valueUsd,
        departureTime: new Date().toISOString(),
        estimatedArrival: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        requiresTempControl: isReefer,
        currentTempCelcius: isReefer ? -18 : 22,
        isHazmat,
        carbonEmissionsKg: Math.round(weightKg * 0.12)
      };
      onDispatch(newShp);
      setSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="glass max-w-2xl w-full rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-[#040c08]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/15 via-teal-500/15 to-green-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest block flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              MO$ MAKIN L.L.C. • OFFICIAL FREIGHT DISPATCH
            </span>
            <h2 className="text-2xl font-light text-white">Execute Bill of Lading (BOL)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-emerald-400/90 font-bold uppercase">Enterprise Client Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-emerald-400 focus:outline-none font-sans text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-emerald-400/90 font-bold uppercase">Origin Terminal</label>
              <input
                type="text"
                required
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-emerald-400/90 font-bold uppercase">Destination Hub</label>
              <input
                type="text"
                required
                value={dest}
                onChange={e => setDest(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-emerald-400/90 font-bold uppercase">Transport Mode Corridor</label>
            <div className="grid grid-cols-4 gap-2">
              {(['ocean', 'air', 'road', 'rail'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    mode === m ? 'bg-emerald-400 text-black shadow glow-emerald font-extrabold' : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {m === 'ocean' && <Anchor className="w-3.5 h-3.5" />}
                  {m === 'air' && <Plane className="w-3.5 h-3.5" />}
                  {m === 'road' && <Truck className="w-3.5 h-3.5" />}
                  {m === 'rail' && <Train className="w-3.5 h-3.5" />}
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-emerald-400/90 font-bold uppercase">Cargo Manifest Contents</label>
            <input
              type="text"
              required
              value={cargo}
              onChange={e => setCargo(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-400 focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-emerald-400/90 font-bold uppercase">Gross Weight (kg)</label>
              <input
                type="number"
                required
                value={weightKg}
                onChange={e => setWeightKg(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-emerald-400/90 font-bold uppercase">Declared Value (USD)</label>
              <input
                type="number"
                required
                value={valueUsd}
                onChange={e => setValueUsd(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:border-emerald-500/30">
              <input type="checkbox" checked={isHazmat} onChange={e => setIsHazmat(e.target.checked)} className="rounded text-emerald-400 focus:ring-emerald-400" />
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Hazmat Class 9</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:border-emerald-500/30">
              <input type="checkbox" checked={isReefer} onChange={e => setIsReefer(e.target.checked)} className="rounded text-emerald-400 focus:ring-emerald-400" />
              <Snowflake className="w-4 h-4 text-sky-400" />
              <span>Reefer Cold Chain</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 hover:opacity-95 text-black font-extrabold uppercase tracking-wider glow-emerald cursor-pointer transition-all flex items-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Broadcasting BOL to Fleet...' : 'Dispatch Shipment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
