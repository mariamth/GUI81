

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';
import { getWeather } from './useful_functions/getWeather'; // Import the getWeather function

function Statistics() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  useEffect(() => {
    fetchWeatherData('London'); // Fetch weather data for London by default
  }, []); // Empty dependency array ensures it runs only once when component mounts

  const handleSearch = async () => {
    if (searchInput.trim() !== '') {
      fetchWeatherData(searchInput);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='Stats-Screen'>
      {/* Container for the weather details display */}
      <div className='weather-details-container'>
        {/* weather details display */}
        {weatherData && (
          <div className="weather-details-header">
            <h2>Weather Details</h2>
            <div className='weather-details-p'>
              <p>City: {weatherData.city}</p>
              <p>Weather: {weatherData.weather}</p>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>

      <div>
        <h2 className='map-header'>Weather Map</h2>
      </div>

      {/* Render map */}
      <div className='Weather-Map'>
        <iframe
          src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3"
          height="400px"
          width="100%"
        />
      </div>

      <div className='Outer-Rectangle'>
        <div className='Search-Bar-Area'>
          <input
            className='Search-Input'
            placeholder='Enter city or country'
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press event handler
          />
          <button className="Search-Button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>
        <div className='Details-Rectangle'></div>
        <div className='Chart-Rectangle'></div>
      </div>
    </div>
  );
}

export default Statistics;
