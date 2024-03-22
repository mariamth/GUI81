// DailyWeather.js
import React, { useState, useEffect } from 'react';

import get10DayData from './useful_functions/get10DayData';
import './Weather.css';


const DailyWeather = () => {


  const [tenDayWeather, setTenDayWeather] = useState([]); // Declare array variable with useState hook
  const city = 'London';

  // Executes everything within when component is rendered
  useEffect(() => {
    // Define function to fetch weather data
    const fetchData = async () => {
      try {
        const data = await get10DayData(city); // Function to use API call using city
        setTenDayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    
    fetchData(); // Call the function to get weather data
  }, []);


  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Array to convert date to corresponding weekday

  return (
    <div className="Wcontainer">

      <div className="Wlarge-container">
        <div className='Wbox-title'>10-Day Forecast</div>

        {/* Iterates over tenDayWeather array and creates following JSX for each item */}
        {tenDayWeather.map((day, index) => (
          <div className="W-entry" key={index}>
            {/* Checks if item is the first item (today) or not and sets corresponding weekday*/}
            <div className='entry-day'>{index === 0 ? 'TODAY' : dayNames[new Date(day.date * 1000).getDay()]}</div>
            <div className='entry-icon'>
              <img src= {`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='icon'/>
              {/* API Documentation https://openweathermap.org/weather-conditions */}
            </div>
            <div className='entry-temp'>
              {/* Displays min and max temperatures of each day */}
              <div>{day.temp_min}°C / {day.temp_max}°C</div>
            </div>
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

export default DailyWeather;
