// src/components/DashboardView.tsx
import React, { useState, useEffect } from 'react';
import { Shipment, FleetAsset } from '../types';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Clock, 
  DollarSign,
  ArrowUpRight,
  Activity,
  MapPin,
  Gauge,
  Users,
  Box
} from 'lucide-react';

interface DashboardViewProps {
  shipments: Shipment[];
  fleet: FleetAsset[];
  onSelectShipment: (shipment: Shipment) => void;
  onOpenMap: () => void;
  onOpenOptimizer: () => void;
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  gold?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
}

function MetricCard({ title, value, change, gold, icon, subtitle }: MetricCardProps) {
  const isPositive = change && !change.startsWith('-');
  
  return (
    <div className={`glass p-5 rounded-xl card-hover ${gold ? 'border-amber-500/20 glow-gold' : 'border-emerald-500/10'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${gold ? 'text-amber-400' : 'text-white'}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${gold ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-3">
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last week</span>
        </div>
      )}
    </div>
  );
}

export function DashboardView({ 
  shipments, 
  fleet, 
  onSelectShipment, 
  onOpenMap, 
  onOpenOptimizer 
}: DashboardViewProps) {
  const [revenue] = useState('$48,250');
  const activeShipments = shipments.filter(s => s.status !== 'delivered').length;
  const inTransit = shipments.filter(s => s.status === 'in_transit').length;
  const totalRevenue = shipments.reduce((sum, s) => sum + (s.revenue || 0), 0);
  
  // Calculate delivery rate
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const deliveryRate = shipments.length > 0 ? ((delivered / shipments.length) * 100).toFixed(1) : '0';

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Revenue Today"
          value={revenue}
          change="+12.5%"
          gold
          icon={<DollarSign className="w-5 h-5" />}
          subtitle="Updated in real-time"
        />
        <MetricCard
          title="Active Loads"
          value={activeShipments.toString()}
          change="+5.2%"
          icon={<Package className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Drivers"
          value={fleet.filter(f => f.status === 'in_transit').length.toString()}
          change="-2.1%"
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="On-Time Delivery"
          value={`${deliveryRate}%`}
          change="+1.8%"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      {/* Live Network Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass p-4 rounded-xl border border-emerald-500/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-400">Live Network Active</span>
            </div>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-sm text-gray-400">{shipments.length} Total Shipments</span>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-sm text-gray-400">{inTransit} In Transit</span>
          </div>
          <button 
            onClick={onOpenMap}
            className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            View Map <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onOpenOptimizer}
            className="flex-1 glass p-4 rounded-xl hover:glass-hover transition-all group border border-emerald-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">AI Route Optimizer</p>
                <p className="text-gray-400 text-xs">Get real-time recommendations</p>
              </div>
            </div>
          </button>
          
          <div className="flex-1 glass p-4 rounded-xl border border-amber-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Monthly Revenue</p>
                <p className="text-xl font-bold text-amber-400">${(totalRevenue + 1247850).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-emerald-400" />
            Active Shipments
          </h2>
          <span className="text-xs text-gray-500">{shipments.filter(s => s.status !== 'delivered').length} active</span>
        </div>
        
        <div className="space-y-3">
          {shipments.slice(0, 5).map((shipment) => (
            <div
              key={shipment.id}
              onClick={() => onSelectShipment(shipment)}
              className="glass p-4 rounded-xl cursor-pointer hover:glass-hover transition-all border border-emerald-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <p className="font-medium text-sm">{shipment.trackingNumber}</p>
                    <p className="text-xs text-gray-400">{shipment.clientName} • {shipment.cargoDescription}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Status</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      shipment.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      shipment.status === 'in_transit' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-sm font-semibold text-emerald-400">${shipment.revenue?.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}