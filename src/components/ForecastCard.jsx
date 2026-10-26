
import { getWeatherInfo, formatDay } from "../utils/weatherUtils";

function ForecastCard({ day, index }) {
  const info = getWeatherInfo(day.weather_code);

  return (
    <article className={`forecast-card ${index === 0 ? "today" : ""}`}>
      <p className="forecast-day">
        {index === 0 ? "Today" : formatDay(day.time)}
      </p>

      <span className="forecast-icon" aria-hidden="true">
        {info.icon}
      </span>

      <p className="forecast-condition">{info.description}</p>

      <div className="forecast-temperatures">
        <strong>{Math.round(day.temperature_2m_max)}°</strong>
        <span>{Math.round(day.temperature_2m_min)}°</span>
      </div>

      <p className="rain-chance">
        🌧️ {day.precipitation_probability_max ?? 0}%
      </p>
    </article>
  );
}

export default ForecastCard;
