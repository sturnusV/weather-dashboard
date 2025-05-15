import { useState, useCallback } from 'react'; // Added useCallback import
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoized fetchWeather function
  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError('');
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`),
      ]);
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [API_KEY]); // Dependency array includes API_KEY

  return (
    <div className="app">
      <div className='title-container'>
        <h1>WeatherScope</h1>
      </div>
      <SearchBar onSearch={fetchWeather} />
      
      {/* Loading spinner with accessibility attributes */}
      {loading && (
        <div className="loading-spinner" aria-live="polite" aria-busy="true">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
      <CurrentWeather data={currentWeather} cityName={currentWeather?.name} />
      <Forecast data={forecast} cityName={currentWeather?.name} />
    </div>
  );
}

export default App;