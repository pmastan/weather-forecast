
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

  const fetchCityWeather = useCallback(async (cityName) => {
    if (!cityName || !cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const location = await searchCity(cityName.trim());

      if (!location) {
        throw new Error("City not found. Please try another city.");
      }

      const data = await getWeather(
        location.latitude,
        location.longitude
      );

      setCity(location);
      setWeather(data);
    } catch (err) {
      setError(
        err.message || "Unable to fetch weather. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCityWeather("Hyderabad");
  }, [fetchCityWeather]);

  return (
    <>
      <Helmet>
        <title>
          Weather Forecast | Live Weather &amp; 7-Day Forecast
        </title>

        <meta
          name="description"
          content="Check current weather, temperature, humidity, wind speed, and 7-day weather forecasts for cities around the world with Weatherly."
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="Weatherly"
        />

        <meta
          property="og:title"
          content="Weather Forecast | Live Weather &amp; 7-Day Forecast"
        />

        <meta
          property="og:description"
          content="Explore current weather conditions, temperature, humidity, wind speed, and 7-day forecasts with Weatherly."
        />

        <meta
          property="og:url"
          content="https://daily-weather-report-forecast.vercel.app/"
        />

        <meta
          name="twitter:card"
          content="summary"
        />

        <meta
          name="twitter:title"
          content="Weather Forecast | Weatherly"
        />

        <meta
          name="twitter:description"
          content="Check current weather conditions and 7-day forecasts for cities around the world."
        />

        <link
          rel="canonical"
          href="https://daily-weather-report-forecast.vercel.app/"
        />
      </Helmet>

      <main className="app-container">
        <header className="app-header">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              🌤️
            </span>

            <div>
              <h1>Weatherly</h1>
              <p>Your daily weather companion</p>
            </div>
          </div>
        </header>

        <section
          className="search-section"
          aria-labelledby="weather-heading"
        >
          <h2 id="weather-heading">Weather Forecast</h2>

          <p>
            Find current weather conditions and your 7-day forecast
            for cities around the world.
          </p>

          <SearchBar
            onSearch={fetchCityWeather}
            disabled={loading}
          />
        </section>

        <ErrorMessage message={error} />

        {loading && <Loading />}

        {!loading && weather && city && (
          <section
            className="weather-content"
            aria-label={`Weather forecast for ${city.name}`}
          >
            <CurrentWeather
              city={city}
              weather={weather}
            />

            <WeatherDetails
              current={weather.current}
            />

            <ForecastList
              daily={weather.daily}
            />
          </section>
        )}

        <section
          className="seo-content"
          aria-labelledby="live-weather-heading"
        >
          <h2 id="live-weather-heading">
            Live Weather Forecast for Cities Worldwide
          </h2>

          <p>
            Weatherly helps you check current weather conditions
            and a 7-day weather forecast for cities around the
            world. Search for a city to explore temperature,
            humidity, wind speed, feels-like temperature, and
            precipitation information.
          </p>

          <h2>How to Check the Weather</h2>

          <p>
            Enter a city name in the search box to view its
            current weather conditions and upcoming forecast.
            Check daily high and low temperatures and available
            precipitation information to help plan your activities.
          </p>

          <h2>Weather Information at a Glance</h2>

          <p>
            Review important weather details and daily forecasts
            in one place. Weatherly uses weather data from
            Open-Meteo to help you explore conditions for your
            selected city.
          </p>
        </section>

        <footer className="app-footer">
          <p>
            Weather data provided by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-Meteo
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
