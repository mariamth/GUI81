// getHourlyWeather.js
// Function to fetch hourly weather data from the API
import axios from 'axios';

export const getHourlyWeather = async (cityName) => {
  //variables for he 
  const apiKey = '1cf47b1a8436f92ddbb0b414940ac1b8'; 
  const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  //parameters for the API request
  const params = {
    q: cityName,
    appid: apiKey,
    units: 'metric',
    cnt: 3 // Getting 3 sets of 3 hour forcasts
  };

  try {
    const response = await axios.get(baseUrl, { params });

    //checks if response is successful
    if (response.status === 200) {
      const data = response.data;
      //extracts the relevant data for the 
      const hourlyData = data.list.slice(0, 3).map(hour => {
        return {
          dt_txt: hour.dt_txt,
          main: {
            temp: hour.main.temp
          },
          weather: [
            {
              description: hour.weather[0].description, // hours and description of the weather
              icon: hour.weather[0].icon //icons for the weather
            }
          ]
        };
      });
      return hourlyData;
    //Error handling
    } else {
      throw new Error(`Error: Unable to fetch hourly weather data. Status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
export default getHourlyWeather;