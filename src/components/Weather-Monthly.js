import React, { useState, useEffect } from 'react';
import './Weather.css';
import getMonthlyWeather from './useful_functions/getMonthlyWeather';

const MonthlyWeather = () => {
  // variables for monthly weather data and error handling
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch monthly weather data
    const fetchMonthlyWeather = async () => {
      try {
        // Fetch monthly weather data for London (you can replace 'London' with any city)
        const monthlyData = await getMonthlyWeather('London');
        setMonthlyWeather(monthlyData);
        setError('');
      } catch (error) {
        //Error handling
        console.error('Error fetching monthly weather data:', error.message);
        setError('Failed to fetch monthly weather data. Please try again.');
      }
    };

    fetchMonthlyWeather(); // Call the function when the component mounts
  }, []);

  return (
    <div className="Wcontainer">
      {/* Container for the monthly weather */}
      <div className="Wlarge-container">
        {/* Title for the monthly forecast */}
        <div className='Wbox-title'>Monthly forecast</div>
        
        {/* Mapping through the monthly weather data and rendering each entry */}
        {monthlyWeather.map((day, index) => (
          <div className="W-entry" key={day.date}>
            {/* Displaying the date */}
            <div className="entry-day">{new Date(day.date * 1000).toLocaleDateString()}</div>
            {/* Displaying the weather icon */}
            <div className="entry-icon">
              <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} alt="icon" />
            </div>
            {/* Displaying the temperature */}
            <div className="entry-temp">
              <div>{day.temperature.min}°C / {day.temperature.max}°C</div>
            </div>
            {/* Displaying the weather description */}
            <div className="entry-desc">{day.weather.description}</div>
          </div>
        ))}
      </div>
      {/* Displaying error message if there is any */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default MonthlyWeather;
