// MonthlyWeather.js
import React from 'react';
import './Weather.css';

const CurrentWeather = () => {
  return (
    <div className="CurrentWcontainer">
      <h1>Current Weather</h1>
      <div className="CWlarge-container">
        {/* Add content for displaying current weather information */}
      </div>
      <div className="small-container-wrapper">
        <div className="small-container"></div>
        <div className="small-container"></div>
        <div className="small-container"></div>
      </div>
    </div>
  );
};

export default CurrentWeather;
