
import React from 'react';
import './Statistics-Map.css';

function WeatherMap() {
    return (
        <div className='main'>
            <iframe src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=51.5072&lon=0.1276&zoom=3" height="1200pt" width="100%" />
        </div>
    )
}

export default WeatherMap;