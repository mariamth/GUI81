
import React from 'react';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ setCurrentScreen }) => {
  return (
    <>
      <nav className='s-header'>
        <ul className='s-list'>
          <button className="s-button" onClick={() => setCurrentScreen('planner')}>Planner</button>
          <button className="s-button" onClick={() => setCurrentScreen('suggestions')}>Suggestions</button>
        </ul>
      </nav>
    </>
  );
};

export default SuggestionsHeader;