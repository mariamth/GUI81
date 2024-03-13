import React from 'react';

import Clear from './components/assets/ClearSkiesBackground.gif'
import Cloud from './components/assets/CloudySkyBackground.gif'
import Rain from './components/assets/Rainybackground.gif'
import Snow from './components/assets/SnowyBackgound.gif'

import './Background.css'

const Background = () => {

  const images = [Clear, Cloud, Rain, Snow]
  const index = Math.floor(Math.random() * images.length)
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