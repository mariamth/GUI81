import React, { useState, useEffect } from 'react';
import './Weather.css';
import { getMonthlyWeather } from './useful_functions/getMonthlyWeather';

const MonthlyWeather = () => {
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonthlyWeatherData = async () => {
      try {
        const cityName = 'London';
        const monthlyData = await getMonthlyWeather(cityName);
        setMonthlyWeather(monthlyData);
        setError('');
      } catch (error) {
        console.error('Error fetching monthly weather data:', error.message);
        setError('Failed to fetch monthly weather data. Please try again.');
      }
    };

    fetchMonthlyWeatherData();
  }, []);

  return (
    <div className="MonthlyWcontainer">
      <h1>Monthly Weather</h1>
      <div className="MWlarge-container">
        {/* Render monthly weather data here */}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MonthlyWeather;
