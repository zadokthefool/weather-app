"use client"

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeatherData } from './utils/api';
import { WeatherData, WeatherErrorResponse } from './utils/api';
import './styles/mainStyles.css';

const IndexPage: React.FC = () => {
    const [searchHistory, setSearchHistory] = useState<Array<WeatherData | WeatherErrorResponse>>([]);
    const [error, setError] = React.useState<string | null>(null); // Initialize error state

    React.useEffect(() => {
        // Code inside useEffect will run on the client side
        // You can initialize state or perform any client-side actions here
    }, []);

    const handleSearch = async (city: string): Promise<WeatherData | WeatherErrorResponse> => {
        try {
            const data = await fetchWeatherData(city);
            // Update search history with new data and place it on top
            setSearchHistory(prevHistory => [data, ...prevHistory]);
            setError(null);
            return data; // Return the fetched data
        } catch (error) {
            // Handle errors
            setError('Please enter a valid city name.');
            throw error; // Rethrow the error
        }
    };

    return (
        <div className="container">
            <h1 className="main-title">Weather 🌤️</h1>
            <SearchBar onSearch={handleSearch} />
            {/* Render each weather data in the search history, reversed to show newest on top */}
            {searchHistory.reverse().map((weatherData, index) => (
                <WeatherDisplay key={index} weatherData={weatherData} error={error} />
            ))}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default IndexPage;
