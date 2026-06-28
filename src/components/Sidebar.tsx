// src/components/Sidebar.tsx
import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Package, 
  Cpu, 
  DollarSign, 
  Warehouse, 
  Users, 
  Shield,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

export type NavTab = 'dashboard' | 'map' | 'shipments' | 'optimizer' | 'rates' | 'warehouses' | 'drivers' | 'compliance';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  counts: {
    shipments: number;
    warehouses: number;
    drivers: number;
  };
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export function Sidebar({ activeTab, onSelectTab, counts }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'map', label: 'Live Map', icon: <Map className="w-5 h-5" /> },
    { id: 'shipments', label: 'Shipments', icon: <Package className="w-5 h-5" />, badge: counts.shipments },
    { id: 'optimizer', label: 'AI Optimizer', icon: <Cpu className="w-5 h-5" /> },
    { id: 'rates', label: 'Rates', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'warehouses', label: 'Warehouses', icon: <Warehouse className="w-5 h-5" />, badge: counts.warehouses },
    { id: 'drivers', label: 'Drivers', icon: <Users className="w-5 h-5" />, badge: counts.drivers },
    { id: 'compliance', label: 'Compliance', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="w-20 md:w-64 bg-[#030705] border-r border-emerald-500/10 flex flex-col h-full">
      <div className="flex-1 py-6">
        <div className="px-4 mb-6 hidden md:block">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Navigation</div>
        </div>
        
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-emerald-500/5'
                }
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden md:block text-sm font-medium flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`
                  hidden md:block text-xs px-2 py-0.5 rounded-full
                  ${activeTab === item.id 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-gray-800 text-gray-400'
                  }
                `}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-emerald-500/10 mt-6 pt-6 px-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-emerald-500/5 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="hidden md:block text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-emerald-500/5 transition-all duration-200">
            <HelpCircle className="w-5 h-5" />
            <span className="hidden md:block text-sm">Help</span>
          </button>
        </div>
      </div>

      <div className="p-3 border-t border-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center text-black font-bold text-xs">
            MM
          </div>
          <div className="hidden md:block flex-1">
            <div className="text-sm font-medium">MO$ MAKIN</div>
            <div className="text-xs text-gray-500">Enterprise</div>
          </div>
          <button className="hidden md:block text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}