
function WeatherDetails({ current }) {
  const details = [
    {
      icon: "💧",
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
    },
    {
      icon: "💨",
      label: "Wind speed",
      value: `${current.wind_speed_10m} km/h`,
    },
    {
      icon: "🌡️",
      label: "Feels like",
      value: `${Math.round(current.apparent_temperature)}°C`,
    },
    {
      icon: "🌧️",
      label: "Precipitation",
      value: `${current.precipitation} mm`,
    },
  ];

  return (
    <section className="details-section">
      <h2>Today's Highlights</h2>

      <div className="details-grid">
        {details.map((detail) => (
          <article className="detail-card" key={detail.label}>
            <div className="detail-top">
              <span>{detail.icon}</span>
              <span>{detail.label}</span>
            </div>

            <p className="detail-value">{detail.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;
