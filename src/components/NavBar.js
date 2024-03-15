// navbar
import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation} from 'react-router-dom';

// Links to other pages
import CurrentWeather from './Weather-Current.js';
import Alerts from './Alerts.js';
import Statistics from './Statistics.js';
import Suggestions from './Suggestions.js';

import DailyWeather from './Weather-Daily.js';
import MonthlyWeather from './Weather-Monthly.js';

import Notes  from './Notes.js';

// Links to NavBar icons
import home from './assets/navbar/icon_home.png'
import map from './assets/navbar/icon_map.png'
import chart from './assets/navbar/icon_chart.png'
import check from './assets/navbar/icon_check.png'

import './NavBar.css';

const NavBar = () => {

  // Updates variable with URL
  const location = useLocation();

  return (
    <>
      <nav id='nav-background'>
        <ul id='nav-list'>

          {/* Compares URL pathname and changes tag id based on output
          Used to dynamically update the icons without a full page reload*/}

          <li id={location.pathname.includes('/home') ? 'nav-selected' : 'nav-default'}>
            <Link to='/home'><img src={home} alt="Home"></img></Link>
          </li>

          <li id={location.pathname === '/alerts' ? 'nav-selected' : 'nav-default'}>
            <Link to='/alerts'><img src={map} alt="Alerts"></img></Link>
          </li>

          <li id={location.pathname === '/statistics' ? 'nav-selected' : 'nav-default'}>
            <Link to='/statistics'><img src={chart} alt="Stats"></img></Link>
          </li>

          <li id={location.pathname.includes('/suggestions') ? 'nav-selected' : 'nav-default'}>
            <Link to='/suggestions'><img src={check} alt="Suggest"></img></Link>
          </li>

        </ul>
      </nav>
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
    </>
  );
};

export default NavBar;