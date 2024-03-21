
import React from 'react';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ setCurrentScreen }) => {
  return (
    <div className="header">
      <button className="planner-button" onClick={() => setCurrentScreen('planner')}>Planner</button>
      <button className="suggestions-button" onClick={() => setCurrentScreen('suggestions')}>Suggestions</button>
    </div>
  );
};

export default SuggestionsHeader;