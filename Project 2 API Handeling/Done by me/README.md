# Weather App

A modern, responsive weather application that displays current weather and 5-day forecast.

## Setup

1. Clone or download the project
2. Open the project folder
3. Update the API key in `config.js` with your OpenWeather API key
4. Open `index.html` in a web browser

## Environment Variables

The API key is stored in `config.js`. For production, consider using environment variables:

- `WEATHER_API_KEY`: Your OpenWeather API key

## Files

- `.env` - Environment variables (for reference)
- `config.js` - Configuration file with API key
- `index.html` - Main HTML file
- `style.css` - Styling
- `script .js` - JavaScript functionality

## Security Note

In a production environment, you should:
1. Use a backend server to make API calls
2. Keep API keys on the server side
3. Never expose API keys in client-side code

For this demo, the API key is in the client-side code for simplicity.
