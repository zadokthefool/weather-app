import axios, { AxiosError } from 'axios';

const baseURL = 'http://api.weatherapi.com/v1';
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const api = axios.create({
    baseURL,
    params: {
        key: apiKey,
    },
});

export interface WeatherData {
    success: {
        code: 201;
        message: 'Successful search';
    }
}

export interface WeatherErrorResponse {
    error: {
        code: number;
        message: string;
    };
}

export const fetchWeatherData = async (city: string): Promise<WeatherData | WeatherErrorResponse> => {
    try {
        const response = await api.get<WeatherData>('/current.json', {
            params: {
                q: city,
            },
        });

        // Return the weather data
        return response.data;
    } catch (error) {
        // Handle AxiosError type separately to extract error message
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            return { error: { code: axiosError.response?.status || 500, message: 'Unable to fetch weather data' } };
        } else {

            // For other types of errors, return a generic error response
            return { error: { code: 500, message: 'Unable to fetch weather data' } };
        }
    }
};
