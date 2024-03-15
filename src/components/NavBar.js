// navbar
import React from 'react';
import {  BrowserRouter as Router, Link, useLocation} from 'react-router-dom';

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
      <nav className='nav-background'>
        <ul className='nav-list'>

          {/* Compares URL pathname and changes classname based on output
          Used to dynamically update the icons without a full page reload*/}

          <li className={location.pathname.includes('/home') ? 'nav-selected' : 'nav-default'}>
            <Link to='/home'><img src={home} alt="Home"></img></Link>
          </li>

          <li className={location.pathname === '/alerts' ? 'nav-selected' : 'nav-default'}>
            <Link to='/alerts'><img src={map} alt="Alerts"></img></Link>
          </li>

          <li className={location.pathname === '/statistics' ? 'nav-selected' : 'nav-default'}>
            <Link to='/statistics'><img src={chart} alt="Stats"></img></Link>
          </li>

          <li className={location.pathname.includes('/suggestions') ? 'nav-selected' : 'nav-default'}>
            <Link to='/suggestions'><img src={check} alt="Suggest"></img></Link>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default NavBar;