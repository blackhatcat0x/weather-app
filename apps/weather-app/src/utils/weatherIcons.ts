// apps/weather-app/src/utils/weatherIcons.ts

export const getWeatherIcon = (description: string) => {
  const condition = description.toLowerCase();
  switch (condition) {
    case 'sunny':
    case 'clear':
      return '/icons/day.svg'; 
    case 'partly cloudy':
    case 'partially cloudy':
    case 'mostly sunny':
      return '/icons/cloudy-day-1.svg'; 
    case 'cloudy':
      return '/icons/cloudy.svg'; 
    case 'overcast':
    case 'rain overcast':
      return '/icons/cloudy-day-3.svg'; 
    case 'night':
      return '/icons/night.svg'; 
    case 'rainy':
    case 'rain':
    case 'showers':
      return '/icons/rainy-1.svg'; 
    case 'thunder':
    case 'thunderstorm':
      return '/icons/thunder.svg'; 
    case 'snowy':
    case 'snow':
      return '/icons/snowy-1.svg'; 
    default:
      console.warn(`Unhandled weather condition: ${description}`);
      return '/icons/cloudy.svg'; // Default icon for unhandled cases
  }
};


  