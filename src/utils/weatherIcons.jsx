import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";

// Export for testing
export const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm size={30} aria-label="Thunderstorm" />;
  if (weatherId >= 300 && weatherId < 600) return <WiRain size={30} aria-label="Rain" />;
  if (weatherId >= 600 && weatherId < 700) return <WiSnow size={30} aria-label="Snow" />;
  if (weatherId >= 700 && weatherId < 800) return <WiFog size={30} aria-label="Fog" />;
  if (weatherId === 800) return <WiDaySunny size={30} aria-label="Clear sky" />;
  if (weatherId > 800) return <WiCloudy size={30} aria-label="Cloudy" />;
  return <WiDaySunny size={30} aria-label="Default weather" />;
};