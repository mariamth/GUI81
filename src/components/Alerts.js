import React, { useState, useEffect } from 'react';
import './Alerts.css';
import High from './assets/High.png';
import Medium from './assets/Medium.png';
import Low from './assets/Low.png';
import None from './assets/None.png';
import get5DayData from './useful_functions/get5DayDataforAlerts';

const Alerts = () => {
    const [weatherResults, setWeatherResults] = useState(null);
    const [city, setCity] = useState('London');
    const [fiveDayWeather, setFiveDayWeather] = useState(null);

    //get weather forecast (temp, cloud coverage, wind speed)
    const fetchWeatherData = async (city) => {
        try {
            const fiveDayData = await get5DayData(city);
            setFiveDayWeather(fiveDayData);
            //call to break foreacst down  into dictionary of results
            setWeatherResults(getWeatherResults(fiveDayData));
            console.log(getWeatherResults(fiveDayData));
        } catch (error) {
            setFiveDayWeather(null);
            setWeatherResults(getWeatherResults(null))
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData(city)
    }, []);

    //update the city when input changes
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    // function to fill a results dictionary of the value along with the time of first
    // occurence and the highest occurence of the alerts
    function getWeatherResults(weatherData) {
        let result = {
            firstFrost: null,
            lowestTemp: { value: Number.MAX_VALUE, date: null, hour: null },
            firstCloud: null,
            highestCloud: { value: 0, date: null, hour: null },
            firstWind: null,
            highestWindSpeed: { value: 0, date: null, hour: null }
        };
        if (weatherData=== null){
            return
        }
        //looping through each 3 hour interval
        weatherData.forEach(data => {
            //set first frost if temp is lower then 0
            if (data.temperature < 0 && result.firstFrost === null) {
                result.firstFrost = { value: data.temperature, date: data.date, hour: data.time };
            }
            //updates lowestTemp
            if (data.temperature < result.lowestTemp.value) {
                result.lowestTemp.value = data.temperature;
                result.lowestTemp.date = data.date;
                result.lowestTemp.hour = data.time;
            }

            //set first cloud value if coverage is more then 25%
            if (data.clouds > 25 && result.firstCloud === null) {
                result.firstCloud = { value: data.clouds, date: data.date, hour: data.time };
            }
            //updaytes highest cloud coverage
            if (data.clouds > result.highestCloud.value) {
                result.highestCloud.value = data.clouds;
                result.highestCloud.date = data.date;
                result.highestCloud.hour = data.time;
            }

            //set first wind value if wind speed is more then 2 m/s
            if (data.wind_speed > 2 && result.firstWind === null) {
                result.firstWind = { value: data.wind_speed, date: data.date, hour: data.time };
            }
            //updaytes highest wind speed
            if (data.wind_speed > result.highestWindSpeed.value) {
                result.highestWindSpeed.value = data.wind_speed;
                result.highestWindSpeed.date = data.date;
                result.highestWindSpeed.hour = data.time;
            }
        });
        return result; 
    }

    return (
        <div id="screen">
            <div id="container">
                <h1 id='title'>Incoming Alerts</h1>

                {/* Severity key Bar */}
                <div class="S-bar">
                    <ul>
                        <li> <img src={None} class="dot" />None</li>
                        <li> <img src={Low} class="dot" />Low</li>
                        <li> <img src={Medium} class="dot" />Medium</li>
                        <li><img src={High} class="dot" /> High</li>
                    </ul>
                </div>
                {/* input box to change city */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Get Weather</button>
                </form><br/>
                <h2>Location: {city}</h2><br />

                {/* Alert bars */}
                <div class="alertContainer">
                    {weatherResults ? (
                        <>
                            <AlertItem type="Frost" wResults={weatherResults} />
                            <AlertItem type="High Winds" wResults={weatherResults} />
                            <AlertItem type="High Cloud Coverage" wResults={weatherResults} />
                        </>
                    ) : (
                        // if city/country doesnt exist
                        <p>Failed to load alerts, please enter a country or city</p>
                    )}
                </div>
            </div>
        </div>
    );

};
const AlertItem = ({ type, wResults }) => {

    //checking for occurence of first alert for each type
    function isAlert(type) {
        console.log(11, wResults)
        switch (type) {
            case "Frost":
                return wResults.firstFrost === null;
            case "High Cloud Coverage":
                return wResults.firstCloud === null;
            case "High Winds":
                return wResults.firstWind === null;
            default:
                return false;
        }
    };

    //get time of first alert
    function getStartTime(type) {
        let startTime
        if (isAlert(type)) {
            return None
        }
        else {
            switch (type) {
                case "Frost":
                    startTime = new Date(`${wResults.firstFrost.date}T${wResults.firstFrost.hour}`)
                    break;
                case "High Cloud Coverage":
                    startTime = new Date(`${wResults.firstCloud.date}T${wResults.firstCloud.hour}`)
                    break;
                case "High Winds":
                    startTime = new Date(`${wResults.firstWind.date}T${wResults.firstWind.hour}`)
                    break;
            }
        }
        return startTime
    }
    //get time of last alert
    function getEndTime(type) {
        let endTime
        if (isAlert(type)) {
            return None
        }
        else {
            switch (type) {
                case "Frost":
                    endTime = new Date(`${wResults.lowestTemp.date}T${wResults.lowestTemp.hour}`)
                    break;
                case "High Cloud Coverage":
                    endTime = new Date(`${wResults.highestCloud.date}T${wResults.highestCloud.hour}`)
                    break;
                case "High Winds":
                    endTime = new Date(`${wResults.highestWindSpeed.date}T${wResults.highestWindSpeed.hour}`)
                    break;
            }
        }
        return endTime
    }
    //formating the end date, declaring the remaining time until the the first occurence starts
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const endTime = getEndTime(type);
    const formattedDate = endTime.toLocaleString(undefined, options);

    //get the difference between current time and first alert ime
    function getRemaingTime(time) {
        const currentTime = Math.floor(Date.now());
        const remainingTime = Math.round((time - currentTime) / 1000 / 60 / 60);
        return remainingTime
    }

    //geting background depending on alert type
    function getBackground(type) {
        switch (type) {
            case "Frost":
                return "frost";
            case "High Cloud Coverage":
                return "cloud";
            case "High Winds":
                return "wind";
        }
    }
    //getting severity of alert to display depending on the value
    function getSeverity(type) {
        console.log("S", wResults)
        switch (type) {
            case "Frost":
                return wResults.firstFrost !== null ?
                    (wResults.lowestTemp.value < -4 ? "high" :
                        (wResults.lowestTemp.value < -2 ? "medium" : "low")) :
                    "none";
            case "High Cloud Coverage":
                return wResults.firstCloud !== null ?
                    (wResults.highestCloud.value > 75 ? "high" :
                        (wResults.highestCloud.value > 50 ? "medium" : "low")) :
                    "none";
            case "High Winds":
                return wResults.firstWind !== null ?
                    (wResults.highestWindSpeed.value > 16 ? "high" :
                        (wResults.highestWindSpeed.value > 10 ? "medium" : "low")) :
                    "none";
        }
    }
    return (
        //changes background according to type
        <div class="alertItem" id={getBackground(type)}>
            <div class="alert" >
                {isAlert(type) ? (
                    <>
                        <h2>{type}</h2>
                        <p>No {type} Warning</p>
                    </>
                ) : (
                    <>
                    {/* display alert info */}
                        <text style={{ fontWeight: 'bold' }}>{type}</text><br />
                        {type === "Frost" && (<>{wResults.lowestTemp.value} °C</>)}
                        {type === "High Cloud Coverage" && (<>{wResults.highestCloud.value}% Cloud Coverage</>)}
                        {type === "High Winds" && (<>{wResults.highestWindSpeed.value} m/s</>)}
                        <br />
                        {/*display time info*/}
                        In {<>{getRemaingTime(getStartTime(type))}</>} hours <br />
                        Expires {formattedDate}<br />
                    </>)}
                    {/* display severity */}
                < div class="end" id={getSeverity(type)}></div>
            </div>
        </div >
    );
};

export default Alerts;