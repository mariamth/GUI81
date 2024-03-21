import axios from 'axios';

export const getMonthlyWeather = async (cityName) => { // Change to named export
    const apiKey = '44d17bc3b966c0ebadfef746fc5e2425';
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast/climate';
    const params = {
        q: cityName,
        appid: apiKey,
        cnt: 3
    };

    try {
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            throw new Error(`Error: Unable to fetch monthly weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};
