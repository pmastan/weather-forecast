
import ForecastCard from "./ForecastCard";

function ForecastList({ daily }) {
  const days = daily.time.map((time, index) => ({
    time,
    weather_code: daily.weather_code[index],
    temperature_2m_max: daily.temperature_2m_max[index],
    temperature_2m_min: daily.temperature_2m_min[index],
    precipitation_probability_max:
      daily.precipitation_probability_max?.[index] ?? 0,
  }));

  return (
    <section className="forecast-section">
      <h2>7-Day Forecast</h2>

      <div className="forecast-grid">
        {days.map((day, index) => (
          <ForecastCard key={day.time} day={day} index={index} />
        ))}
      </div>
    </section>
  );
}

export default ForecastList;
