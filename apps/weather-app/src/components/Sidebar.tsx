import React from 'react';
import styles from './Sidebar.module.scss'; 
import { getWeatherIcon } from '../utils/weatherIcons'; 

interface SidebarProps {
  location: string;
  setLocation: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  date: string;
  temperature: number;
  unit: 'C' | 'F';
  weatherCondition: string;
  weatherIcon: string;
  onToggleUnit: (unit: 'C' | 'F') => void;
  activeUnit: 'C' | 'F';
}

const Sidebar: React.FC<SidebarProps> = ({
  location,
  setLocation,
  handleSubmit,
  date,
  temperature,
  unit,
  weatherCondition,
  weatherIcon,
  onToggleUnit,
  activeUnit,
}) => {

// Format the date to exclude the year
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',  // Short weekday (e.g., "Tue")
    day: 'numeric',    // Numeric day (e.g., "01")
    month: 'long'      // Full month (e.g., "Oct")
  });


  return (
    <div className={styles.sidebar}>
      {/* Search Bar - Moved to the top */}
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
          className={styles.input}
        />
      <button type="submit" className={styles.button}>
      <img src="/images/arrow-right-dark.svg" alt="Search" className={styles.arrowIcon} />
      </button>
      </form>

      <h1>{location}</h1>
      <p className={styles.date}>{formattedDate}</p>
      <div className={styles.tempSection}>
      <img src={getWeatherIcon(weatherIcon)} alt={weatherCondition} className={styles.weatherIcon} />
        <span className={styles.temp}>
        {Math.round(temperature)}<small>°{unit}</small>

        </span>
    
      </div>
      <p className={styles.condition}>{weatherCondition}</p>


    </div>
  );
};

export default Sidebar;
