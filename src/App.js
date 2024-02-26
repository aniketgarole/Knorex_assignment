import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('Ho Chi Minh');
  const [weatherData, setWeatherData] = useState(null);

  console.log(process.env.REACT_APP_WEATHER_KEY)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <label htmlFor="citySelect">Select City:</label>
      <select id="citySelect" onChange={handleCityChange} value={city}>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
        <option value="Singapore">Singapore</option>
        <option value="Kuala Lumpur">Kuala Lumpur</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Athens">Athens</option>
      </select>

      {weatherData && (
        <div>
          <h2>{weatherData.city.name} Weather Forecast</h2>
          <div>
            {weatherData.list.slice(0, 8).map((data) => (
              <div key={data.dt}>
                <p>{new Date(data.dt * 1000).toLocaleTimeString()}</p>
                <p>{data.main.temp} °C</p>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt={data.weather[0].description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
