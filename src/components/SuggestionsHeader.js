import React from 'react';
import {  BrowserRouter as Router, Link, useLocation} from 'react-router-dom';

import home from './assets/navbar/icon_home.png'

//import './Header.css';

const Header = () => {

  // Updates variable with URL
  const location = useLocation();

  return (
    <>
      <nav id='header-background'>
        <ul id='list'>

          {/* Compares URL pathname and changes tag id based on output
          Used to dynamically update the icons without a full page reload*/}

          <li id={location.pathname =='/suggestions' ? 'selected-li' : 'default-li'}>
            <Link to='/suggestions'><img src={home} alt="Suggestions"></img></Link>
          </li>

          <li id={location.pathname === '/suggestions/planner' ? 'selected-li' : 'default-li'}>
            <Link to='/suggestions/planner'><img src={home} alt="Planner"></img></Link>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default Header;