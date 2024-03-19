
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Statistics.css';
// import SearchIcon from './assets/SearchIcon.png';
// import { getWeather } from './useful_functions/getWeather'; 
// import Background from './Background'; 

// function Statistics() {
//   const [searchInput, setSearchInput] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState('');
//   const [selectedParameter, setSelectedParameter] = useState('temperature');

//   const fetchWeatherData = async (city) => {
//     try {
//       const data = await getWeather(city);
//       setWeatherData(data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       setWeatherData(null);
//       setError('Failed to fetch weather data. Please try again.');
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData('London'); // Fetch weather data for London by default
//   }, []); // Empty dependency array ensures it runs only once when component mounts

//   const handleSearch = async () => {
//     if (searchInput.trim() !== '') {
//       fetchWeatherData(searchInput);
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleParameterChange = (parameter) => {
//     setSelectedParameter(parameter);
//   };

//   return (
//     <div className='Stats-Screen'>
//       {/* Container for the weather details display */}
//       <div className='weather-details-container'>
//         {/* weather details display */}
//         {weatherData && (
//           <div className="weather-details-header">
//             <h2>Weather Details</h2>
//             <div className='weather-details-p'>
//               <p>City: {weatherData.city}</p>
//               <p>Weather: {weatherData.weather}</p>
//               <p>Temperature: {weatherData.temperature}°C</p>
//               <p>Humidity: {weatherData.humidity}%</p>
//               <p>Wind Speed: {weatherData.windSpeed} m/s</p>
//             </div>
//           </div>
//         )}
//         {error && <p>{error}</p>}
//       </div>


//       {/* Bar chart */}

//       <div>
//         <h2 className='map-header'> Weather Map </h2>
//       </div>

//       {/* Render map */}
//       <div className='Weather-Map'>
//         <iframe
//           src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3"
//           height="400px"
//           width="100%"
//         />
//       </div>

//       <Background weatherData={weatherData} /> 


//       <div className='Outer-Rectangle'>
//         <div className='Search-Bar-Area'>
//           <input
//             className='Search-Input'
//             placeholder='Enter city or country'
//             type='text'
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             onKeyPress={handleKeyPress} 
//           />
//           <button className="Search-Button" onClick={handleSearch}>
//             <img src={SearchIcon} alt="Search" />
//           </button>
//         </div>
//         <div className='Details-Rectangle'></div>
//         <div className='Chart-Rectangle'>

//           {/* Buttons for selecting parameter */}
//           <div className='parameter-buttons'>
//             <button onClick={() => handleParameterChange('temperature')}>Temperature</button>
//             <button onClick={() => handleParameterChange('humidity')}>Humidity</button>
//             <button onClick={() => handleParameterChange('wind_speed')}>Wind Speed</button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Statistics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';
import { getWeather } from './useful_functions/getWeather';
import get5DayData from './useful_functions/get5DayData'; // Import the get5DayData function
import Background from './Background';

function Statistics() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('temperature');
  const [fiveDayWeather, setFiveDayWeather] = useState(null); // State to store 5-day weather forecast data

  const fetchWeatherData = async (city) => {
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      setError('');
      
      // Fetch 5-day weather forecast data
      const fiveDayData = await get5DayData(city);
      setFiveDayWeather(fiveDayData);
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

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
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

      {/* Bar chart */}


      <div>
        <h2 className='map-header'> Weather Map </h2>
      </div>

      {/* Render map */}
      <div className='Weather-Map'>
        <iframe
          src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3"
          height="400px"
          width="100%"
        />
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

        
        <div className='Chart-Rectangle'>


          {/* Buttons for selecting parameter */}
          <div className='parameter-buttons'>
            <button onClick={() => handleParameterChange('temperature')}>Temperature</button>
            <button onClick={() => handleParameterChange('humidity')}>Humidity</button>
            <button onClick={() => handleParameterChange('wind_speed')}>Wind Speed</button>
          </div>


          {/* Display 5-day weather forecast data */}
          <div className='five-day-forecast'>
            <h2>5-Day Weather Forecast</h2>
            {fiveDayWeather && (
              <div>
                {fiveDayWeather.map((forecast, index) => (
                  <div key={index}>
                    <p>Date: {forecast.date}</p>
                    <p>Temperature: {forecast.temperature}°C</p>
                    <p>Humidity: {forecast.humidity}%</p>
                    <p>Wind Speed: {forecast.wind_speed} m/s</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Statistics;
