import React from 'react';
import {  BrowserRouter as Router, Link, useLocation} from 'react-router-dom';

import home from './assets/navbar/icon_home.png'

import './Weather-Header.css';

const Header = () => {

  // Updates variable with URL
  const location = useLocation();

  return (
    <>
      <nav id='weather-header-background'>
        <ul id='weather-list'>

          {/* Compares URL pathname and changes tag id based on output
          Used to dynamically update the icons without a full page reload*/}

          <li id={location.pathname =='/home' ? 'weather-selected' : 'weather-default'}>
            <Link to='/home'><img src={home} alt="Home"></img></Link>
          </li>

          <li id={location.pathname === '/home/daily' ? 'weather-selected' : 'weather-default'}>
            <Link to='/home/daily'><img src={home} alt="Daily"></img></Link>
          </li>

          <li id={location.pathname === '/home/monthly' ? 'weather-selected' : 'weather-default'}>
            <Link to='/home/monthly'><img src={home} alt="Monthly"></img></Link>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default Header;