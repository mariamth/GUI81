
import axios from 'axios';

const get10DayData = async (cityName) => {
    const apiKey = "661bf70131b99d55ee4a1bdda76aaa07"; 
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily";
    // API Documentation https://openweathermap.org/forecast5
    const params = {
        q: cityName,
        appid: apiKey,
        units: "metric",
        cnt: 10
    };

    try {
        // Call API with parameters and store result in variable
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) { // Successful response
            const data = response.data;
            
            const dailyData = data.list.slice(0, 10).map(list => {
                // Extract first 10 list from API response
                // then iterate over them
                return {
                    // Extract following information (used API documentaion)
                    // Returns object with following fields
                    date: list.dt,
                    desc: list.weather[0].description,
                    icon: list.weather[0].icon,
                    temp_min: list.temp.min,
                    temp_max: list.temp.max
                };
            });
            // Return array of created objects
            return dailyData;

            // Error catching
        } else {
            throw new Error(`Error: Unable to fetch weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export default get10DayData;