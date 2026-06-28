import React from 'react';
import { Users, ShieldCheck, Clock, Phone, Award, MapPin, Truck, Activity, AlertCircle } from 'lucide-react';
import { Driver } from '../types';

interface DriversViewProps {
  drivers: Driver[];
}

export const DriversView: React.FC<DriversViewProps> = ({ drivers }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-200 select-none">
      <div className="glass rounded-2xl p-8 border border-emerald-500/30 bg-gradient-to-br from-[#06120b] via-[#091f13] to-[#040e09] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
            <Users className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            MO$ MAKIN L.L.C. • FLEET DRIVERS & HOS
          </div>
          <h1 className="text-3xl font-light text-white">Driver Telemetry & ELD Compliance</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
            Live Electronic Logging Device (ELD) hours of service tracking, AI safety driver scoring, and satellite dispatch voice link.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        {drivers.map(drv => {
          const isDriving = drv.status === 'driving';
          const isResting = drv.status === 'resting';
          return (
            <div key={drv.id} className="glass glass-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden group bg-[#06120b]/80 hover:border-emerald-500/40">
              <div>
                <div className="flex items-center space-x-3.5 mb-4">
                  <img src={drv.avatarUrl} alt={drv.name} className="w-12 h-12 rounded-xl object-cover border border-emerald-400/40" />
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight group-hover:text-emerald-300 transition-colors font-sans">{drv.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400 block">{drv.licenseNumber}</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase mt-1 ${
                      isDriving ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse' :
                      isResting ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      ● {drv.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs font-mono mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 block">ASSIGNED RIG</span>
                    <span className="font-bold text-slate-200 truncate block font-sans">{drv.assignedVehicle}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 flex items-center"><Clock className="w-3 h-3 mr-1 text-emerald-400" /> HOS REMAINING</span>
                    <span className={`font-bold ${drv.hoursOfServiceRemaining < 3 ? 'text-rose-400 animate-pulse' : 'text-emerald-300'}`}>
                      {drv.hoursOfServiceRemaining} / 14 hrs
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 flex items-center"><Award className="w-3 h-3 mr-1 text-amber-400" /> SAFETY SCORE</span>
                    <span className="text-emerald-400 font-extrabold">{drv.safetyScore} / 100</span>
                  </div>

                  <div className="flex items-center text-[11px] text-slate-400 pt-1">
                    <MapPin className="w-3 h-3 mr-1 text-emerald-500 shrink-0" />
                    <span className="truncate">{drv.currentLocation}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center space-x-2">
                <a
                  href={`tel:${drv.phone}`}
                  className="flex-1 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase font-mono rounded-xl glow-emerald text-center flex items-center justify-center space-x-1 transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rig</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
