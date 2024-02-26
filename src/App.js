// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const cities = ['Ho Chi Minh', 'Singapore', 'Kuala Lumpur', 'Tokyo', 'Athens'];

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      );

      // Filter data for today and the next 3 days
      const today = new Date().getDate();
      const next3DaysData = response.data.list.filter(
        (item) => item.dt_txt.includes('12:00:00') && new Date(item.dt * 1000).getDate() >= today
      );

      setWeatherData(next3DaysData);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    // Fetch initial weather data when the component mounts
    if (selectedCity) {
      handleCityChange(selectedCity);
    }
  }, [selectedCity]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <select onChange={(e) => handleCityChange(e.target.value)} value={selectedCity}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {weatherData && (
        <div>
          <h2>Weather forecast for {selectedCity}</h2>
          <ul>
            {weatherData.map((item) => (
              <li key={item.dt}>
                {new Date(item.dt * 1000).toLocaleDateString()}
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p>Temperature: {kelvinToCelsius(item.main.temp).toFixed(2)} &deg;C</p>
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
}

export default App;
