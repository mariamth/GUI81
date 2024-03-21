// Suggestions.js
import React, { useState} from 'react';
import Header from './SuggestionsHeader';
import './suggestion.css'; // Assuming this file contains styles for your component

const Suggestions = () => {
  const [searchValue, setSearchValue] = useState('Search');

  const handleFocus = () => {
    if (searchValue === 'Search') {
      setSearchValue('');
    }
  };

  const handleBlur = () => {
    if (searchValue === '') {
      setSearchValue('Search');
    }
  };

  return (
    <div>
      <div className="Rectangle5">
        <div>
          <div className="container1">
            <div className="Rectangle24">
              <a href="Suggestion.js">
                <div className="SUGGESTION">SUGGESTION</div>
              </a>
            </div>
            <div className="Rectangle24">
              <a href="SuggestionHeader.js">
                <div className="SUGGESTION">PLANNER</div>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="container2">
            <div className="searchbar">
              <input
                type="search"
                id="search"
                className="searchbox"
                value={searchValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="container4 wheatimage">
              <div className="textbox">
                <div className="wheat">wheat</div>
              </div>
            </div>
            <div className="container4 appleimage">
              <div className="textbox">
                <div className="apple">apple</div>
              </div>
            </div>
            <div className="container4 raddishimage">
              <div className="textbox">
                <div className="raddish">raddish</div>
              </div>
            </div>
            <div className="container4 carrotimage">
              <div className="textbox">
                <div className="carrot">carrot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
