import React from 'react';
import { Warehouse as WarehouseIcon, MapPin, Layers, ArrowUpRight, Truck, ThermometerSnowflake, ShieldCheck, Activity } from 'lucide-react';
import { Warehouse } from '../types';

interface WarehousesViewProps {
  warehouses: Warehouse[];
}

export const WarehousesView: React.FC<WarehousesViewProps> = ({ warehouses }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      <div className="glass rounded-2xl p-8 border border-emerald-500/30 bg-gradient-to-br from-[#0a1514] via-[#102b26] to-[#080b12] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
            <WarehouseIcon className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            MO$ MAKIN L.L.C. • WAREHOUSE & SORTING GRID
          </div>
          <h1 className="text-3xl font-light text-white">Global Distribution Megahubs</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time capacity utilization, automated AS/RS inventory sorting status, and cross-docking scheduling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {warehouses.map(wh => (
          <div key={wh.id} className="glass glass-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden group bg-[#06120b]/80 hover:border-emerald-500/40">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-500" />

            <div>
              <div className="flex items-center justify-between mb-2 pt-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">{wh.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  {wh.utilizationPercent}% FULL
                </span>
              </div>

              <h2 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors font-sans">{wh.name}</h2>
              <div className="flex items-center text-xs text-slate-400 mb-4 font-sans">
                <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400 shrink-0" />
                <span>{wh.location}</span>
              </div>

              {/* Utilization Bar */}
              <div className="space-y-1 mb-5 font-mono">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Storage Utilization</span>
                  <span>{wh.utilizationPercent}% / {wh.totalAreaSqm.toLocaleString()} sqm</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${wh.utilizationPercent}%` }} />
                </div>
              </div>

              {/* Inventory Categories */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Inventory Breakdown:</span>
                <div className="space-y-1.5 text-xs font-mono">
                  {wh.inventoryCategories.map((cat, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white/5 flex justify-between items-center border border-white/5">
                      <span className="text-slate-300 truncate max-w-[150px] font-sans">{cat.category}</span>
                      <span className="text-emerald-300 font-bold">{cat.percentage}% ({cat.cbm.toLocaleString()} CBM)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">INBOUND TRUCKS</span>
                  <span className="text-amber-300 font-bold">{wh.inboundTrucksScheduled} Scheduled</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">OUTBOUND DOCKS</span>
                  <span className="text-emerald-300 font-bold">{wh.outboundTrucksScheduled} Active</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-xs uppercase rounded-xl border border-white/10 transition-all flex items-center justify-center space-x-1 cursor-pointer">
                <span>Open Terminal Automation Panel</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
