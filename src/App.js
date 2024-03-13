import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CurrentWeather from './components/CurrentWeather';
import Alerts from './components/Alerts.js';
import Statistics from './components/Statistics.js';
import Suggestions from './components/Suggestions.js';

import NavBar from './components/NavBar';

function App(){
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<CurrentWeather />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
