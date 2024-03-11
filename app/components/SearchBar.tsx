import React, { useState } from 'react';
import { WeatherData, WeatherErrorResponse } from '../utils/api';
import '../styles/mainStyles.css';

interface SearchBarProps {
    onSearch: (city: string) => Promise<WeatherData | WeatherErrorResponse>; // Modify return type
    className?: string; // Make className prop optional
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [error, setError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const capitalizedCity = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
        setCity(capitalizedCity);
        setError(''); // Clear any previous error when input changes
    };

    const handleSearch = async () => {
        if (city.trim() === '') {
            setError('Please enter a city name');
            return;
        }
    
        try {
            const data = await onSearch(city);
            // Check if data is an error response
            if ('error' in data) {
                // Handle error response
                setError(data.error.message);
            } else {
                // Handle successful data response
                // Do something with the weather data
            }
        } catch (error: any) {
            // Handle other errors
            setError('Unable to fetch weather data');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>🔎</button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </>
    );
};

export default SearchBar;
