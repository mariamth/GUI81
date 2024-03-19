
import React from 'react';
import Clear from './assets/ClearSkiesBackground.gif'
import Cloud from './assets/CloudySkyBackground.gif'
import Rain from './assets/Rainybackground.gif'
import Snow from './assets/SnowyBackgound.gif'
import './Background.css'

const Background = ({ weatherData }) => {
  // Determines background image based on weather data
  const determineBackgroundImage = () => {
    if (!weatherData) return Clear; // Default to Clear if no weather data available
    const { weather } = weatherData;

    if (weather.includes('clear')) {
      return Clear;
    } 
    else if (weather.includes('cloud')) {
      return Cloud;
    } 
    else if (weather.includes('rain')) {
      return Rain;
    } 
    else if (weather.includes('snow')) {
      return Snow;
    } 
    else {
      return Clear; // Default to Clear if weather condition is not recognized
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${determineBackgroundImage()})`
  };

  return (
    <div id='background-image' style={backgroundStyle}>
    </div>
  );
};

export default Background;
