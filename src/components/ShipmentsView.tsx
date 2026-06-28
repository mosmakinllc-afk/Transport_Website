import React, { useState } from 'react';
import { 
  PackageSearch, 
  PlusCircle, 
  Search, 
  Filter, 
  ExternalLink, 
  Thermometer, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin,
  FileText,
  X,
  Truck,
  Plane,
  Anchor,
  Train
} from 'lucide-react';
import { Shipment, TransportMode, ShipmentStatus } from '../types';

interface ShipmentsViewProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
  onOpenQuickBook: () => void;
}

export const ShipmentsView: React.FC<ShipmentsViewProps> = ({
  shipments,
  onSelectShipment,
  onOpenQuickBook
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all');
  const [modeFilter, setModeFilter] = useState<TransportMode | 'all'>('all');

  const filtered = shipments.filter(s => {
    const matchSearch = s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cargoDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchMode = modeFilter === 'all' || s.mode === modeFilter;

    return matchSearch && matchStatus && matchMode;
  });

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      {/* Header & Controls */}
      <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-light text-white flex items-center space-x-2">
            <span className="font-extrabold text-amber-300 font-mono">MO$ MAKIN</span>
            <span>Active Freight Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Tracking {shipments.length} enterprise manifests • Real-time GPS & IoT Cold Chain monitoring
          </p>
        </div>

        <button
          onClick={onOpenQuickBook}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 hover:opacity-90 text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl glow-emerald cursor-pointer transition-all shadow-lg shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Dispatch New Shipment</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass rounded-2xl p-4 border border-emerald-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#050e0a]/80">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search manifest ID, client name, cargo contents, or origin/dest city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-400 uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs font-mono font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">ALL STATUSES</option>
              <option value="booked" className="bg-slate-900">BOOKED</option>
              <option value="in_transit" className="bg-slate-900">IN TRANSIT</option>
              <option value="customs_hold" className="bg-slate-900">CUSTOMS HOLD</option>
              <option value="out_for_delivery" className="bg-slate-900">OUT FOR DELIVERY</option>
              <option value="delivered" className="bg-slate-900">DELIVERED</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {(['all', 'ocean', 'air', 'road', 'rail'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setModeFilter(mode)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all ${
                  modeFilter === mode ? 'bg-emerald-400 text-black shadow font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono">
        {filtered.map((shp) => {
          return (
            <div
              key={shp.id}
              onClick={() => onSelectShipment(shp)}
              className="glass glass-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between transition-all cursor-pointer group relative overflow-hidden shadow-lg bg-[#06120b]/80 hover:border-emerald-500/40"
            >
              {/* Top Accent Stripe based on Status */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                shp.status === 'in_transit' ? 'bg-emerald-400' :
                shp.status === 'customs_hold' ? 'bg-amber-400 animate-pulse' :
                shp.status === 'out_for_delivery' ? 'bg-teal-400' :
                shp.status === 'delivered' ? 'bg-green-500' : 'bg-lime-500'
              }`} />

              <div>
                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className="font-mono font-bold text-sm text-emerald-300 group-hover:text-emerald-200">
                    {shp.trackingNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-extrabold uppercase rounded ${
                    shp.status === 'in_transit' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    shp.status === 'customs_hold' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                    shp.status === 'delivered' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                    'bg-slate-800 text-slate-300 border border-white/10'
                  }`}>
                    {shp.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-sm font-bold text-white mb-1 font-sans">{shp.clientName}</div>
                <p className="text-xs text-slate-300 line-clamp-2 min-h-[32px] font-medium leading-relaxed font-sans">
                  {shp.cargoDescription}
                </p>

                {/* Route Pill */}
                <div className="my-3 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-semibold">{shp.origin.city}</span>
                  </div>
                  <span className="text-slate-500">➔</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-bold">{shp.destination.city}</span>
                    <span className="text-[10px] text-slate-400">({shp.destination.code})</span>
                  </div>
                </div>

                {/* IoT Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono text-slate-300 uppercase border border-white/10 flex items-center">
                    {shp.mode === 'ocean' && <Anchor className="w-3 h-3 mr-1 text-emerald-400" />}
                    {shp.mode === 'air' && <Plane className="w-3 h-3 mr-1 text-teal-300" />}
                    {shp.mode === 'road' && <Truck className="w-3 h-3 mr-1 text-amber-400" />}
                    {shp.mode === 'rail' && <Train className="w-3 h-3 mr-1 text-green-400" />}
                    {shp.mode}
                  </span>
                  {shp.requiresTempControl && (
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[10px] font-mono text-sky-300 border border-sky-500/30 flex items-center">
                      <Thermometer className="w-3 h-3 mr-1" /> {shp.currentTempCelcius}°C REEFER
                    </span>
                  )}
                  {shp.isHazmat && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-[10px] font-mono text-rose-300 border border-rose-500/30 flex items-center">
                      <Flame className="w-3 h-3 mr-1" /> HAZMAT
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{Math.round(shp.weightKg/1000)}t • {shp.volumeCbm} CBM</span>
                <span className="text-emerald-400 font-bold">{formatUSD(shp.declaredValueUsd)}</span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full glass p-12 rounded-2xl text-center text-slate-400 space-y-3">
            <PackageSearch className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
            <div className="text-base font-semibold text-white font-sans">No active freight manifests found matching your filter criteria.</div>
            <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); setModeFilter('all'); }} className="text-xs text-emerald-400 hover:underline cursor-pointer font-bold">
              Reset all search filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
