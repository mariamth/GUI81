import React from 'react';
import {  BrowserRouter as Router, useLocation} from 'react-router-dom';

import Clear from './assets/ClearSkiesBackground.gif'
import Cloud from './assets/CloudySkyBackground.gif'
import Rain from './assets/Rainybackground.gif'
import Snow from './assets/SnowyBackgound.gif'

import './Background.css'

const Background = () => {

  // Updates variable with URL
  const location = useLocation();

  // Random for now, TODO: make image reflect weather 
  var index;

  const images = [Clear, Cloud, Rain, Snow]
  if (true){ index = Math.floor(Math.random() * images.length) }
  const image = images[index]

    const backgroundStyle = {
      backgroundImage: `url(${image})`
    }

  return (
    <div id='background-image' style={backgroundStyle}>
    </div>
  );
};

export default Background;