// getWeather.js
// Helper function to get the weather information from the API

export async function getWeather(cityName) {
  // define variable for the API connection
  const apiKey = '041c6095b46899deeb41d26b502d85a7';
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    // fetch data from API
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Check if response is successful
    if (response.ok) {
      // Extract relevant weather data from API response
      const weatherData = { 
        main: data.weather[0].main,
        city: data.name,
        weather: data.weather[0].description,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      };
      return weatherData;
    } else {
      // Throw error if response is not successful
      throw new Error(data.message || 'Failed to fetch weather data');
    }
  } catch (error) {
    // Log and return null if an error occurs during the fetch operation
    console.error('Error fetching weather data:', error);
    return null;
  }
}

