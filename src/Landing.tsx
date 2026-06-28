import React from 'react';
import { ArrowRight, Truck, DollarSign, Cpu, BarChart3, Warehouse, Shield } from 'lucide-react';

export default function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-[#030705] text-white px-6 md:px-12">
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">$</span>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-emerald-400">MO$ MAKIN</span>
            <span className="text-gray-400 ml-1">L.L.C.</span>
          </h1>
        </div>
        <button 
          onClick={onEnter}
          className="bg-emerald-500 px-5 py-2 rounded-lg text-black font-semibold hover:bg-emerald-400 transition"
        >
          Enter Platform
        </button>
      </nav>

      <section className="text-center py-16 md:py-24">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Logistics Built For
          <span className="block text-emerald-400 mt-2">Profit & Scale</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          AI-powered dispatching, real-time fleet tracking, and revenue-driven logistics optimization.
        </p>
        <button 
          onClick={onEnter}
          className="bg-emerald-500 px-8 py-4 rounded-lg text-lg font-bold hover:bg-emerald-400 transition glow-emerald"
        >
          Launch Dashboard
        </button>
      </section>

      <div className="grid md:grid-cols-3 gap-6 pb-20 max-w-5xl mx-auto">
        <FeatureCard icon={<Truck />} title="Fleet Tracking" desc="Live GPS across all assets" />
        <FeatureCard icon={<DollarSign />} title="Revenue Engine" desc="Maximize profit per mile" />
        <FeatureCard icon={<Cpu />} title="AI Dispatch" desc="Smart optimized routing" />
        <FeatureCard icon={<BarChart3 />} title="Analytics" desc="Real-time financial insights" />
        <FeatureCard icon={<Warehouse />} title="Warehousing" desc="Inventory + hubs view" />
        <FeatureCard icon={<Shield />} title="Compliance" desc="DOT tracking & logs" />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass p-6 rounded-xl hover:border-emerald-500/30 transition border border-emerald-500/10">
      <div className="text-emerald-400 mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-400">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}