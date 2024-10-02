import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import styles from './FiveDayForecast.module.scss';

interface ForecastDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  conditions: string;
}

interface FiveDayForecastProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
}


const formatDate = (dateString: string, index: number): string => {
    const date = new Date(dateString);
    const today = new Date();
  
    // Calculate the difference in days between the forecast date and today
    const diffInDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
    if (diffInDays === 0 && index === 0) {
      return "Tomorrow";
    } else {
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
      return date.toLocaleDateString(undefined, options);
    }
  };

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast, unit }) => {
  return (
    <div className={styles.forecastContainer}>
      <h3>5 Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.slice(1, 6).map((day, index) => (
          <div key={index} className={styles.day}>
           <p>{formatDate(day.datetime, index)}</p>
            <img
              src={getWeatherIcon(day.conditions)}
              alt={day.conditions}
              className={styles.weatherIcon}
            />
            <p className={styles.conditions}><small>{day.conditions}</small></p>
            <p className={styles.smalltemps}>
                <small>{Math.round(day.tempmax)}°{unit} </small>
                <small>{Math.round(day.tempmin)}°{unit}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
