// Import API key from config
const apiKey = window.config.WEATHER_API_KEY;
let currentCity = '';

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        currentCity = city;
        displayWeather(data);
        
        // Also fetch forecast for the same city
        fetchForecast(city);
    } catch (error) {
        alert('City not found. Please try again.');
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayWeather(data) {
    // Show weather content
    document.getElementById('weather-content').style.display = 'block';
    
    document.getElementById('city').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.name}`;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    document.getElementById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Group forecast by day (forecast API returns 3-hour intervals)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = {
                date: date,
                temps: [],
                weather: item.weather[0],
                icon: item.weather[0].icon
            };
        }
        dailyForecasts[dateKey].temps.push(item.main.temp);
    });
    
    // Display first 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const maxTemp = Math.round(Math.max(...forecast.temps));
        const minTemp = Math.round(Math.min(...forecast.temps));
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        const dayName = forecast.date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateText = forecast.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        forecastItem.innerHTML = `
            <div class="forecast-date">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-date-text">${dateText}</div>
            </div>
            <div class="forecast-weather">
                <img class="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.weather.description}">
                <div class="forecast-desc">${forecast.weather.description}</div>
            </div>
            <div class="forecast-temps">
                <div class="forecast-high">${maxTemp}°</div>
                <div class="forecast-low">${minTemp}°</div>
            </div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
});

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
        document.getElementById('city-input').value = '';
    }
});

document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            fetchWeather(city);
            document.getElementById('city-input').value = '';
        }
    }
});