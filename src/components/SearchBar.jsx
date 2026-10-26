
import { useState } from "react";

function SearchBar({ onSearch, disabled }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (trimmedCity) {
      onSearch(trimmedCity);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-icon">⌕</span>

      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search for a city..."
        aria-label="City name"
        disabled={disabled}
        required
      />

      <button type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
