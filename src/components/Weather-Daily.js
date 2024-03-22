
// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Import functions and CSS
import get10DayData from './useful_functions/get10DayData';
import './Weather.css';

// Define DailyWeather component
const DailyWeather = () => {
<<<<<<< HEAD


  const [tenDayWeather, setTenDayWeather] = useState([]); // Declare array variable with useState hook
  const city = 'London';
=======
  // Variables defined
  const [tenDayWeather, setTenDayWeather] = useState([]);
  const city = 'London'; 
>>>>>>> 5f81ff9ede5bb4f1ff0184d5c353aebaddf3ec54

  // Executes everything within when component is rendered
  useEffect(() => {
    // Define function to fetch weather data
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const data = await get10DayData(city); // Function to use API call using city
=======
        // Fetch 10-day weather data for the specified city
        const data = await get10DayData(city);
        // Set the fetched data to the state
>>>>>>> 5f81ff9ede5bb4f1ff0184d5c353aebaddf3ec54
        setTenDayWeather(data);
      } catch (error) {
        // Error handling
        console.error('Error fetching weather data:', error.message);
      }
    };

<<<<<<< HEAD
    
    fetchData(); // Call the function to get weather data
  }, []);


  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Array to convert date to corresponding weekday
=======
    // Call the fetchData function
    fetchData();
  }, []); // Dependency array to ensure useEffect runs only once when component mounts

  // Array to map day names for display
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
>>>>>>> 5f81ff9ede5bb4f1ff0184d5c353aebaddf3ec54

  // Render the component
  return (
    <div className="Wcontainer">

      <div className="Wlarge-container">
        <div className='Wbox-title'>10-Day Forecast</div>

<<<<<<< HEAD
        {/* Iterates over tenDayWeather array and creates following JSX for each item */}
        {tenDayWeather.map((day, index) => (
          <div className="W-entry" key={index}>
            {/* Checks if item is the first item (today) or not and sets corresponding weekday*/}
=======
        {/* Map over the 10-day weather data and render each day */}
        {tenDayWeather.map((day, index) => (
          <div className="W-entry" key={index}>
            {/* Display today for the first day, otherwise display the day name */}
>>>>>>> 5f81ff9ede5bb4f1ff0184d5c353aebaddf3ec54
            <div className='entry-day'>{index === 0 ? 'TODAY' : dayNames[new Date(day.date * 1000).getDay()]}</div>
            {/* Display weather icon */}
            <div className='entry-icon'>
<<<<<<< HEAD
              <img src= {`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='icon'/>
              {/* API Documentation https://openweathermap.org/weather-conditions */}
=======
              {/* get icons from the API*/}
              <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='icon'/>
>>>>>>> 5f81ff9ede5bb4f1ff0184d5c353aebaddf3ec54
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
