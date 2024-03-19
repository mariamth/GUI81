
import axios from 'axios';

const get5DayData = async (cityName) => {
    const apiKey = "041c6095b46899deeb41d26b502d85a7"; // Replace "YOUR_API_KEY" with your OpenWeatherMap API key
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast";
    const params = {
        q: cityName,
        appid: apiKey,
        units: "metric"
    };

    try {
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) {
            const data = response.data;
            const dailyData = data.list.slice(0, 5).map(forecast => {
                return {
                    date: forecast.dt_txt.split(' ')[0],
                    temperature: forecast.main.temp_max,
                    humidity: forecast.main.humidity,
                    wind_speed: forecast.wind.speed
                };
            });
            return dailyData;
        } else {
            throw new Error(`Error: Unable to fetch weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export default get5DayData;
