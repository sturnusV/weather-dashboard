import { useState, useEffect } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import axios from 'axios';
import PropTypes from 'prop-types';
import ErrorBoundary from './ErrorBoundary';
import CityPhotoPlaceholder from './CityPhotoPlaceholder';

const CurrentWeather = ({ data, cityName }) => {
  if (!data) return <div className="current-weather">Search a city to see weather!</div>;

  const { name, main, weather, wind } = data;
  const icon = weather[0].main;
  const [cityPhoto, setCityPhoto] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const fetchCityPhoto = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}&per_page=1`
        );
        setCityPhoto(res.data.results[0]?.urls?.regular || null);
      } catch (err) {
        console.error("Unsplash Error:", err);
        setCityPhoto(null);
      }
    };

    fetchCityPhoto();
  }, [cityName]);

  const getWeatherIcon = () => {
    switch (icon) {
      case "Clear": return <WiDaySunny size={60} />;
      case "Rain": return <WiRain size={60} />;
      case "Snow": return <WiSnow size={60} />;
      case "Thunderstorm": return <WiThunderstorm size={60} />;
      case "Fog": return <WiFog size={60} />;
      default: return <WiCloudy size={60} />;
    }
  };

  return (
    <div className="current-weather-container">
      <div className="weather-data">
        <h2>{name}</h2>
        <div className="weather-icon">{getWeatherIcon()}</div>
        <div className="weather-details">
          <p>Temp: {Math.round(main.temp)}°C</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind: {wind.speed} m/s</p>
        </div>
      </div>

      {cityPhoto && (
        <div className="city-photo-container">
          <div className="city-photo-image-container">
            <ErrorBoundary fallback={<CityPhotoPlaceholder />}>
              <img 
                src={cityPhoto} 
                alt={`${name} skyline`}
                onError={() => setCityPhoto(null)}
                className="city-photo"
                loading="lazy"
              />
            </ErrorBoundary>
            <p className="photo-credit">
              Photo via <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number,
      humidity: PropTypes.number
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string
      })
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number
    })
  }),
  cityName: PropTypes.string
};

export default CurrentWeather;