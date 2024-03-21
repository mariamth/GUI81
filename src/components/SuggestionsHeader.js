
import React from 'react';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ setCurrentScreen }) => {
  return (
    <>
      <nav className='s-header'>
        <ul className='s-list'>
          <button className="s-default" onClick={() => setCurrentScreen('planner')}>Planner</button>
          <button className="s-default" onClick={() => setCurrentScreen('suggestions')}>Suggestions</button>
        </ul>
      </nav>

      {/* <div className="header">
        <button className="planner-button" onClick={() => setCurrentScreen('planner')}>Planner</button>
        <button className="suggestions-button" onClick={() => setCurrentScreen('suggestions')}>Suggestions</button>
      </div> */}

    </>
  );
};

export default SuggestionsHeader;