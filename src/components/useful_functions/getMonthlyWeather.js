import axios from 'axios';

export const getMonthlyWeather = async (cityName) => {
    // API key for accessing the 
    const apiKey = '1cf47b1a8436f92ddbb0b414940ac1b8';
    // Base URL for the API endpoint
    const baseUrl = 'http://pro.openweathermap.org/data/2.5/forecast/climate';
    // Parameters to be sent with the API request
    const params = {
        q: cityName, // City name
        appid: apiKey, // API key
        units: 'metric' // Temperature unit (Celsius)
    };

    try {
        // GET request to the endpoint with specified parameters
        const response = await axios.get(baseUrl, { params });
        
        // Check if the response status is 200
        if (response.status === 200) {
            // Extract the data from the response
            const data = response.data;
            // Map over each day in the response data to format the weather data
            const monthlyData = data.list.map(day => {
                return {
                    // Format the date of the weather data
                    date: day.dt,
                    // Format the temperature data
                    temperature: {
                        day: day.temp.day, // Daytime temperature
                        min: day.temp.min, // Minimum temperature
                        max: day.temp.max, // Maximum temperature
                    },
                    // format the weather description and icon
                    weather: {
                        description: day.weather[0].description, // Description of weather
                        icon: day.weather[0].icon // Weather icon code
                    },
                };
            });
            // Log the formatted monthly weather data
            console.log(monthlyData);
            // Return the formatted monthly weather data
            return monthlyData;
        } else {
            // Error handling
            throw new Error(`Error: Unable to fetch monthly weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        // Error handling
        throw new Error(`Error: ${error.message}`);
    }
};

// Export function as default
export default getMonthlyWeather;
