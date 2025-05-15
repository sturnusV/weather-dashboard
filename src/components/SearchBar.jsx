import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setInputError('Please enter a city name');
      return;
    }
    if (!/^[a-zA-Z\s]*$/.test(city)) {
      setInputError('Only letters and spaces allowed');
      return;
    }
    setInputError('');
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" noValidate>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City search"
          aria-invalid={!!inputError}
          aria-describedby="search-error"
        />
        <button 
          type="submit" 
          className="search-button"
          aria-label="Search weather"
          disabled={!city.trim()}
        >
          <span aria-hidden="true">🔍</span>
        </button>
        {inputError && (
          <span id="search-error" className="search-error" role="alert">
            {inputError}
          </span>
        )}
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;