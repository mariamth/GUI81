// Alerts.js
import High from './assets/High.png';
import Medium from './assets/Medium.png';
import Low from './assets/Low.png';
import None from './assets/None.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Alerts.css';


const Alerts = () => {
  const APIkey = '44d17bc3b966c0ebadfef746fc5e2425';
  const [long, setLong] = useState(-0.1);
  const [lat, setLat] = useState(51);
  const [tempData, setTempData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [cloudData, setCloudData] = useState(null);

  const fetchData = async (condition, expression, amount) => {
    try {
      const requestData = {
        time_period: {
          start: {
            expression: "after",
            amount: 43200000
          },
          end: {
            expression: "after",
            amount: 604000000
          }
        },
        conditions: [
          {
            name: condition,
            expression: expression,
            amount: amount // Adjust amount based on condition
          }
        ],
        area: [
          {
            type: "Point",
            coordinates: [long, lat] //long, lat
          }
        ]
      };
      const response = await axios.post(
        `http://api.openweathermap.org/data/3.0/triggers?appid=${APIkey}&`, requestData
      );
      console.log("RES", response)
      if (condition === "temp") {
        setTempData(response.data);
      } else if (condition === "wind_speed") {
        setWindData(response.data);
      } else if (condition === "clouds") {
        setCloudData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("USE")
    fetchData("temp", "$gt", 273.15);
    fetchData("wind_speed", "$gt", 2);
    fetchData("clouds", "$gt", 50);
  }, []);

  const handleLongChange = (e) => {
    setLong(parseInt(e.target.value));
  };

  const handleLatChange = (e) => {
    setLat(parseInt(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(long, lat)

    fetchData("temp", "$gt", 273.15);
    fetchData("wind_speed", "$gt", 2);
    fetchData("clouds", "$gt", 50);
  };

  return (
    <div id="container">
      <h1 id='title'>Incoming Alerts</h1>
      <div class="S-bar">
        <ul>
          <li> <img src={None} class="dot"/>None</li>
          <li> <img src={Low} class="dot"/>Low</li>
          <li> <img src={Medium} class="dot"/>Medium</li>
          <li><img src={High} class="dot"/> High</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          pattern="-?\d*"
          placeholder="Enter long "
          value={long}
          min="-180"
          onChange={handleLongChange}
        />
        <input
          type="text"
          pattern="-?\d*"
          placeholder="Enter lat "
          value={lat}
          min="-90"
          onChange={handleLatChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      

      {tempData && windData && cloudData ? (
        <>
          <h2>Location: {tempData.area[0].coordinates[0]},{tempData.area[0].coordinates[1]}</h2>
          <AlertItem trigger={tempData._id} type="Frost" />
          <AlertItem trigger={windData._id} type="High Winds" />
          <AlertItem trigger={cloudData._id} type="High Cloud Coverage" />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}

    </div>
  );
};

const AlertItem = ({ trigger, type }) => {
  const [alertData, setAlertData] = useState({});
  // const fetchData = async () => {
  //     try {
  //         // Check if trigger is available before making the request
  //         if (trigger) {
  //             const response = await axios.get(`https://api.openweathermap.org/data/3.0/triggers/${trigger}?appid=44d17bc3b966c0ebadfef746fc5e2425`);
  //             setAlertData(response.data.alerts);
  //             console.log("GET",response.data)
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  const fetchData = async () => {

    if (type === "Frost") {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/triggers/65f79412beba32000ff99c3d?appid=44d17bc3b966c0ebadfef746fc5e2425`);
        setAlertData(response.data.alerts);
        console.log("GET", response.data)
      }
      catch (error) {
        console.log(error);
      }
    } else if (type === "High Cloud Coverage") {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/triggers/65f78fdf5da4c7047d1a1c01?appid=44d17bc3b966c0ebadfef746fc5e2425`);
        setAlertData(response.data.alerts);
        console.log("GET CLUD", response.data)
      }
      catch (error) {
        console.log(error);
      }
    } else if (type === "High Winds") {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/triggers/65f79359e3b29f01ffbab87a?appid=44d17bc3b966c0ebadfef746fc5e2425`);
        setAlertData(response.data.alerts);
        console.log("GET", response.data)
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [trigger]);

  const findEarliestAlert = () => {
    let dataArray = [];
    let earliestDate = Infinity;
    let value = 0;
    console.log(alertData);
    for (const alertId in alertData) {
      const alert = alertData[alertId];
      if (alert.date < earliestDate) {
        earliestDate = alert.date;

        if (type === "High Cloud Coverage") {
          value = alert.conditions[0].current_value;

        }
        else if (type === "Frost") {
          value = alert.conditions[0].current_value.min;
          value = Math.round(value - 273.15)
        }
        else if (type === "High Winds") {
          value = alert.conditions[0].current_value;
        }
      }
    }
    dataArray[0] = earliestDate;
    dataArray[1] = value;
    return dataArray;
  };

  const earliestAlert = findEarliestAlert();
  console.log(earliestAlert);
  const Edate = new Date(earliestAlert[0]);
  const Evalue = earliestAlert[1]

  const findLatestAlert = () => {
    let dataArray = [];
    let LatestDate = 0;
    let value = 0;
    console.log(alertData);
    for (const alertId in alertData) {
      const alert = alertData[alertId];
      if (alert.date > LatestDate) {
        LatestDate = alert.date;

        if (type === "High Cloud Coverage") {
          value = alert.conditions[0].current_value;
        }
        else if (type === "Frost") {
          value = alert.conditions[0].current_value.min;
          value = Math.round(value - 273.15)
        }
        else if (type === "High Winds") {
          value = alert.conditions[0].current_value;
        }
      }
    }
    dataArray[0] = LatestDate;
    dataArray[1] = value;
    return dataArray;
  };

  const latestAlert = findLatestAlert();
  const Ldate = new Date(latestAlert[0]);
  const Lvalue = latestAlert[1]


  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',

  };

  const formattedDate = Ldate.toLocaleString(undefined, options);
  const currentTime = Math.floor(Date.now());
  const remainingTime = Math.round((earliestAlert[0] - currentTime) / 1000 / 60 / 60);

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

  function getSeverity(type) {
    switch (type) {
      case "Frost":
        if (Evalue < -4) {
          return "high"
        }
        else if (Evalue < -2) {
          return "medium"
        }
        else if (Evalue < 0) {
          return "low"
        }
        return "none"
      case "High Cloud Coverage":
        if (Evalue > 75) {
          return "high"
        }
        else if (Evalue > 50) {
          return "medium"
        }
        else if (Evalue > 25) {
          return "low"
        }
        return "none"

      case "High Winds":
        if (Evalue > 16) {
          return "high"
        }
        else if (Evalue > 10) {
          return "medium"
        }
        else if (Evalue > 2) {
          return "low"
        }
        return "none"

    }
  }
  return (
    <div class="alertItem" id={getBackground(type)}>
      <div class="alert" >
        {Object.keys(alertData).length === 0 ? (
          <>
            <h2>{type}</h2>
            <p>No {type} Warning</p>
          </>
        ) : (
          <>
            <text style={{ fontWeight: 'bold' }}>{type}</text><br />
            {type === "Frost" && (<>{Evalue} °C</>)}
            {type === "High Cloud Coverage" && (<>{Evalue}% Cloud Coverage</>)}
            {type === "High Winds" && (<>{Evalue} m/s</>)}
            <br />In {remainingTime} hours <br />
            Expires {formattedDate}<br />
          </>
        )}
      </div>
      <div class="end" id={getSeverity(type)}></div>
    </div>
  );
};

export default Alerts;


