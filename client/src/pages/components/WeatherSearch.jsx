import React, { useState, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log(API_KEY);
if (!API_KEY) {
  throw new Error("API key not found!");
}

const WeatherSearch = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleWeatherSearch = useCallback(async () => {
    if (!search) {
      setError("Please enter a location");
      return;
    }

    setError(null);
    setWeatherData(null);
    setLoading(true);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setWeatherData({
        city_name: data.name,
        temp: data.main.temp,
        weather: {
          description: data.weather[0].description
        }
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleWeatherSearch();
    }
  };

  const handleClearWeatherData = () => {
    setWeatherData(null);
    setSearch("");
  };

  return (
    <>
      <div className="flex items-center w-full max-w-sm my-5">
        <input
          type="text"
          className="rounded-l-lg outline-none w-full px-2 py-2 border"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleWeatherSearch}
          className="bg-orange-500 text-white px-4 py-3 rounded-r-lg hover:bg-orange-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Loading...' : <FaSearch />}
        </button>
      </div>
      {weatherData && (
        <div className="mt-4 bg-white bg-opacity-80 p-4 rounded-lg w-fit max-w-sm relative">
          <button
            onClick={handleClearWeatherData}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {weatherData.city_name}
          </h2>
          <p className="text-base md:text-lg">
            Temperature: {weatherData.temp}°C
          </p>
          <p className="text-base md:text-lg">
            Weather: {weatherData.weather.description}
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg w-full max-w-md">
          {error}
        </div>
      )}
    </>
  );
};

export default WeatherSearch;