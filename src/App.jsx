
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import { searchCity, getWeather } from "./services/weatherService";

import "./App.css";

function App() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
<Helmet>
  <title>Weather Forecast | Live Weather &amp; 7-Day Forecast</title>

  <meta
    name="description"
    content="Find current temperatures, humidity, wind speed, and 7-day weather forecasts for cities around the world."
  />

  <meta name="robots" content="index, follow" />

  <meta
    property="og:title"
    content="Weather Forecast | Weatherly"
  />

  <meta
    property="og:description"
    content="Check current weather conditions and 7-day forecasts with Weatherly."
  />
</Helmet>


  const fetchCityWeather = useCallback(async (cityName) => {
    setLoading(true);
    setError("");

    try {
      const location = await searchCity(cityName);
      const data = await getWeather(
        location.latitude,
        location.longitude
      );

      setCity(location);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCityWeather("Hyderabad");
  }, [fetchCityWeather]);

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">🌤️</span>
          <div>
            <h1>Weatherly</h1>
            <p>Your daily weather companion</p>
          </div>
        </div>
      </header>

      <section className="search-section">
        <h2>Weather Forecast</h2>
        <p>Find current conditions and your 7-day forecast.</p>

        <SearchBar
          onSearch={fetchCityWeather}
          disabled={loading}
        />
      </section>

      <ErrorMessage message={error} />

      {loading && <Loading />}

      {!loading && weather && city && (
        <div className="weather-content">
          <CurrentWeather city={city} weather={weather} />

          <WeatherDetails current={weather.current} />

          <ForecastList daily={weather.daily} />
        </div>
      )}

      <footer className="app-footer">
        Weather data provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open-Meteo
        </a>
        .
      </footer>
    </main>
  );
}

export default App;
