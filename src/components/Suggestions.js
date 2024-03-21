import React, { useEffect, useState } from 'react';
import Header from './SuggestionsHeader';
import Planner from './planner.js'; // Assuming you have Planner.js file
import './suggestion.css'; // Assuming this file contains styles for your component
import { getWeather } from './useful_functions/getWeather';

const Suggestions = () => {
  const [searchValue, setSearchValue] = useState('Search');
  const [cropsToGrow, setCropsToGrow] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('suggestions'); // Default screen is suggestions
  let crops = [];

  useEffect(() => {
    const fetchData = async () => {
      const cityName = 'London';

      try {
        const weatherData = await getWeather(cityName);
        if (weatherData) {
          const temperature = weatherData.temperature;

          // Determine crops based on temperature
          if (temperature > 5 && temperature<=10 ) {
            crops = [
              { name: "Carrot", image: "/assets/carrot" },
              { name: "Lettuce", image: "/assets/lettuce" },
              { name: "Spinach", image: "/assets/spinach"},
              { name: "Apple", image: "assets/apple"}
            ];
          }
          else if (temperature > 10 && temperature<=15){
            crops = [
              { name: "Tomato", image: "assets/tomatoes"},
              { name: "Cucumber", image: "assets/cucumbers"},
              { name: "Garlic", image: "assets/garlic"},
              { name: "Grapes", image: "assets/grapes"}
            ]
          }

          else if (temperature > 15 && temperature<=20){
            crops = [
              { name: "Peppers", image: "assets/peppers"},
              { name: "corn", image: "assets/SweetCorn"},
              { name: "Onions", image: "assets/onions"},
              { name: "Green Peas", image: "assets/peas"}
            ]
          }

          else if (temperature > 20 && temperature<=25){
            crops = [
              { name: "Sweet Potatoes", image: "assets/SweetPotatoes"},
              { name: "wheat", image: "assets/wheat"},
              { name: "Tomato", image: "assets/tomatoes"},
              { name: "Corn", image: "assets/SweetCorn"}
            ]
          }

          else {
            crops = [
              { name: "Extreme Weather - No Crops suitable for agriculture.", image: "/assets/Extreme.jpg" }
            ];
          }
        }
        setCropsToGrow(crops);
      }
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header setCurrentScreen={setCurrentScreen} />
      
      {currentScreen === 'suggestions' ? (

        <div className='Scontainer'>
            <div className="Slarge-container">

              {cropsToGrow.map((crop, index) => (
                <div key={index} className={`S-entry ${crop.name.toLowerCase()}image`}>
                  <div className='Sbox-title'>{crop.name}</div>
                </div>
              ))}

        {/* 
        <div className="Rectangle5">
          <div className="container2">
            {cropsToGrow.map((crop, index) => (
              <div key={index} className={`container4 ${crop.name.toLowerCase()}image`}>
                <div className="textbox">
                  <div className={crop.name.toLowerCase()}>{crop.name}</div>
              </div>
            </div>
          ))}
        */}

          </div>
        </div>
      ) : (
        <Planner />
      )}
    </div>
  );
};

export default Suggestions;
