import React, { useState } from 'react';
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';
import { getWeather } from './useful_functions/getWeather'; // Import the getWeather function

function Statistics() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

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

  return (
    <div className='Stats-Screen'>
      <div className='Outer-Rectangle'>
        <div className='Search-Bar-Area'>
          <input
            className='Search-Input'
            placeholder='Enter city or country'
            type='text'
            value={searchInput}
            onChange={handleInputChange}
          />
          <button className="Search-Button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>
        <div className='Details-Rectangle'>
          {error && <p className="error-message">{error}</p>}
          <div> </div>
          {weatherData && (
            <>
              <p>City: {weatherData.city}</p>
              <p>Weather: {weatherData.weather}</p>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            </>
          )}
        </div>
        <div className='Chart-Rectangle'>
          {/* Place the charts here */}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
