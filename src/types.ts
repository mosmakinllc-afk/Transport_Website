// src/types.ts
export type TransportMode = 'intermodal' | 'air' | 'road' | 'rail';
export type ShipmentStatus = 'booked' | 'pickup' | 'in_transit' | 'dot_hold' | 'out_for_delivery' | 'delivered';
export type Priority = 'standard' | 'express' | 'guaranteed';

export interface Location {
  city: string;
  state: string;
  code: string;
  lat: number;
  lng: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  clientName: string;
  origin: Location;
  destination: Location;
  mode: TransportMode;
  status: ShipmentStatus;
  cargoDescription: string;
  weightKg: number;
  volumeCbm: number;
  declaredValueUsd: number;
  requiresTempControl: boolean;
  currentTempCelcius?: number;
  isHazmat: boolean;
  departureTime: string;
  estimatedArrival: string;
  currentLocation: { lat: number; lng: number; name: string };
  assignedDriverId?: string;
  assignedVehicleId?: string;
  carbonEmissionsKg?: number;
  priority: Priority;
  revenue: number;
}

export interface FleetAsset {
  id: string;
  name: string;
  type: 'truck' | 'cargo_plane' | 'intermodal_train';
  status: 'in_transit' | 'loading' | 'docked' | 'maintenance';
  currentLocation: { lat: number; lng: number; name: string };
  destination?: string;
  fuelPercentage: number;
  speedKmh: number;
  driverName?: string;
  tempStatus?: 'normal' | 'warning' | 'critical';
  cargoCapacityTons: number;
  currentLoadTons: number;
}

export interface Driver {
  id: string;
  name: string;
  avatarUrl?: string;
  licenseNumber: string;
  phone: string;
  assignedVehicle: string;
  status: 'driving' | 'resting' | 'off_duty' | 'loading';
  hoursOfServiceRemaining: number;
  safetyScore: number;
  currentLocation: string;
  totalMiles: number;
  revenueGenerated: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  totalAreaSqm: number;
  utilizationPercent: number;
  temperatureControlled: boolean;
  inventoryCategories: { category: string; cbm: number; percentage: number }[];
  inboundTrucksScheduled: number;
  outboundTrucksScheduled: number;
  dailyThroughput: number;
}

export interface RateQuoteRequest {
  origin: string;
  destination: string;
  mode: TransportMode;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  isHazmat: boolean;
  requiresRefrigeration: boolean;
  urgency: Priority;
}

export interface RateQuoteResponse {
  quoteId: string;
  estimatedCostUsd: number;
  transitTimeDays: number;
  carbonEmissionsKg: number;
  breakdown: {
    baseFreight: number;
    fuelSurcharge: number;
    dotPermits: number;
    insurance: number;
    specialHandling: number;
  };
  recommendedRoute: string[];
}

export interface AIOptimizedRouteOption {
  id: string;
  title: string;
  modeStrategy: string;
  totalCostUsd: number;
  transitTimeHours: number;
  reliabilityScore: number;
  co2EmissionsKg: number;
  keyWaypoints: string[];
  pros: string[];
  cons: string[];
  riskAnalysis: string;
}