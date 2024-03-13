import React, { useState } from 'react';
import './Statistics.css';
import SearchIcon from './assets/SearchIcon.png';

function Statistics() {
  // State variable to store the input value
  const [searchInput, setSearchInput] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to handle form submission (if needed)
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any action with the searchInput value here, such as making an API call
    console.log("Search input:", searchInput);
  };

  return (
    <div className='Stats-Screen'>
      <div className='Outer-Rectangle'>

        <div className='Search-Bar-Area'>
          <form onSubmit={handleSubmit}>
            <input
              className='Search-Input'
              placeholder='Enter city or country'
              type='text'
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>

        <div className='Details-Rectangle'>
          {/* Place the map here */}
        </div>

        <div className='Chart-Rectangle'>
          {/* Place the charts here */}
        </div>

      </div>
    </div>
  );
}

export default Statistics;
