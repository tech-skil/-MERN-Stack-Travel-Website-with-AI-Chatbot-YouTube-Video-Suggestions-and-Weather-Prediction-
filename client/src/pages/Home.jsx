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

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({ places: 0, reviews: 0, clients: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

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

  const getTopPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=packageRating&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setTopPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTopPackages();

    // Counter animation
    const interval = setInterval(() => {
      setCounts((prevCounts) => ({
        places: prevCounts.places < 126 ? prevCounts.places + 1 : 126,
        reviews: prevCounts.reviews < 486 ? prevCounts.reviews + 5 : 486,
        clients: prevCounts.clients < 836 ? prevCounts.clients + 8 : 836,
      }));
    }, 20);

    return () => clearInterval(interval);
  }, [getTopPackages]);

  const handleWeatherSearch = async () => {
    if (!search) {
      setError("Please enter a location");
      return;
    }

    setError(null);
    setWeatherData(null);
    setLoading(true);

    try {
      // First, get coordinates from the city name using OpenCage Geocoding API
      const geocodingResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(search)}&key=YOUR_OPENCAGE_API_KEY`);
      const geocodingData = await geocodingResponse.json();

      if (geocodingData.results.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lng } = geocodingData.results[0].geometry;

      // Now use these coordinates to get weather data
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=YOUR_OPENWEATHERMAP_API_KEY`);
      
      if (!weatherResponse.ok) {
        throw new Error(`HTTP error! status: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      setWeatherData({
        city_name: weatherData.name,
        temp: weatherData.main.temp,
        weather: {
          description: weatherData.weather[0].description
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <div className="text-white font-bold flex items-center mb-4">
              <span className="w-16 mx-2  h-[2px] bg-orange-500 "></span>
              WELCOME TO KARNATAKA
              <span className="w-16 mx-2  h-[2px] bg-orange-500 "></span>
            </div>
            <h1 className="text-white text-2xl md:text-4xl text-center font-bold mb-4">
              Discover Current Weather Now
            </h1>
            <div className="flex items-center">
              <input
                type="text"
                className="rounded-l-lg outline-none w-48 md:w-64 px-2 py-2 border"
                placeholder="Enter city name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleWeatherSearch}
                className="bg-orange-500 text-white px-4 py-2 md:py-3 rounded-r-lg hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : <FaSearch />}
              </button>
            </div>
            {weatherData && (
              <div className="mt-4 bg-white bg-opacity-80 p-4 rounded-lg">
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
              <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg">
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
            <p className="text-gray-600 mb-8">
              Triplo serves as digital portals, offering a seamless blend of
              information, inspiration, and convenience, making travel planning
              an exciting and effortless experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "🏰", label: "Places", count: counts.places },
                { icon: "👥", label: "Reviews", count: counts.reviews },
                { icon: "🧑‍🤝‍🧑", label: "Clients", count: counts.clients },
              ].map((stat, index) => (
                <div key={index} className="text-center border p-4 rounded-lg">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {stat.count}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
              <Link to="/about">ABOUT US</Link>
            </button>
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