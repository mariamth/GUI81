
import axios from 'axios';

const get10DayData = async (cityName) => {
    const apiKey = "661bf70131b99d55ee4a1bdda76aaa07"; // Replace "YOUR_API_KEY" with your OpenWeatherMap API key
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily";
    // api https://openweathermap.org/forecast5
    const params = {
        q: cityName,
        appid: apiKey,
        units: "metric",
        cnt: 10
    };

    try {
        const response = await axios.get(baseUrl, { params });
        console.log(response)
        if (response.status === 200) {
            const data = response.data;
            const dailyData = data.list.slice(0, 10).map(list => {
                return {
                    date: list.dt,
                    desc: list.weather[0].description,
                    icon: list.weather[0].icon,
                    temp_min: list.temp.min,
                    temp_max: list.temp.max
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

export default get10DayData;