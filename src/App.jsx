import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from './img/weather1.jpg';
import { FaLocationArrow } from 'react-icons/fa';
import {
  WiDaySunny, WiRain, WiCloud, WiThunderstorm, WiSnow, WiFog
} from 'react-icons/wi';

const App = () => {
  const [city, setCity] = useState('Rajkot');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeatherIcon = (desc = '') => {
    const lower = desc.toLowerCase();
    if (lower.includes("sun")) return <WiDaySunny size={90} className="text-yellow-300" />;
    if (lower.includes("rain")) return <WiRain size={90} className="text-blue-300" />;
    if (lower.includes("cloud")) return <WiCloud size={90} className="text-gray-300" />;
    if (lower.includes("thunder")) return <WiThunderstorm size={90} className="text-purple-400" />;
    if (lower.includes("snow")) return <WiSnow size={90} className="text-white" />;
    if (lower.includes("fog")) return <WiFog size={90} className="text-gray-200" />;
    return <WiDaySunny size={90} className="text-yellow-300" />;
  };

  const getWeather = async (customCity = city) => {
    if (!customCity) return;
    try {
      const response = await axios.get('https://api.weatherstack.com/current', {
        params: {
          access_key: '19fa3c71813309e769e235114eff339c',
          query: customCity
        }
      });

      if (response.data.success === false || !response.data.current) {
        setError("❌ City not found.");
        setWeather(null);
      } else {
        setWeather(response.data);
        setError('');
      }
    } catch (err) {
      setError("❌ Something went wrong.");
      setWeather(null);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.weatherstack.com/current', {
          params: {
            access_key: '19fa3c71813309e769e235114eff339c',
            query: 'Rajkot',
          }
        });
        setWeather(response.data);
        setError('');
      } catch (err) {
        setError("❌ Something went wrong.");
        setWeather(null);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      {/* ✅ Mobile-only Gradient Heading */}
      <div className="absolute top-6 text-center sm:hidden z-20 w-full px-4">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-500 bg-clip-text text-transparent drop-shadow-md animate-pulse">
          ☁️ Live Weather Updates 🌈
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[500px] bg-white/10 rounded-[30px] border border-white/30 backdrop-blur-xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <WiDaySunny size={44} className="text-yellow-300 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-blue-300 drop-shadow-lg">
              Bharat Weather
            </h1>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl border border-white/30">
            <FaLocationArrow className="text-white text-lg" />
            <input
              type="text"
              placeholder="Enter city name"
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              onClick={() => getWeather()}
              className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white px-4 py-1.5 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-300 font-semibold mt-2">{error}</p>}
        </div>

        {/* Weather Info */}
        {weather && weather.current && (
          <div className="text-center mt-2 bg-white/10 border border-white/20 rounded-2xl py-6 px-4 flex flex-col items-center gap-3 shadow-inner backdrop-blur-sm text-white">
            {getWeatherIcon(weather.current.weather_descriptions?.[0])}
            <h2 className="text-2xl sm:text-3xl font-semibold">
              📍 {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-xl sm:text-2xl">🌡️ {weather.current.temperature}°C</p>
            <p className="text-lg">🌤️ {weather.current.weather_descriptions?.[0]}</p>
            <p className="text-sm text-white/70">🕒 {weather.location.localtime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
