const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo_key';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  rainfall: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  rainfall: number;
}

export interface WeatherAlert {
  id: string;
  type: 'RAIN' | 'HEATWAVE' | 'COLDWAVE' | 'STORM' | 'FLOOD';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  startTime: Date;
  endTime: Date;
  recommendations: string[];
}

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      return getMockWeather();
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      rainfall: data.rain?.['1h'] || 0,
      forecast: [],
    };
  } catch {
    return getMockWeather();
  }
}

export async function getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherForecast[]> {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=${days * 8}`
    );
    
    if (!response.ok) {
      return getMockForecast();
    }
    
    const data = await response.json();
    const forecasts: WeatherForecast[] = [];
    
    for (let i = 0; i < data.list.length; i += 8) {
      const day = data.list[i];
      forecasts.push({
        date: new Date(day.dt * 1000),
        tempMax: Math.round(day.main.temp_max),
        tempMin: Math.round(day.main.temp_min),
        description: day.weather[0].description,
        icon: day.weather[0].icon,
        rainfall: day.rain?.['3h'] || 0,
      });
    }
    
    return forecasts;
  } catch {
    return getMockForecast();
  }
}

export async function getWeatherAlerts(lat: number, lon: number): Promise<WeatherAlert[]> {
  const weather = await getCurrentWeather(lat, lon);
  const alerts: WeatherAlert[] = [];

  if (weather.rainfall > 10) {
    alerts.push({
      id: 'rain_001',
      type: 'RAIN',
      severity: 'HIGH',
      message: 'Heavy rainfall expected. Avoid pesticide spraying and harvesting.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      recommendations: [
        'Delay pesticide application',
        'Ensure proper drainage in fields',
        'Protect harvested crops',
        'Check irrigation systems',
      ],
    });
  }

  if (weather.temperature > 40) {
    alerts.push({
      id: 'heat_001',
      type: 'HEATWAVE',
      severity: 'HIGH',
      message: 'Extreme heat conditions. Schedule farm work for early morning or evening.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      recommendations: [
        'Work during cooler hours',
        'Stay hydrated',
        'Provide shade for workers',
        'Increase irrigation frequency',
      ],
    });
  }

  if (weather.temperature < 5) {
    alerts.push({
      id: 'cold_001',
      type: 'COLDWAVE',
      severity: 'MEDIUM',
      message: 'Cold wave conditions. Protect frost-sensitive crops.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      recommendations: [
        'Cover frost-sensitive crops',
        'Delay transplanting',
        'Monitor irrigation timing',
      ],
    });
  }

  if (weather.windSpeed > 50) {
    alerts.push({
      id: 'storm_001',
      type: 'STORM',
      severity: 'HIGH',
      message: 'Strong winds expected. Secure equipment and structures.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
      recommendations: [
        'Secure loose items',
        'Avoid working in open fields',
        'Protect stored grains',
        'Check for fallen branches',
      ],
    });
  }

  return alerts;
}

export function getCropRecommendations(
  cropType: string,
  weather: WeatherData
): string[] {
  const recommendations: string[] = [];
  const temp = weather.temperature;
  const humidity = weather.humidity;
  const rainfall = weather.rainfall;

  if (cropType === 'RICE') {
    if (rainfall > 5) {
      recommendations.push('Maintain proper water level in paddy fields');
    } else if (rainfall < 1 && temp > 35) {
      recommendations.push('Increase irrigation frequency for rice nursery');
    }
    if (humidity > 80 && temp > 30) {
      recommendations.push('High disease risk - monitor for bacterial leaf blight');
    }
  }

  if (cropType === 'WHEAT') {
    if (temp > 30 && rainfall < 2) {
      recommendations.push('Apply light irrigation to prevent heat stress');
    }
    if (temp < 10) {
      recommendations.push('Cold weather - delay sowing if germination is poor');
    }
  }

  if (cropType === 'COTTON') {
    if (humidity > 85) {
      recommendations.push('High boll rot risk - ensure proper spacing');
    }
    if (temp > 40) {
      recommendations.push('Avoid pesticide spraying during peak heat');
    }
  }

  if (['VEGETABLES', 'FRUITS'].includes(cropType)) {
    if (rainfall > 15) {
      recommendations.push('Check for fungal diseases - apply preventive sprays');
    }
    if (temp > 38) {
      recommendations.push('Provide shade nets for sensitive crops');
    }
  }

  return recommendations.length > 0 ? recommendations : ['Weather conditions are favorable for farming activities'];
}

function getMockWeather(): WeatherData {
  return {
    temperature: 32,
    humidity: 65,
    description: 'partly cloudy',
    icon: '02d',
    windSpeed: 12,
    rainfall: 0,
    forecast: [],
  };
}

function getMockForecast(): WeatherForecast[] {
  const forecasts: WeatherForecast[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    forecasts.push({
      date,
      tempMax: 32 + Math.floor(Math.random() * 5),
      tempMin: 22 + Math.floor(Math.random() * 3),
      description: ['sunny', 'partly cloudy', 'cloudy', 'light rain'][Math.floor(Math.random() * 4)],
      icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
      rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0,
    });
  }
  return forecasts;
}
