import React, { useState } from 'react';
import { 
  Anchor, 
  Plane, 
  Truck, 
  Filter, 
  Radio, 
  Navigation,
  Activity,
  Snowflake,
  Flame,
  Info
} from 'lucide-react';
import { Shipment, FleetAsset, TransportMode } from '../types';

interface MapViewProps {
  shipments: Shipment[];
  fleet: FleetAsset[];
  onSelectShipment: (shipment: Shipment) => void;
}

export const MapView: React.FC<MapViewProps> = ({ shipments, fleet, onSelectShipment }) => {
  const [filterMode, setFilterMode] = useState<TransportMode | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<{ type: 'shipment' | 'asset'; data: any } | null>(null);
  const [satelliteZoom, setSatelliteZoom] = useState<'normal' | 'radar'>('normal');

  const filteredShipments = filterMode === 'all' 
    ? shipments 
    : shipments.filter(s => s.mode === filterMode);

  // Normalize lat/lng to container percentages (Mercator approx simulation)
  const getCoords = (lat: number, lng: number) => {
    // lat: -60 to 70 -> 0% to 100% top
    // lng: -140 to 140 -> 0% to 100% left
    const x = ((lng + 140) / 280) * 100;
    const y = ((70 - lat) / 130) * 100;
    return { 
      left: `${Math.max(4, Math.min(96, x))}%`, 
      top: `${Math.max(8, Math.min(92, y))}%` 
    };
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto h-[calc(100vh-5rem)] flex flex-col select-none">
      {/* Top Map Control Bar */}
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-500/20 shrink-0 bg-[#050e0a]/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide uppercase flex items-center space-x-2 font-mono">
              <span>MO$ MAKIN Global Fleet Grid</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">LIVE SAT-LINK</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">Telemetry sync interval: 250ms • Geo-fencing active</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-bold uppercase mr-1 hidden md:inline font-mono">Mode Filter:</span>
          {(['all', 'ocean', 'air', 'road', 'rail'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center space-x-1.5 ${
                filterMode === mode
                  ? 'bg-emerald-400 text-black shadow-md glow-emerald font-extrabold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              {mode === 'ocean' && <Anchor className="w-3 h-3" />}
              {mode === 'air' && <Plane className="w-3 h-3" />}
              {mode === 'road' && <Truck className="w-3 h-3" />}
              <span>{mode}</span>
            </button>
          ))}
          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />
          <button
            onClick={() => setSatelliteZoom(satelliteZoom === 'normal' ? 'radar' : 'normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              satelliteZoom === 'radar'
                ? 'bg-amber-400 text-black glow-amber font-extrabold'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {satelliteZoom === 'radar' ? '● RADAR SWEEP' : 'SAT VIEW'}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas Container */}
      <div className="flex-1 glass rounded-2xl relative overflow-hidden border border-emerald-500/20 bg-[#030906] shadow-2xl flex flex-col justify-between">
        {/* Radar Background & Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none transition-all duration-700" 
          style={{ 
            backgroundImage: satelliteZoom === 'radar'
              ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, transparent 70%), linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)'
              : 'radial-gradient(#10b981 0.75px, transparent 0.75px)',
            backgroundSize: satelliteZoom === 'radar' ? '100% 100%, 40px 40px, 40px 40px' : '28px 28px' 
          }}
        />

        {/* Radar Sweep Beam Animation */}
        {satelliteZoom === 'radar' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-[180%] h-[180%] rounded-full border border-emerald-500/20 absolute animate-ping" style={{ animationDuration: '6s' }} />
            <div className="w-[120%] h-[120%] rounded-full border border-emerald-500/30 absolute" />
            <div className="w-[60%] h-[60%] rounded-full border border-emerald-500/40 absolute" />
          </div>
        )}

        {/* Continent Silhouette Rough Contours (SVG Decorative Simulation) */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-emerald-400 fill-none stroke-[0.5]">
          <path d="M 100,180 Q 200,140 320,180 T 450,220 T 580,190 T 750,230 T 900,180" />
          <path d="M 150,350 Q 300,380 480,320 T 680,360 T 880,300" />
          <path d="M 220,500 Q 400,480 620,530 T 850,490" />
        </svg>

        {/* Active Route Transit Corridors (Lines) */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredShipments.map((shp) => {
            const orig = getCoords(shp.origin.lat, shp.origin.lng);
            const dest = getCoords(shp.destination.lat, shp.destination.lng);
            return (
              <svg key={`line-${shp.id}`} className="absolute inset-0 w-full h-full overflow-visible opacity-30">
                <line
                  x1={orig.left}
                  y1={orig.top}
                  x2={dest.left}
                  y2={dest.top}
                  stroke={shp.mode === 'ocean' ? '#10b981' : shp.mode === 'air' ? '#34d399' : '#f59e0b'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
            );
          })}
        </div>

        {/* Shipments Nodes */}
        <div className="absolute inset-0 pointer-events-auto">
          {filteredShipments.map((shp) => {
            const coords = getCoords(shp.currentLocation.lat, shp.currentLocation.lng);
            const isSelected = selectedItem?.type === 'shipment' && selectedItem?.data.id === shp.id;
            return (
              <div
                key={shp.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem({ type: 'shipment', data: shp });
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 transition-transform duration-300 hover:scale-125"
                style={{ left: coords.left, top: coords.top }}
              >
                <div className={`node ${
                  shp.mode === 'ocean' ? 'bg-emerald-400 shadow-[0_0_12px_#10b981]' :
                  shp.mode === 'air' ? 'bg-teal-300 shadow-[0_0_12px_#5eead4]' :
                  'bg-amber-400 shadow-[0_0_12px_#fbbf24]'
                } ${isSelected ? 'ring-4 ring-white scale-150' : ''}`} />

                {/* Pulse Ring */}
                <div className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

                {/* Floating Tooltip Label */}
                <div className="absolute left-3 -top-2 px-2 py-0.5 rounded bg-[#040e09]/95 border border-emerald-500/40 text-[10px] font-mono whitespace-nowrap text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                  <span className="text-emerald-400 font-bold">{shp.trackingNumber}</span> • {shp.destination.city}
                </div>
              </div>
            );
          })}

          {/* Fleet Assets Nodes */}
          {fleet.map((flt) => {
            const coords = getCoords(flt.currentLocation.lat, flt.currentLocation.lng);
            const isSelected = selectedItem?.type === 'asset' && selectedItem?.data.id === flt.id;
            return (
              <div
                key={flt.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem({ type: 'asset', data: flt });
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 hover:z-30"
                style={{ left: coords.left, top: coords.top }}
              >
                <div className={`p-1.5 rounded-full ${
                  isSelected ? 'bg-emerald-400 text-black scale-125 ring-2 ring-white' : 'bg-[#06150e] border border-emerald-500/40 text-emerald-400'
                } transition-all shadow-lg`}>
                  {flt.type === 'container_ship' && <Anchor className="w-3.5 h-3.5" />}
                  {flt.type === 'cargo_plane' && <Plane className="w-3.5 h-3.5" />}
                  {flt.type === 'truck' && <Truck className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Left HUD Info Legend */}
        <div className="p-6 pointer-events-none flex justify-between items-start z-10">
          <div className="glass p-3.5 rounded-xl border border-emerald-500/20 pointer-events-auto space-y-2 max-w-xs bg-black/60">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              GRID LEGEND • MO$ MAKIN OS
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <span>Ocean Vessel</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-300 shadow-[0_0_8px_#5eead4]" />
                <span>Air Cargo</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                <span>Road Express</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Active Berth</span>
              </div>
            </div>
          </div>

          {/* Selected Node Inspector HUD Card */}
          {selectedItem && (
            <div className="glass p-4 rounded-xl border border-emerald-500/40 pointer-events-auto max-w-sm w-72 sm:w-80 shadow-2xl animate-in fade-in zoom-in-95 duration-200 bg-[#05110a]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/20">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  {selectedItem.type === 'shipment' ? 'FREIGHT BOL NODE' : 'FLEET ASSET TELEMETRY'}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              {selectedItem.type === 'shipment' ? (
                <div className="space-y-2 text-xs font-mono text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tracking:</span>
                    <span className="font-bold text-emerald-400">{selectedItem.data.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client:</span>
                    <span className="truncate max-w-[160px] font-sans font-bold">{selectedItem.data.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route:</span>
                    <span>{selectedItem.data.origin.code} ➔ {selectedItem.data.destination.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-bold uppercase">{selectedItem.data.status}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-300 border-t border-white/5 font-sans">
                    {selectedItem.data.cargoDescription}
                  </div>
                  <button
                    onClick={() => onSelectShipment(selectedItem.data)}
                    className="w-full mt-2 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase rounded-lg glow-emerald cursor-pointer transition-all shadow-md"
                  >
                    Open Full Tracking Dossier
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-xs font-mono text-slate-200">
                  <div className="font-bold text-white text-sm font-sans">{selectedItem.data.name}</div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="text-emerald-400 font-bold">{selectedItem.data.speedKmh} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fuel Level:</span>
                    <span className="text-teal-300 font-bold">{selectedItem.data.fuelPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coordinates:</span>
                    <span>{selectedItem.data.currentLocation.name}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom HUD Telemetry Rail */}
        <div className="p-4 sm:p-6 pointer-events-none flex flex-col sm:flex-row justify-between items-end gap-4 z-10">
          <div className="glass p-3 rounded-xl flex gap-6 text-xs font-mono pointer-events-auto border border-emerald-500/20 bg-black/70">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px]">CENTER LAT</span>
              <span className="text-white font-bold">28.4520° N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px]">CENTER LON</span>
              <span className="text-white font-bold">42.1092° E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-emerald-400/80 text-[10px]">GRID YIELD</span>
              <span className="text-emerald-400 font-bold">$142,400 /hr</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto font-mono">
            <div className="px-4 py-2 glass rounded-full text-[10px] text-emerald-300 font-mono uppercase tracking-widest border border-emerald-500/30 bg-black/60 font-bold">
              ⚡ MO$ MAKIN SATCOMM ACTIVE
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 rounded-full text-[10px] text-black font-extrabold uppercase glow-emerald shadow-lg">
              GPS RELIABILITY: 99.99%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
