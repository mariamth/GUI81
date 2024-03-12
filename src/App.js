import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
//import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import MonthlyWeather from './components/MonthlyWeather';
import Statistics from './components/Statistics';

function App(){
  return (
    <><div>
      <h1>Rish</h1>
    </div><Router>
        <Routes>
          <Route path="/" component={<Statistics />} />
          <Route path="/daily" component={<DailyWeather />} />
          <Route path="/monthly" component={<MonthlyWeather />} />
        </Routes>
      </Router></>
  );
}

export default App;
