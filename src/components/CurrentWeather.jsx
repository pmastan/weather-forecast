
import { getWeatherInfo } from "../utils/weatherUtils";

function CurrentWeather({ city, weather }) {
  const current = weather.current;
  const info = getWeatherInfo(
    current.weather_code,
    Boolean(current.is_day)
  );

  return (
    <section className="current-weather">
      <div className="current-heading">
        <div>
          <p className="eyebrow">CURRENT WEATHER</p>
          <h2>{city.name}</h2>
          <p className="location">
            {[city.admin1, city.country].filter(Boolean).join(", ")}
          </p>
        </div>

        <div className="weather-icon" aria-hidden="true">
          {info.icon}
        </div>
      </div>

      <div className="temperature-row">
        <h1>{Math.round(current.temperature_2m)}°</h1>

        <div>
          <p className="condition">{info.description}</p>
          <p className="feels-like">
            Feels like {Math.round(current.apparent_temperature)}°C
          </p>
        </div>
      </div>

      <p className="updated-time">
        Local time: {weather.current.time.replace("T", " ")}
      </p>
    </section>
  );
}

export default CurrentWeather;
