import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import NavBar from './components/NavBar';
import WeatherHeader from './components/Weather-Header.js';
import Background from './components/Background';

// Links to other pages
import CurrentWeather from './components/Weather-Current.js';
import Alerts from './components/Alerts.js';
import Statistics from './components/Statistics.js';
import Suggestions from './components/Suggestions.js';

import DailyWeather from './components/Weather-Daily.js';
import MonthlyWeather from './components/Weather-Monthly.js';

import Notes  from './components/Notes.js';

function App(){

  return (
    <Router> 

      <WeatherHeader/>
      <NavBar/>
      <Background/>

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