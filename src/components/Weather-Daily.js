// DailyWeather.js
import React, { useState, useEffect } from 'react';

import get10DayData from './useful_functions/get10DayData';
import './Weather.css';


const DailyWeather = () => {

  const [tenDayWeather, setTenDayWeather] = useState([]);
  const city = 'London';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get10DayData(city);
        setTenDayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    fetchData();
  }, []);

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="Wcontainer">

      <div className="Wlarge-container">
        <div className='Wbox-title'>10-Day Forecast</div>

        
        {tenDayWeather.map((day, index) => (
          <div className="W-entry" key={index}>
            <div className='entry-day'>{index === 0 ? 'TODAY' : dayNames[new Date(day.date * 1000).getDay()]}</div>
            <div className='entry-icon'>
              <img src= {`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='icon'/>
              {/* Consult https://openweathermap.org/weather-conditions */}
            </div>
            <div className='entry-temp'>
              <div>{day.temp_min}°C / {day.temp_max}°C</div>
            </div>
            <div className='entry-desc'>
              {day.desc}
            </div>
          </div>
        ))}
        

      </div>
    </div>
    
  );
};

export default DailyWeather;
