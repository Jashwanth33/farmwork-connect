export const CROP_TYPES = [
  { value: 'RICE', label: 'Rice / Paddy', labelTa: 'அரிசி / நெல்', labelTe: 'అrice / వరి', labelHi: 'धान / चावल' },
  { value: 'WHEAT', label: 'Wheat', labelTa: 'கோதுமை', labelTe: 'గోధుమ', labelHi: 'गेहूं' },
  { value: 'MAIZE', label: 'Maize / Corn', labelTa: 'மக்காச்சோளம்', labelTe: 'మొక్కజోసు', labelHi: 'मक्का / भुट्टा' },
  { value: 'SUGARCANE', label: 'Sugarcane', labelTa: 'கரும்பு', labelTe: 'చెరకు', labelHi: 'गन्ना' },
  { value: 'COTTON', label: 'Cotton', labelTa: 'பருத்தி', labelTe: 'పత్తి', labelHi: 'कपास' },
  { value: 'GROUNDNUT', label: 'Groundnut', labelTa: 'நிலக்கடலை', labelTe: 'వేరుశనగ', labelHi: 'मूंगफली' },
  { value: 'PULSES', label: 'Pulses', labelTa: 'பருப்பு வகைகள்', labelTe: 'పత్తి', labelHi: 'दालें' },
  { value: 'MILLETS', label: 'Millets', labelTa: 'சிறுதерியினங்கள்', labelTe: 'మిల్లెట్స్', labelHi: 'बाजरा' },
  { value: 'VEGETABLES', label: 'Vegetables', labelTa: 'காய்கறிகள்', labelTe: 'కూరగాయలు', labelHi: 'सब्जियां' },
  { value: 'FRUITS', label: 'Fruits / Orchards', labelTa: 'பழங்கள் / தோட்டங்கள்', labelTe: 'పండ్ల తోटీ', labelHi: 'फल / बागान' },
  { value: 'OILSEEDS', label: 'Oilseeds', labelTa: 'எண்ணெய் விதைகள்', labelTe: 'నూనె గింజలు', labelHi: 'तिलहन' },
  { value: 'PLANTATION', label: 'Plantation Crops', labelTa: 'தோட்ட பயிர்கள்', labelTe: 'తోట పంటలు', labelHi: 'बागानी फसलें' },
] as const;

export const SERVICE_CATEGORIES = [
  { value: 'LAND_PREPARATION', label: 'Land Preparation', icon: 'Tractor' },
  { value: 'SOWING', label: 'Sowing / Planting', icon: 'Sprout' },
  { value: 'CROP_MAINTENANCE', label: 'Crop Maintenance', icon: 'Droplets' },
  { value: 'HARVESTING', label: 'Harvesting', icon: 'Wheat' },
  { value: 'POST_HARVEST', label: 'Post Harvest', icon: 'Package' },
  { value: 'TRANSPORT', label: 'Transport', icon: 'Truck' },
  { value: 'SPECIALIST', label: 'Specialist Services', icon: 'Users' },
] as const;

export const SERVICES = [
  { name: 'Land Ploughing', category: 'LAND_PREPARATION', basePrice: 500, icon: 'Tractor' },
  { name: 'Levelling', category: 'LAND_PREPARATION', basePrice: 400, icon: 'Layers' },
  { name: 'Seed Bed Preparation', category: 'LAND_PREPARATION', basePrice: 350, icon: 'Grid3x3' },
  { name: 'Direct Seeding', category: 'SOWING', basePrice: 300, icon: 'Scan' },
  { name: 'Nursery Planting', category: 'SOWING', basePrice: 400, icon: 'Sprout' },
  { name: 'Transplantation', category: 'SOWING', basePrice: 600, icon: 'Plant' },
  { name: 'Weeding', category: 'CROP_MAINTENANCE', basePrice: 250, icon: 'Scissors' },
  { name: 'Fertilizer Application', category: 'CROP_MAINTENANCE', basePrice: 350, icon: 'Droplets' },
  { name: 'Pesticide Spraying', category: 'CROP_MAINTENANCE', basePrice: 400, icon: 'SprayCan' },
  { name: 'Manual Harvesting', category: 'HARVESTING', basePrice: 800, icon: 'Wheat' },
  { name: 'Machine Harvesting', category: 'HARVESTING', basePrice: 1200, icon: 'Tractor' },
  { name: 'Threshing', category: 'HARVESTING', basePrice: 500, icon: 'RotateCw' },
  { name: 'Crop Residue Rolling', category: 'POST_HARVEST', basePrice: 300, icon: 'RollsRoyce' },
  { name: 'Loading/Unloading', category: 'POST_HARVEST', basePrice: 400, icon: 'Package' },
  { name: 'Crop Transport', category: 'TRANSPORT', basePrice: 15, priceUnit: 'km', icon: 'Truck' },
  { name: 'Soil Testing', category: 'SPECIALIST', basePrice: 1000, priceUnit: 'visit', icon: 'FlaskConical' },
  { name: 'Irrigation Setup', category: 'SPECIALIST', basePrice: 1500, priceUnit: 'visit', icon: 'Droplet' },
  { name: 'Crop Consultation', category: 'SPECIALIST', basePrice: 500, priceUnit: 'visit', icon: 'MessageCircle' },
] as const;

export const EQUIPMENT_TYPES = [
  { value: 'TRACTOR', label: 'Tractor' },
  { value: 'ROTAVATOR', label: 'Rotavator' },
  { value: 'SEED_DRILL', label: 'Seed Drill' },
  { value: 'HARVESTER', label: 'Harvester' },
  { value: 'POWER_TILLER', label: 'Power Tiller' },
  { value: 'SPRAYER', label: 'Sprayer' },
  { value: 'WATER_TANKER', label: 'Water Tanker' },
  { value: 'ROLLER', label: 'Roller' },
  { value: 'PADDY_TRANSPLANTER', label: 'Paddy Transplanter' },
  { value: 'BULLOCK_CART', label: 'Bullock Cart' },
  { value: 'TRAILER', label: 'Trailer' },
] as const;

export const VEHICLE_TYPES = [
  { value: 'TRUCK', label: 'Truck' },
  { value: 'TROLLY', label: 'Trolly' },
  { value: 'PICKUP', label: 'Pickup Van' },
  { value: 'TRACTOR_TRAILER', label: 'Tractor Trailer' },
  { value: 'BULLOCK_CART', label: 'Bullock Cart' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'UPI', label: 'UPI' },
  { value: 'NET_BANKING', label: 'Net Banking' },
  { value: 'WALLET', label: 'Wallet' },
  { value: 'CASH', label: 'Cash on Service' },
] as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'Tamil', labelNative: 'தமிழ்' },
  { value: 'te', label: 'Telugu', labelNative: 'తెలుగు' },
  { value: 'hi', label: 'Hindi', labelNative: 'हिंदी' },
  { value: 'kn', label: 'Kannada', labelNative: 'ಕನ್ನಡ' },
] as const;

export const URGENCY_LEVELS = [
  { value: 'low', label: 'Flexible', days: 7 },
  { value: 'normal', label: 'Within 3 days', days: 3 },
  { value: 'high', label: 'Urgent (24 hrs)', days: 1 },
  { value: 'emergency', label: 'Emergency', days: 0 },
] as const;
