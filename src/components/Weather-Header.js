import React from 'react';
import {  BrowserRouter as Router, Link, useLocation} from 'react-router-dom';

import './Weather-Header.css';

const WeatherHeader = () => {

  // Updates variable with URL
  const location = useLocation();

  const wHeader = location.pathname.includes('/home')
  // Only render weather header if true (on weather screen)

  return (
    <div>
      {wHeader ? ( 
        <nav className='weather-header-background'>
          <ul className='weather-list'>

            {/* Compares URL pathname and changes tag id based on output
            Used to dynamically update the icons without a full page reload*/}

            <li className={location.pathname === '/home' ? 'weather-selected' : 'weather-default'}>
              <Link to='/home'>Current</Link>
            </li>

            <li className={location.pathname === '/home/daily' ? 'weather-selected' : 'weather-default'}>
              <Link to='/home/daily'>Daily</Link>
            </li>

            <li className={location.pathname === '/home/monthly' ? 'weather-selected' : 'weather-default'}>
              <Link to='/home/monthly'>Monthly</Link>
            </li>

          </ul>
        </nav>
    ) : (
      <></>
    )}

</div>
   
      
  );
};

export default WeatherHeader;