
// Function to get the weather from OpenWeatherMap
async function getWeather(cityName) {
    // USing the API keys and the url to get imformation for a specific city
    const apiKey = "041c6095b46899deeb41d26b502d85a7";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        // Make the API request using await for better readability
        const response = await fetch(apiUrl);
        
        // Check if the request was successful
        if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
        }


      const data = await response.json();
      return data;
    } 
    catch (error) {
      // Handle errors
      console.error(`Error fetching weather: ${error.message}`);
      throw error; // Propagate the error for handling in the calling code
    }
  }