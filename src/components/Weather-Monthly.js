import React, { useState, useEffect } from 'react';
import './Weather.css';
import getMonthlyWeather from './useful_functions/getMonthlyWeather';

const MonthlyWeather = () => {
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonthlyWeather = async () => {
      try {
        // Provide latitude, longitude, and API key
        const latitude = 51.5074; // London's latitude
        const longitude = 0.1278; // London's longitude
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

        const monthlyData = await getMonthlyWeather(latitude, longitude, apiKey);
        setMonthlyWeather(monthlyData);
        setError('');
      } catch (error) {
        console.error('Error fetching monthly weather data:', error.message);
        setError('Failed to fetch monthly weather data. Please try again.');
      }
    };

    fetchMonthlyWeather();
  }, []);

  return (
    <div className="MonthlyWcontainer">
      <h1>Monthly Weather</h1>
      <div className="MWlarge-container">
        {monthlyWeather.map((day, index) => (
          <div className="MW-entry" key={index}>
            <div className="entry-day">{day.dayName}</div>
            <div className="entry-icon">
              <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="icon" />
            </div>
            <div className="entry-temp">
              <div>{day.temperature}°C</div>
            </div>
            <div className="entry-desc">{day.weather}</div>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MonthlyWeather;
