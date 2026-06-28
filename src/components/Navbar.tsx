// src/components/Navbar.tsx
import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Settings, 
  Sparkles, 
  Plus, 
  Search,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Menu
} from 'lucide-react';

interface NavbarProps {
  onQuickBook: () => void;
  onOpenAI: () => void;
  activeShipmentCount: number;
}

export function Navbar({ onQuickBook, onOpenAI, activeShipmentCount }: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="glass border-b border-emerald-500/10 px-4 md:px-6 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-gray-400" />
        </button>

        {/* Live Network Status */}
        <div className="hidden sm:flex items-center gap-3 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 text-xs font-medium">Live Network</span>
          <span className="text-emerald-400/30 text-xs">|</span>
          <span className="text-emerald-400/70 text-xs">{activeShipmentCount} shipments</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-black/30 rounded-lg px-3 py-1.5 border border-emerald-500/10 flex-1 max-w-md hover:border-emerald-500/30 transition-colors">
          <Search className="w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search shipments, drivers, or hubs..." 
            className="bg-transparent border-none outline-none text-sm text-gray-300 px-2 w-full placeholder-gray-600"
          />
          <kbd className="hidden lg:block text-[10px] text-gray-500 bg-gray-800/50 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Revenue Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-400">$48,250</span>
          <span className="text-xs text-amber-400/60">today</span>
        </div>

        <button 
          onClick={onQuickBook}
          className="bg-gradient-to-r from-emerald-500 to-green-400 text-black px-3 md:px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> 
          <span className="hidden sm:inline">Quick Book</span>
        </button>

        <button 
          onClick={onOpenAI}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 px-3 md:px-4 py-1.5 rounded-lg text-sm font-semibold hover:from-purple-500/30 hover:to-emerald-500/30 transition-all border border-emerald-500/20"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" /> 
          <span className="hidden md:inline">AI Dispatch</span>
        </button>

        <button className="relative p-2 rounded-lg hover:bg-emerald-500/10 transition-colors">
          <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <button className="hidden md:flex p-2 rounded-lg hover:bg-emerald-500/10 transition-colors">
          <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-emerald-500/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            MM
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </div>
      </div>
    </nav>
  );
}