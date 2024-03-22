

import React, { useState, useEffect, useRef } from 'react';
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';
import { getWeather } from './useful_functions/getWeather';
import get5DayData from './useful_functions/get5DayData';
import Background from './Background';
import Chart from 'chart.js/auto';

function Statistics() {
  // States for managing search input, weather data, error, selected parameter, and five-day weather forecast
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('temperature');
  const [fiveDayWeather, setFiveDayWeather] = useState(null);
  // Reference for managing Chart instance
  const chartInstance = useRef(null);

  // Function to fetch weather data for a given city
  const fetchWeatherData = async (city) => {
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      setError('');
      
      const fiveDayData = await get5DayData(city);
      setFiveDayWeather(fiveDayData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  // Fetch initial weather data for London on component mount
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  // Function to handle search when search button is clicked
  const handleSearch = async () => {
    if (searchInput.trim() !== '') {
      fetchWeatherData(searchInput);
    }
  };

  // Function to handle search when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to handle parameter change for the chart
  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  // Effect to update chart when fiveDayWeather or selectedParameter changes
  useEffect(() => {
    if (fiveDayWeather) {
      const dates = fiveDayWeather.map((forecast) => forecast.date);
      const values = fiveDayWeather.map((forecast) => {
        if (selectedParameter === 'windSpeed') {
          // Matches the property name returned by get5DayData function
          return forecast.wind_speed;
        } else {
          return forecast[selectedParameter];
        }
      });

      const ctx = document.getElementById('weatherChart');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
          datasets: [{
            label: selectedParameter,
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white',
              }
            },
            x: {
              ticks: {
                color: 'white',
              }
            }
          }
        }
      });
    }
  }, [fiveDayWeather, selectedParameter]);

  // Rendering UI
  return (
    <div className='Stats-Screen'>
      <div className='weather-details-container'>

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

      {/* Bar chart */}
      <div style={{ position: 'absolute', width: '25%', margin: '0 auto', left: '70%', top:'55%'}}>
        <canvas id="weatherChart"></canvas>
      </div>

       {/* Render map */}
       <div className='Weather-Map'>
         <iframe
          src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3"
          height="400px"
          width="100%"
        />
      </div>

      {/* Buttons for selecting parameter */}
      <div className='chart-button-container'>
        <button className='temp-button' onClick={() => handleParameterChange('temperature')}>Temp</button>
        <button className='humidity-button' onClick={() => handleParameterChange('humidity')}>Humidity</button>
        <button className='wind-speed-button' onClick={() => handleParameterChange('windSpeed')}>Wind</button>
      </div>

      <Background weatherData={weatherData} />

      <div className='Outer-Rectangle'>
        <div className='Search-Bar-Area'>
          <input
            className='Search-Input'
            placeholder='Enter city or country'
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
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
