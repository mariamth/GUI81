import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import MonthlyWeather from './components/MonthlyWeather';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={CurrentWeather} />
        <Route path="/daily" component={DailyWeather} />
        <Route path="/monthly" component={MonthlyWeather} />
        <div style={{ padding: '20px' }}>
          <h2>Welcome to Group 81's Weather App!</h2>
          <p>This is a simple weather application built with React.</p>
          <p>Use the navigation links above to explore different sections of the app.</p>
        </div>
      </div>
    </Router>
  );
};

export default App;
