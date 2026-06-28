import React from 'react';
import { X, MapPin, Clock, ShieldCheck, Thermometer, Flame, Truck, Plane, Anchor, Train, Activity, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Shipment } from '../types';

interface ShipmentDossierModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const ShipmentDossierModal: React.FC<ShipmentDossierModalProps> = ({ shipment, onClose }) => {
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const steps = [
    { label: 'Booking Confirmed', done: true, time: 'June 14, 08:30 UTC' },
    { label: 'Origin Terminal Received', done: true, time: 'June 15, 11:20 UTC' },
    { label: 'Customs Export Cleared', done: true, time: 'June 16, 04:15 UTC' },
    { label: 'In Global Corridor', done: ['in_transit', 'customs_hold', 'out_for_delivery', 'delivered'].includes(shipment.status), time: 'Active Sync' },
    { label: 'Destination Import Clearance', done: ['out_for_delivery', 'delivered'].includes(shipment.status), time: 'Pending Arrival' },
    { label: 'Proof of Delivery (POD)', done: shipment.status === 'delivered', time: shipment.estimatedArrival },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="glass max-w-3xl w-full rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-[#050e0a] max-h-[90vh] flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 shrink-0 relative z-10 font-mono">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {shipment.mode === 'ocean' && <Anchor className="w-6 h-6" />}
              {shipment.mode === 'air' && <Plane className="w-6 h-6" />}
              {shipment.mode === 'road' && <Truck className="w-6 h-6" />}
              {shipment.mode === 'rail' && <Train className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-extrabold text-amber-300">MO$ MAKIN OFFICIAL DOSSIER</span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {shipment.status.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white font-mono mt-0.5">{shipment.trackingNumber}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-6 pr-2 relative z-10 flex-1 font-mono text-xs">
          {/* Client & Cargo Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Enterprise Client</span>
              <div className="text-base font-bold text-white font-sans">{shipment.clientName}</div>
              <div className="text-slate-300 text-xs font-sans">{shipment.cargoDescription}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block">WEIGHT & VOL</span>
                <span className="text-white font-bold">{Math.round(shipment.weightKg/1000)}t / {shipment.volumeCbm} CBM</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">DECLARED VALUE</span>
                <span className="text-emerald-400 font-bold">{formatUSD(shipment.declaredValueUsd)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">EST. ARRIVAL</span>
                <span className="text-emerald-300 font-bold">{shipment.estimatedArrival.split('T')[0]}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">CARBON footprint</span>
                <span className="text-amber-300 font-bold">{shipment.carbonEmissionsKg}kg CO2</span>
              </div>
            </div>
          </div>

          {/* Corridor Waypoints */}
          <div className="p-4 rounded-2xl glass border border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">ORIGIN PORT</span>
                <span className="text-white font-bold text-sm">{shipment.origin.city} ({shipment.origin.code})</span>
              </div>
            </div>
            <div className="flex-1 px-4 text-center">
              <div className="text-[10px] text-emerald-400 font-bold mb-1">CORRIDOR: {shipment.mode.toUpperCase()}</div>
              <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-green-500 relative">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute left-1/2 -top-1 animate-ping" />
              </div>
            </div>
            <div className="flex items-center space-x-2.5 text-right">
              <div>
                <span className="text-[10px] text-slate-400 block">DESTINATION</span>
                <span className="text-white font-bold text-sm">{shipment.destination.city} ({shipment.destination.code})</span>
              </div>
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>

          {/* IoT Telemetry */}
          <div className="flex flex-wrap gap-3">
            {shipment.requiresTempControl && (
              <div className="px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 flex items-center space-x-2">
                <Thermometer className="w-4 h-4" />
                <span>Cold Chain Reefer: Active at {shipment.currentTempCelcius}°C</span>
              </div>
            )}
            {shipment.isHazmat && (
              <div className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center space-x-2">
                <Flame className="w-4 h-4" />
                <span>Hazmat Certified: IMO Class Compliance</span>
              </div>
            )}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>GPS Link: {shipment.currentLocation.name}</span>
            </div>
          </div>

          {/* Audit Trail Timeline */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Immutable Ledger Audit Trail</span>
            <div className="space-y-2">
              {steps.map((st, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${
                  st.done ? 'bg-slate-900/90 border-emerald-500/30 text-slate-200' : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${st.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={st.done ? 'font-bold text-white' : ''}>{st.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{st.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-white/10 flex justify-end shrink-0 relative z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 hover:opacity-95 text-black font-extrabold uppercase rounded-xl glow-emerald transition-all cursor-pointer shadow-lg"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
