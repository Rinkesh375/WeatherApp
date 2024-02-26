import React, { useState, useEffect } from 'react';
import axios from 'axios';

// WeatherApp component
const WeatherApp = () => {
  // State variables
  const [city, setCity] = useState('');         // Selected city
  const [weatherData, setWeatherData] = useState(null); // Weather data for the selected city

  // Effect hook to fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  // Function to fetch weather data from the API
  const fetchWeatherData = async (selectedCity) => {
    try {
      // Fetch weather data using Axios
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=bb73b98ff82528b34fde7a563be7d047`);
      // Update weather data state
      setWeatherData(response.data);
    } catch (error) {
      // Log error if fetching data fails
      console.error('Error fetching weather data:', error);
      // Reset weather data state
      setWeatherData(null);
    }
  };

  // Function to render weather forecast
  const renderForecast = () => {
    // Check if weather data is available and has forecast list
    if (!weatherData || !weatherData.list) {
      // Render message if no forecast available
      return <div>No forecast available</div>;
    }

    // Filter forecast data for the next 4 days
    const forecastData = weatherData.list.filter((item, index) => index % 8 === 0).slice(0, 4);

    return (
      // Render forecast cards
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {forecastData.map((item, index) => (
          <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", padding: "1rem" }}>
            <h3>{index === 0 ? "Current Weather" : new Date(item.dt * 1000).toDateString()}</h3>
            <p>Temperature: {convertKelvinToCelsius(item.main.temp)}°C</p> {/* Convert temperature from Kelvin to Celsius */}
            <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="Weather Icon" />
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    );
  };

  // Function to convert temperature from Kelvin to Celsius
  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15); // Convert Kelvin to Celsius and round to nearest integer
  };

  // Render method
  return (
    <div>
      <h1>Weather App</h1>
      {/* Dropdown to select the city */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select a city</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
        <option value="Singapore">Singapore</option>
        <option value="Kuala Lumpur">Kuala Lumpur</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Athens">Athens</option>
      </select>
      {/* Render weather forecast if data is available */}
      {weatherData && (
        <div>
          <h2>Weather Forecast for {city}</h2>
          {renderForecast()}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
