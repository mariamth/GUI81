import axios from 'axios';

const getMonthlyWeather = async (cityName) => {
    const apiKey = '1cf47b1a8436f92ddbb0b414940ac1b8'; 
    const baseUrl = 'https://pro.openweathermap.org/data/2.5/forecast/climate';
    const params = {
        q: cityName,
        appid: apiKey,
        units: 'metric',
    };

    try {
        const response = await axios.get(baseUrl, { params });
        if (response.status === 200) {
            const data = response.data;
            const monthlyData = data.list.map(day => {
                return {
                    date: day.dt,
                    temperature: {
                        day: day.temp.day,
                        min: day.temp.min,
                        max: day.temp.max,
                    },
                    weather: {
                        description: day.weather[0].description,
                        icon: day.weather[0].icon
                    },
                };
            });
            return monthlyData;
        } else {
            throw new Error(`Error: Unable to fetch monthly weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export default getMonthlyWeather;
