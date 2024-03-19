
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/NavBar';
import WeatherHeader from './components/Weather-Header.js';
import Background from './components/Background';

import CurrentWeather from './components/Weather-Current.js';
import Alerts from './components/Alerts.js';
import Statistics from './components/Statistics.js';
import Suggestions from './components/Suggestions.js';

import DailyWeather from './components/Weather-Daily.js';
import MonthlyWeather from './components/Weather-Monthly.js';

import Notes  from './components/Notes.js';

import { getWeather } from './components/useful_functions/getWeather.js'; 

function App(){

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather('London'); 
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Router> 
      <WeatherHeader/>
      <NavBar/>
      {weatherData && <Background weatherData={weatherData} />} 
      <Routes>
        <Route path="/" element={<Navigate to='/home' />} />
        <Route path="/home" element={<CurrentWeather />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/suggestions" element={<Suggestions />} />

        <Route path="/home/daily" element={<DailyWeather />} />
        <Route path="/home/monthly" element={<MonthlyWeather />} />

        <Route path="/suggestions/planner" element={<Notes />} />
      </Routes>
    </Router>
  )
}

export default App;
