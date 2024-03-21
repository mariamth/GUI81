
import axios from 'axios';

const get5DayData = async (cityName) => {
    const apiKey = "44d17bc3b966c0ebadfef746fc5e2425"; 
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
            const dailyData = data.list.slice(0, 40).map(forecast => {
                return {
                    date: forecast.dt_txt.split(' ')[0],
                    time: forecast.dt_txt.split(' ')[1],
                    temperature: forecast.main.temp_max,
                    wind_speed: forecast.wind.speed,
                    clouds:forecast.clouds.all
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
