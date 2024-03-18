

import React, { useState, useEffect } from 'react';
import L from 'leaflet'; // npm install leaflet
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet CSS
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';
import { getWeather } from './useful_functions/getWeather'; // Import the getWeather function
import axios from 'axios';


function Statistics() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`"https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3"`);
        setWeatherData(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
        setError('Failed to fetch weather data. Please try again.');
      }
    };

    if (searchInput) {
      fetchData();
    }
  }, [searchInput]);

  const handleSearch = async () => {
    console.log("Search button clicked:", searchInput);
    try {
      const data = await getWeather(searchInput);
      setWeatherData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
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
      </div>

      <div>
        <h2 className='map-header'>Weather Map</h2>
      </div>

      <div className='Weather-Map'>
        {weatherData && (
          <iframe src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3" height="10%" width="60%" />
        )}
      </div>
      <div className='Outer-Rectangle'>
      
        <div className='Search-Bar-Area'>
          <input
            className='Search-Input'
            placeholder='Enter city or country'
            type='text'
            value={searchInput}
            onChange={handleInputChange}
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
