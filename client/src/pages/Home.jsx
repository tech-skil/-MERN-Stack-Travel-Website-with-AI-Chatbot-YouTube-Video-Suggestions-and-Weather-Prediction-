import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import homeVideo from "../assets/vedios/home.mp4";
import ChatIcon from "./ChatIcon";
import gokarnaImage from "../assets/images/gokarna.jpg";
import coorgImage from "../assets/images/coorg.jpeg";
import AgumbeImage from "../assets/images/Agumbe.jpg";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log(API_KEY)
if (!API_KEY) {
  throw new Error("API key not found!");
}

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const springs = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const destinations = [
    {
      name: "Coorg",
      season: "Summer",
      description:
        'Known as the "Cherrapunji of the South" for its high rainfall, this town offers a lush, waterfall-rich landscape best experienced during the monsoon season.',
      image: coorgImage,
    },
    {
      name: "Agumbe",
      season: "Winter",
      description:
        "Agumbe lies in a hilly, wet region of the Western Ghat mountains. This geography contributes to its scenery, and suitability for trekking.",
      image: AgumbeImage,
    },
    {
      name: "Gokarna",
      season: "Winter",
      description:
        "This beach town, favored by backpackers and yoga enthusiasts, offers uncrowded beaches in winter with ideal weather for swimming, sunbathing, and surfing.",
      image: gokarnaImage,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + destinations.length) % destinations.length
    );
  };

  const handleWeatherSearch = async () => {
    if (!search) {
      setError("Please enter a location");
      return;
    }

    setError(null);
    setWeatherData(null);
    setLoading(true);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=karnataka&appid=df052e108bd61b2440934a3991e149ff`);
      console.log(response)
      
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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="w-full h-screen relative">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover absolute"
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 ">
            <div className="text-white font-bold flex items-center mb-4 text-sm md:text-base pt-16 ">
              <span className="w-8 md:w-16 mx-2 h-[2px] bg-orange-500"></span>
              WELCOME TO KARNATAKA
              <span className="w-8 md:w-16 mx-2 h-[2px] bg-orange-500"></span>
            </div>
            <h1 className="text-white text-xl md:text-4xl text-center font-bold mb-4">
              Discover Current Weather Now
            </h1>
            <div className="flex items-center w-full max-w-sm my-5">
              <input
                type="text"
                className="rounded-l-lg outline-none w-full px-2 py-2 border"
                placeholder="Enter city name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
              <div className="mt-4 bg-transparent blur-xl bg-opacity-80 p-4 rounded-lg w-full max-w-md">
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
          </div>
        </div>
        

        <div className="container mx-auto px-4 py-12">
          <div className="my-12 bg-white p-4 md:p-8 rounded-lg shadow-md">
            <h3 className="text-orange-500 font-semibold mb-2">ABOUT US</h3>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Welcome to <span className="text-orange-500">TRIPLO</span>
            </h2>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-8">
                <div className="grid grid-cols-2 gap-4">
                  <animated.div style={springs} className="w-48 h-48 ml-32 mt-24 mb-3 overflow-hidden">
                    <img
                      src={coorgImage}
                      alt="Travel image 1"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-72 h-72 mb-3 overflow-hidden">
                    <img
                      src={AgumbeImage}
                      alt="Travel image 2"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-32 h-32 ml-48 overflow-hidden">
                    <img
                      src={gokarnaImage}
                      alt="Travel image 3"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-48 h-48 overflow-hidden">
                    <img
                      src={coorgImage}
                      alt="Travel image 4"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Triplo serves as a digital gateway, opening up the world's wonders to visitors right from their screens. We offer a seamless blend of information, inspiration, and convenience, making travel planning an exciting and effortless experience.
                </p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                  <Link to="/about">ABOUT US</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="my-12">
            <h3 className="text-center text-orange-500 font-semibold mb-2">
              OUR PLACES
            </h3>
            <h2 className="text-center text-2xl md:text-4xl font-bold mb-8">
              Explore Our <span className="text-orange-500">PLACES</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((place, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-orange-500 text-white px-2 py-1 rounded-full text-sm mb-2">
                      {place.season}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-4">{place.description}</p>
                    <button className="text-orange-500 font-semibold hover:underline">
                      VIEW DETAIL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white py-8 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Popular Destinations
              </h2>
              <div className="relative overflow-hidden mx-auto w-full md:w-3/4">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {destinations.map((dest, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="bg-white text-black p-4 md:p-6 rounded-lg shadow-lg mx-2 md:mx-4">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                          {dest.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{dest.season}</p>
                        <p className="text-sm md:text-base">
                          {dest.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        <ChatIcon />
      </div>
    </div>
  );
};

export default Home;