// CropPlanner.js
import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav id='background'>
      <ul id='list'>
        <li id='listitem'><Link to='/home'><img src='./components/assets/navbar/icon_home.png' alt="Home"></img></Link></li>
        <li id='listitem'><Link to='/alerts'><img src='./components/assets/navbar/icon_check.png' alt="Alerts"></img></Link></li>
        <li id='listitem'><Link to='/statistics'><img src='./components/assets/navbar/icon_check.png' alt="Stats"></img></Link></li>
        <li id='listitem'><Link to='/suggestions'><img src='./components/assets/navbar/icon_check.png' alt="Suggest"></img></Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;