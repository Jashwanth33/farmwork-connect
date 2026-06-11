export type UserRole = 'FARMER' | 'WORKER' | 'EQUIPMENT_OWNER' | 'TRANSPORT_PROVIDER' | 'ADMIN';
export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
export type CropType = 'RICE' | 'WHEAT' | 'MAIZE' | 'SUGARCANE' | 'COTTON' | 'GROUNDNUT' | 'PULSES' | 'MILLETS' | 'VEGETABLES' | 'FRUITS' | 'OILSEEDS' | 'PLANTATION';
export type ServiceCategory = 'LAND_PREPARATION' | 'SOWING' | 'CROP_MAINTENANCE' | 'HARVESTING' | 'POST_HARVEST' | 'TRANSPORT' | 'SPECIALIST';

export interface User {
  id: string;
  phone: string;
  name: string | null;
  role: UserRole;
  email: string | null;
  avatar: string | null;
  language: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  address: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface BookingRequest {
  serviceId: string;
  cropType: CropType;
  farmAddress: string;
  farmLatitude: number;
  farmLongitude: number;
  farmSize: number;
  scheduledDate: string;
  scheduledTime: string;
  urgency: 'low' | 'normal' | 'high' | 'emergency';
  notes?: string;
}

export interface SearchFilters {
  cropType?: CropType;
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  distance?: number;
  availableDate?: string;
}

export interface ProviderSearchResult {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  rating: number;
  reviewCount: number;
  distance: number;
  price: number;
  priceUnit: string;
  skills: string[];
  isAvailable: boolean;
}

export interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  earnings: number;
  pendingAmount: number;
  rating: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}
