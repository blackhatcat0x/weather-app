"use client";

import React, { useEffect, useState } from 'react';
import { getWeather } from './api/weatherService';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import FiveDayForecast from '../components/FiveDayForecast'; // Import the new 5-day forecast component
import { getWeatherIcon } from '../utils/weatherIcons';
import styles from './page.module.scss';

// Define the type for the weather data
interface WeatherData {
  resolvedAddress: string;
  currentConditions: {
    temp: number;
    humidity: number;
    cloudcover: number;
    conditions: string;
    sunriseEpoch: number;
    sunsetEpoch: number;
  };
  days: any[]; // Array to store the forecast for multiple days
}

// Convert temperature based on the selected unit
const convertTemperature = (temp: number, toUnit: 'C' | 'F') => {
  if (toUnit === 'C') {
    return ((temp - 32) * 5) / 9; // Fahrenheit to Celsius conversion
  }
  return temp; // Default is Fahrenheit
};

const formatTime = (epoch: number) => {
  const date = new Date(epoch * 1000); // Convert seconds to milliseconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function HomePage() {
  const [location, setLocation] = useState<string>('Brighton');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C'); // Default to Celsius

  const fetchWeatherData = async (loc: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(loc);

      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  const toggleUnit = (newUnit: 'C' | 'F') => {
    setUnit(newUnit);
  };



  return (
    <div className={styles.page}>
      {/* Sidebar */}
      {weatherData && (
        <Sidebar
          location={location}
          setLocation={setLocation}
          handleSubmit={handleSubmit}
          date={new Date().toDateString()}
          temperature={convertTemperature(weatherData.currentConditions.temp, unit)}
          unit={unit}
          weatherCondition={weatherData.currentConditions.conditions}
          weatherIcon={weatherData.currentConditions.conditions} // Assuming conditions map to icons
          onToggleUnit={toggleUnit}
          activeUnit={unit}
       
        />
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>

        {/* Unit Toggle */}
        <div className={styles.unitToggle}>
          <button
            onClick={() => setUnit('C')}
            className={unit === 'C' ? styles.active : ''}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('F')}
            className={unit === 'F' ? styles.active : ''}
          >
            °F
          </button>
        </div>

        <h2>Day Overview</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <>
            <div className={styles.dayOverview}>
              <div className={styles.stat}>
                <p>Humidity</p>
                <p className={styles.conditions}>{weatherData.currentConditions.humidity}%</p>
                <div className={styles.progressBarContainer}>
                  <div className={styles.percent}>
                   <span className={styles.perValue}>%</span>
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${weatherData.currentConditions.humidity}%` }}
                    />
                  </div>
                  <div className={styles.percentValues}>
                  <span className={styles.minValue}>0</span>
                  <span className={styles.maxValue}>100</span>
                  </div>
                </div>
              </div>

              <div className={styles.stat}>
                <p>Cloud Cover</p>
                <p className={styles.conditions}>{weatherData.currentConditions.cloudcover}%</p>
                <div className={styles.progressBarContainer}>
                  <div className={styles.percent}>
                   <span className={styles.perValue}>%</span>
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div
                      className={`${styles.progressBar} ${styles.yellow}`}
                      style={{ width: `${weatherData.currentConditions.cloudcover}%` }}
                    />
                  </div>
                  <div className={styles.percentValues}>
                  <span className={styles.minValue}>0</span>
                  <span className={styles.maxValue}>100</span>
                  </div>
                </div>
              </div>
            </div>

      

       <div className={styles.dayOverview}>
              <div className={styles.riseset}>
                <p>Max Temp</p>
                <p className={styles.innertemp}>
                {weatherData.days[0].tempmax != null // Access tempmax from the first day of the forecast
                  ? `${Math.round(convertTemperature(weatherData.days[0].tempmax, unit))}°${unit}`
                  : 'N/A'}
              </p>
              </div>
              <div className={styles.riseset}>
                <p>Sunrise</p>
                <p className={styles.innertemp}>{formatTime(weatherData.currentConditions.sunriseEpoch)}</p>
              </div>
              <div className={styles.riseset}>
                <p>Sunset</p>
                <p className={styles.innertemp}>{formatTime(weatherData.currentConditions.sunsetEpoch)}</p>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <FiveDayForecast
              forecast={weatherData.days.map((day) => ({
                ...day,
                tempmax: convertTemperature(day.tempmax, unit),
                tempmin: convertTemperature(day.tempmin, unit),
              }))}
              unit={unit}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
