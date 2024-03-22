
// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Import functions and CSS
import get10DayData from './useful_functions/get10DayData';
import './Weather.css';

// Define DailyWeather component
const DailyWeather = () => {
  
  // Variables defined
  const [tenDayWeather, setTenDayWeather] = useState([]);
  const city = 'London'; 

  // Executes everything within when component is rendered
  useEffect(() => {
    // Define function to fetch weather data
    const fetchData = async () => {
      try {
        // Fetch 10-day weather data for the specified city
        const data = await get10DayData(city);
        // Set the fetched data to the state
        setTenDayWeather(data);
      } catch (error) {
        // Error handling
        console.error('Error fetching weather data:', error.message);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Dependency array to ensure useEffect runs only once when component mounts

  // Array to map day names for display
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Render the component
  return (
    <div className="Wcontainer">

      <div className="Wlarge-container">
        <div className='Wbox-title'>10-Day Forecast</div>

        {/* Map over the 10-day weather data and render each day */}
        {tenDayWeather.map((day, index) => (
          <div className="W-entry" key={index}>
            {/* Display today for the first day, otherwise display the day name */}
            <div className='entry-day'>{index === 0 ? 'TODAY' : dayNames[new Date(day.date * 1000).getDay()]}</div>
            {/* Display weather icon */}
            <div className='entry-icon'>
              {/* get icons from the API*/}
              <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='icon'/>
            </div>
            {/* Display temperature range */}
            <div className='entry-temp'>
              {/* Displays min and max temperatures of each day */}
              <div>{day.temp_min}°C / {day.temp_max}°C</div>
            </div>
            {/* Display weather description */}
            <div className='entry-desc'>
              {/* Displays description of weather */}
              {day.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the component
export default DailyWeather;
