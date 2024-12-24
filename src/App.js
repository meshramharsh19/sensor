import React, { useState, useEffect } from "react";

const App = () => {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(40);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch temperature and humidity data every 2 seconds
    const intervalId = setInterval(() => {
      getTemperatureData();
      getHumidityData();
    }, 2000);

    // Fetch and display time/date every second
    const timeIntervalId = setInterval(() => {
      updateTimeDate();
    }, 1000);

    // Clean up intervals on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  const getTemperatureData = async () => {
    try {
      const response = await fetch("http://localhost:5000/readTemperature");
      const data = await response.text();
      setTemperature(data);
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  };

  const getHumidityData = async () => {
    try {
      const response = await fetch("http://localhost:5000/readHumidity");
      const data = await response.text();
      setHumidity(data);
    } catch (error) {
      console.error("Error fetching humidity data:", error);
    }
  };

  const updateTimeDate = () => {
    const now = new Date();
    setTime(now.toLocaleTimeString());
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setDate(`${dayNames[now.getDay()]}, ${now.getDate()}-${monthNames[now.getMonth()]}-${now.getFullYear()}`);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>NodeMCU ESP8266 Monitoring Sensor DHT11</h1>
      <p>
        <i className="fa fa-thermometer-half" style={{ fontSize: "3.0rem", color: "#62a1d3" }}></i>
        <span style={{ fontSize: "1.5rem" }}>Temperature: </span>
        <span>{temperature}</span>
        <sup style={{ fontSize: "1.2rem" }}>&deg;C</sup>
      </p>
      <p>
        <i className="fa fa-tint" style={{ fontSize: "3.0rem", color: "#75e095" }}></i>
        <span style={{ fontSize: "1.5rem" }}>Humidity: </span>
        <span>{humidity}</span>
        <sup style={{ fontSize: "1.2rem" }}>%</sup>
      </p>
      <p>
        <i className="far fa-clock" style={{ fontSize: "1.0rem", color: "#e3a8c7" }}></i>
        <span style={{ fontSize: "1.0rem" }}>Time: </span>
        <span style={{ fontSize: "1.0rem" }}>{time}</span>
        <i className="far fa-calendar-alt" style={{ fontSize: "1.0rem", color: "#f7dc68" }}></i>
        <span style={{ fontSize: "1.0rem" }}>Date: </span>
        <span style={{ fontSize: "1.0rem" }}>{date}</span>
      </p>
      <p>
        <i className="fa fa-thermometer-2" style={{ fontSize: "1.0rem", color: "red" }}></i>
        <span style={{ fontSize: "1.0rem" }}>Check Website for More Details: </span>
        <a href="http://cojag.in/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.0rem" }}>
          Cojag Smart Technology Private Limited
        </a>
      </p>
    </div>
  );
};

export default App;
