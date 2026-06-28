import React, { useState } from 'react';
import { LayoutDashboard, Map, Package, Cpu, DollarSign, Warehouse, Users, Shield } from 'lucide-react';

type Tab = 'dashboard' | 'map' | 'shipments' | 'optimizer' | 'rates' | 'warehouses' | 'drivers' | 'compliance';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'map', label: 'Live Map', icon: <Map className="w-5 h-5" /> },
    { id: 'shipments', label: 'Shipments', icon: <Package className="w-5 h-5" /> },
    { id: 'optimizer', label: 'AI Optimizer', icon: <Cpu className="w-5 h-5" /> },
    { id: 'rates', label: 'Rates', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'warehouses', label: 'Warehouses', icon: <Warehouse className="w-5 h-5" /> },
    { id: 'drivers', label: 'Drivers', icon: <Users className="w-5 h-5" /> },
    { id: 'compliance', label: 'Compliance', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#030705] flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-[#030705] border-r border-emerald-500/10 flex flex-col h-screen sticky top-0">
        <div className="p-4 border-b border-emerald-500/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">$</span>
            </div>
            <span className="hidden md:block text-sm font-semibold text-emerald-400">MO$ MAKIN</span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-emerald-500/5'
              }`}
            >
              {item.icon}
              <span className="hidden md:block text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            {navItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Live Network Active
          </div>
        </div>

        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'map' && <MapView />}
        {activeTab === 'shipments' && <ShipmentsView />}
        {activeTab === 'optimizer' && <OptimizerView />}
        {activeTab === 'rates' && <RatesView />}
        {activeTab === 'warehouses' && <WarehousesView />}
        {activeTab === 'drivers' && <DriversView />}
        {activeTab === 'compliance' && <ComplianceView />}
      </main>
    </div>
  );
}

// View Components
function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Revenue Today" value="$48,250" change="+12.5%" gold />
        <MetricCard title="Active Loads" value="128" change="+5.2%" />
        <MetricCard title="Drivers Active" value="32" change="-2.1%" />
        <MetricCard title="On-Time %" value="97.8%" change="+1.8%" />
      </div>
      <div className="glass p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-400">Loading shipment data...</p>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, gold }: { title: string; value: string; change?: string; gold?: boolean }) {
  return (
    <div className={`glass p-4 rounded-xl ${gold ? 'border-amber-500/20' : 'border-emerald-500/10'}`}>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${gold ? 'text-amber-400' : 'text-white'}`}>{value}</p>
      {change && <p className={`text-xs ${change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>}
    </div>
  );
}

function MapView() {
  return (
    <div className="glass p-6 rounded-xl h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping mx-auto mb-4"></div>
        <p className="text-gray-400">Live Fleet Tracking</p>
        <p className="text-sm text-gray-500 mt-2">Interactive map loading...</p>
      </div>
    </div>
  );
}

function ShipmentsView() {
  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">All Shipments</h3>
        <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-400 transition">
          + New Shipment
        </button>
      </div>
      <p className="text-gray-400">No shipments to display</p>
    </div>
  );
}

function OptimizerView() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">AI Route Optimizer</h3>
      <button className="bg-emerald-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition">
        Run Optimization
      </button>
    </div>
  );
}

function RatesView() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Rate Quotes</h3>
      <p className="text-gray-400">Get instant shipping rates</p>
    </div>
  );
}

function WarehousesView() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Warehouses</h3>
      <p className="text-gray-400">Warehouse inventory management</p>
    </div>
  );
}

function DriversView() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Drivers</h3>
      <p className="text-gray-400">Driver fleet management</p>
    </div>
  );
}

function ComplianceView() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Compliance</h3>
      <p className="text-gray-400">DOT compliance & safety tracking</p>
    </div>
  );
}