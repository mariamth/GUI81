import React from 'react';
import {  BrowserRouter as Router, Link, useLocation} from 'react-router-dom';

import home from './assets/navbar/icon_home.png'

import './Header.css';

const Header = () => {

  // Updates variable with URL
  const location = useLocation();

  return (
    <>
      <nav id='header-background'>
        <ul id='list'>

          {/* Compares URL pathname and changes tag id based on output
          Used to dynamically update the icons without a full page reload*/}

          <li id={location.pathname =='/home' ? 'selected-li' : 'default-li'}>
            <Link to='/home'><img src={home} alt="Home"></img></Link>
          </li>

          <li id={location.pathname === '/home/daily' ? 'selected-li' : 'default-li'}>
            <Link to='/home/daily'><img src={home} alt="Alerts"></img></Link>
          </li>

          <li id={location.pathname === '/home/monthly' ? 'selected-li' : 'default-li'}>
            <Link to='/home/monthly'><img src={home} alt="Stats"></img></Link>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default Header;