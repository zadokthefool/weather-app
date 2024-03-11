import React from 'react';
import '../styles/mainStyles.css';

interface WeatherDisplayProps {
    weatherData: any; // Update this type according to the structure of your weather data
    error: string | null; // Add error state
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, error }) => {
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!weatherData || !weatherData.location || !weatherData.current) {
        return;
    }

    // Extract weather information from weatherData object
    const { location, current } = weatherData;
    const name = location.name;
    const region = location.region;
    const temp_c = current.temp_c;
    const humidity = current.humidity;
    const wind_kph = current.wind_kph;

    return (
        <div className="weather-display">
            <h2>{name}</h2>
            <h3>{region}</h3>
            <div className="weather-info">
                <p>Temp: {temp_c} °C | Wind: {wind_kph} km/h</p>
                <p>Humidity: {humidity}%</p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
