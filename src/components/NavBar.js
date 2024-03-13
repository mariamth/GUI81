// navbar
import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

import CurrentWeather from './CurrentWeather';
import Alerts from './Alerts.js';
import Statistics from './Statistics.js';
import Suggestions from './Suggestions.js';

import './NavBar.css';

const NavBar = () => {
  return (
    <Router>
      <nav id='background'>
        <ul id='list'>
          <li id='listitem'><Link to='/home'><img src='./components/assets/navbar/icon_home.png' alt="Home"></img></Link></li>
          <li id='listitem'><Link to='/alerts'><img src='./components/assets/navbar/icon_check.png' alt="Alerts"></img></Link></li>
          <li id='listitem'><Link to='/statistics'><img src='./components/assets/navbar/icon_check.png' alt="Stats"></img></Link></li>
          <li id='listitem'><Link to='/suggestions'><img src='./components/assets/navbar/icon_check.png' alt="Suggest"></img></Link></li>
        </ul>
      </nav>

      <Routes>
          <Route path="/" element={<Navigate to = '/home'/>} />
          <Route path="/home" element={<CurrentWeather />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
    </Router>

  );
};

export default NavBar;