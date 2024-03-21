// Weather-Current.js

// Imports for CSS, other files, and React
import React, { useState, useEffect } from 'react';
import './Weather.css'; // Import CSS file
import { getWeather } from './useful_functions/getWeather'; // Import function to fetch current weather
import { getHourlyWeather } from './useful_functions/getHourlyWeather'; // Import function to fetch hourly weather data

const CurrentWeather = () => {
  // variables for weather data, hourly forecast, and error handling
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // function to fetch weather data
    const fetchData = async () => {
      try {
        // Fetch current weather data
        const currentData = await getWeather('London'); // Specify the city here
        setWeatherData(currentData);
  
        // Fetch hourly forecast data
        const hourlyForecastData = await getHourlyWeather('London'); // Specify the city here
        setHourlyForecast(hourlyForecastData);
        setError('');
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        setError('Failed to fetch weather data. Please try again.');
      }
    };
  
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // Render the component
  return (
    <div className="CurrentWcontainer"> 
      <div className="CWlarge-container">
        {/* Display current weather info */}
        {weatherData && (
          <div className="current-weather-info">
            <div className="weather-icon-large">
              {/* Display current weather icon */}
              {weatherData.icon && (
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" className="large-icon" />
              )}
            </div>
            <div className="weather-details">
              {/* Display weather details */}
              <p>City: {weatherData.city}</p>
              <p>Weather: {weatherData.weather}</p>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            </div>
          </div>
        )}
      </div>
      {/* Display error message if needed */}
      {error && <p>{error}</p>}
      <div className="small-container-wrapper">
        {/* Map the hour forcast and display the next 3 hour chunks of forecast */}
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="small-container">
            <h2>{hour.dt_txt}</h2>
            <p>Temperature: {hour.main.temp}°C</p>
            <p>Weather: {hour.weather[0].description}</p>
            {/* Display weather icon for each hour */}
            {hour.weather[0].icon && (
              <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather Icon"className="large-icon" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather; // Export the component
