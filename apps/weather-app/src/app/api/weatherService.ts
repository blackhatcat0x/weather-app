const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export const getWeather = async (location: string) => {
  const response = await fetch(`${BASE_URL}${location}?key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  
  const data = await response.json();
  return data;
};
