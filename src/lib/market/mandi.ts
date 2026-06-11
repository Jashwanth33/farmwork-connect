const MANDI_PRICES = [
  { market: 'Chennai', commodity: 'Paddy (Common)', price: 2100, unit: 'quintal', change: 0 },
  { market: 'Chennai', commodity: 'Paddy (Grade A)', price: 2200, unit: 'quintal', change: 50 },
  { market: 'Coimbatore', commodity: 'Cotton', price: 6200, unit: 'quintal', change: -100 },
  { market: 'Madurai', commodity: 'Sugarcane', price: 3500, unit: 'quintal', change: 0 },
  { market: 'Tiruchirappalli', commodity: 'Coconut', price: 25000, unit: 'tonne', change: 500 },
  { market: 'Salem', commodity: 'Turmeric', price: 13500, unit: 'quintal', change: 200 },
  { market: 'Vellore', commodity: 'Groundnut', price: 5500, unit: 'quintal', change: -50 },
  { market: 'Thanjavur', commodity: 'Rice (Raw)', price: 2800, unit: 'quintal', change: 0 },
  { market: 'Nagercoil', commodity: 'Pepper', price: 45000, unit: 'quintal', change: 1000 },
  { market: 'Erode', commodity: 'Turmeric', price: 13800, unit: 'quintal', change: 150 },
];

const COMMODITY_LIST = [
  'Paddy (Common)', 'Paddy (Grade A)', 'Rice (Raw)', 'Rice (Boiled)',
  'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Coconut', 'Groundnut',
  'Sunflower', 'Soybean', 'Turmeric', 'Black Pepper', 'Cardamom',
  'Ginger', 'Garlic', 'Onion', 'Potato', 'Tomato', 'Brinjal',
  'Banana', 'Mango', 'Citrus', 'Beans', 'Pulse (Tur)', 'Pulse (Gram)'
];

export const COMMODITIES = COMMODITY_LIST.map((name) => ({
  name,
  category: ['Paddy', 'Rice', 'Wheat', 'Maize'].includes(name.split(' ')[0]) ? 'Cereals' :
    ['Cotton', 'Sugarcane', 'Groundnut', 'Sunflower', 'Soybean'].includes(name.split(' ')[0]) ? 'Commercial' :
    ['Turmeric', 'Pepper', 'Cardamom', 'Ginger', 'Garlic'].includes(name.split(' ')[0]) ? 'Spices' :
    'Vegetables'
}));

export async function getMandiPrices(district?: string, commodity?: string) {
  let prices = [...MANDI_PRICES];

  if (commodity) {
    prices = prices.filter((p) => p.commodity.toLowerCase().includes(commodity.toLowerCase()));
  }

  if (district) {
    prices = prices.filter((p) => p.market.toLowerCase().includes(district.toLowerCase()));
  }

  return prices.map((p) => ({
    ...p,
    changePercent: p.price > 0 ? ((p.change / p.price) * 100).toFixed(1) : 0,
    trend: p.change > 0 ? 'up' : p.change < 0 ? 'down' : 'stable',
  }));
}

export async function getCommodityHistory(commodity: string, days = 30) {
  const basePrice = MANDI_PRICES.find(
    (p) => p.commodity.toLowerCase() === commodity.toLowerCase()
  )?.price || 2000;

  const history = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variance = (Math.random() - 0.5) * basePrice * 0.1;
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(basePrice + variance),
    });
  }

  return history;
}

export async function getMarketTrends() {
  const trends = [];
  for (const commodity of COMMODITY_LIST.slice(0, 10)) {
    const price = MANDI_PRICES.find((p) => p.commodity === commodity)?.price || 2000;
    const change = Math.round((Math.random() - 0.5) * price * 0.1);
    trends.push({
      commodity,
      price,
      change,
      changePercent: ((change / price) * 100).toFixed(1),
    });
  }
  return trends.sort((a, b) => Math.abs(Number(b.changePercent)) - Math.abs(Number(a.changePercent)));
}
