import React from 'react';
import ClearSky from './components/assets/ClearSkiesBackground.gif'

const Background = ({ children, className }) => {
  const backgroundStyle = {
    backgroundImage: ClearSky,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',  // Ensure the background covers the entire viewport
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,  // Render the background behind other content
  };

  return (
    <div className={`background ${className}`} style={backgroundStyle}>
      {children}
    </div>
  );
};

export default Background;