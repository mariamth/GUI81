import React, { useState, useEffect } from 'react';
import './Weather.css';
import getMonthlyWeather from './useful_functions/getMonthlyWeather';

const MonthlyWeather = () => {
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonthlyWeather = async () => {
      try {
        const monthlyData = await getMonthlyWeather('London');
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
          <div className="MW-entry" key={day.date}>
            <div className="entry-day">{new Date(day.date * 1000).toLocaleDateString()}</div>
            <div className="entry-icon">
              <img src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`} alt="icon" />
            </div>
            <div className="entry-temp">
            <div>{day.temperature.min}°C / {day.temperature.max}°C</div>
            </div>
            <div className="entry-desc">{day.weather.description}</div>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MonthlyWeather;
