
export function getWeatherInfo(code, isDay = true) {
  if (code === 0) {
    return {
      description: "Clear sky",
      icon: isDay ? "☀️" : "🌙",
    };
  }

  if (code === 1) {
    return {
      description: "Mainly clear",
      icon: isDay ? "🌤️" : "🌙",
    };
  }

  if (code === 2) {
    return { description: "Partly cloudy", icon: "⛅" };
  }

  if (code === 3) {
    return { description: "Overcast", icon: "☁️" };
  }

  if ([45, 48].includes(code)) {
    return { description: "Foggy", icon: "🌫️" };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: "Drizzle", icon: "🌦️" };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { description: "Rainy", icon: "🌧️" };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: "Snowy", icon: "❄️" };
  }

  if ([95, 96, 99].includes(code)) {
    return { description: "Thunderstorm", icon: "⛈️" };
  }

  return { description: "Unknown conditions", icon: "🌡️" };
}

export function formatDay(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "short" }
  );
}

export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
