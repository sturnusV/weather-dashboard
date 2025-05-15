import { memo } from 'react';
import PropTypes from 'prop-types';
import { getWeatherIcon } from '../utils/weatherIcons';

const Forecast = ({ data, cityName }) => {
  if (!data) return null;
  
  const groupByDay = (list) => {
    const days = {};

    list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dayKey = date.toISOString().split('T')[0];

      if (!days[dayKey]) {
        days[dayKey] = [];
      }

      days[dayKey].push(forecast);
    });

    return Object.entries(days).slice(0, 5).map(([date, entries]) => {
      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let iconEntry = entries[Math.floor(entries.length / 2)];

      entries.forEach(entry => {
        if (entry.main.temp_min < minTemp) minTemp = entry.main.temp_min;
        if (entry.main.temp_max > maxTemp) maxTemp = entry.main.temp_max;
      });

      return {
        dt: new Date(date).getTime() / 1000,
        temp_min: minTemp,
        temp_max: maxTemp,
        weather: iconEntry.weather
      };
    });
  };

  const dailyForecasts = groupByDay(data.list);


  return (
    <section className="forecast" aria-labelledby="forecast-heading">
      <h3 id="forecast-heading">5-Day Forecast for {cityName}</h3>
      <div className="forecast-cards" role="list">
        {dailyForecasts.map((day) => {
          const date = new Date(day.dt * 1000);
          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });

          return (
            <article 
              key={day.dt}
              className="forecast-card"
              role="listitem"
              aria-label={`Forecast for ${formattedDate}`}
            >
              <p>{formattedDate}</p>
              <div className="weather-icon-container">
                {getWeatherIcon(day.weather[0].id)}
              </div>
              <dl className="temp-details">
                <div className="temp-row">
                  <dt>High:</dt>
                  <dd>{Math.round(day.temp_max)}°C</dd>
                </div>
                <div className="temp-row">
                  <dt>Low:</dt>
                  <dd>{Math.round(day.temp_min)}°C</dd>
                </div>
              </dl>
            </article>
          );
      })}
      </div>
    </section>
  );
};

Forecast.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
          temp_max: PropTypes.number.isRequired,
          temp_min: PropTypes.number.isRequired
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired
          })
        ).isRequired
      })
    ).isRequired
  }),
  cityName: PropTypes.string
};

export default memo(Forecast);