import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Weather.css";

function WeatherApp() {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");

    const apiKey = '30d4741c779ba94c470ca1f63045390a';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`);
                if (response.status === 200) {
                    console.log(response);
                    setData(response.data);
                }
            } catch (error) {
                console.log("Error...City not found!", error);
                alert("City not found!");
            }
        };

        if (city) {
            fetchData();
        }
    }, [city, apiKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cityInput = e.target.elements.city.value.trim();

        if (cityInput && cityInput !== city) {
            setCity(cityInput);
        }
    };

    return (
        <div>
            <h1>Weather Report</h1>
            <div className="container">
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="city" placeholder="Enter city..." className="input" />
                    <button type="submit" className="button">Search</button>
                </form>
                {data && (
                    <div className="weather-info">
                        <h3>{data.name}</h3>
                        <p>Temperature: {data.main.temp}°F</p>
                        <p>Weather: {data.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherApp;
