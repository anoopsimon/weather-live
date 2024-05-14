document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'b6907d289e10d714a6e88b30761fae22'; // Sample API key for testing
    const weatherContainer = document.getElementById('weather-container');
    const locationInfo = document.getElementById('location-info');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
            fetchLocation(latitude, longitude);
        }, error => {
            alert('Unable to retrieve your location. Displaying dummy weather data.');
            displayDummyWeather();
        });
    } else {
        alert('Geolocation is not supported by your browser. Displaying dummy weather data.');
        displayDummyWeather();
    }

    function fetchWeather(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const hourlyForecast = data.list.slice(0, 24);
                displayWeather(hourlyForecast);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Displaying dummy weather data.');
                displayDummyWeather();
            });
    }

    function fetchLocation(lat, lon) {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const location = `${data.city}, ${data.countryName}`;
                const currentDate = new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                locationInfo.innerHTML = `${location}<br>${currentDate}`;
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                locationInfo.innerHTML = `Melbourne Location<br>${new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}`;
            });
    }

    function displayWeather(hourlyForecast) {
        weatherContainer.innerHTML = ''; // Clear any previous content
        hourlyForecast.forEach(hour => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = `${Math.round(hour.main.temp)}°C`;
            const icon = getWeatherIcon(hour.weather[0].main);

            const weatherHour = document.createElement('div');
            weatherHour.className = 'weather-hour';
            weatherHour.innerHTML = `
                <div class="time">${time}</div>
                ${icon}
                <div class="temp">${temp}</div>
            `;
            weatherContainer.appendChild(weatherHour);
        });
    }

    function displayDummyWeather() {
        const dummyData = [
            { time: '06:00', temp: '15°C', condition: 'Rain' },
            { time: '07:00', temp: '16°C', condition: 'Rain' },
            { time: '08:00', temp: '18°C', condition: 'Rain' },
            { time: '09:00', temp: '20°C', condition: 'Rain' },
            { time: '10:00', temp: '22°C', condition: 'Clear' },
            { time: '11:00', temp: '24°C', condition: 'Clear' },
            { time: '12:00', temp: '25°C', condition: 'Clear' },
            { time: '13:00', temp: '26°C', condition: 'Clear' },
            { time: '14:00', temp: '27°C', condition: 'Clear' },
            { time: '15:00', temp: '28°C', condition: 'Clear' },
            { time: '16:00', temp: '27°C', condition: 'Clear' },
            { time: '17:00', temp: '26°C', condition: 'Clear' },
            { time: '18:00', temp: '24°C', condition: 'Clear' },
            { time: '19:00', temp: '22°C', condition: 'Clear' },
            { time: '20:00', temp: '20°C', condition: 'Clear' },
            { time: '21:00', temp: '18°C', condition: 'Clear' },
            { time: '22:00', temp: '17°C', condition: 'Clear' },
            { time: '23:00', temp: '16°C', condition: 'Clear' },
            { time: '00:00', temp: '15°C', condition: 'Clear' },
            { time: '01:00', temp: '14°C', condition: 'Clear' },
            { time: '02:00', temp: '13°C', condition: 'Clear' },
            { time: '03:00', temp: '12°C', condition: 'Clear' },
            { time: '04:00', temp: '11°C', condition: 'Clear' },
            { time: '05:00', temp: '10°C', condition: 'Clear' }
        ];

        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        locationInfo.innerHTML = `Melbourne , Australia<br>${currentDate}`;

        dummyData.forEach(hour => {
            const time = hour.time;
            const temp = hour.temp;
            const icon = getWeatherIcon(hour.condition);

            const weatherHour = document.createElement('div');
            weatherHour.className = 'weather-hour';
            weatherHour.innerHTML = `
                <div class="time">${time}</div>
                ${icon}
                <div class="temp">${temp}</div>
            `;
            weatherContainer.appendChild(weatherHour);
        });
    }

    function getWeatherIcon(condition) {
        let icon = '';
        switch (condition) {
            case 'Clear':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="12" fill="#FFD700"/><path d="M32 8V0M32 64v-8M8 32H0M64 32h-8M16.24 16.24l-5.66-5.66M52.02 52.02l-5.66-5.66M16.24 47.76l-5.66 5.66M52.02 11.98l-5.66 5.66" stroke="#FFD700" stroke-width="4"/></svg>';
                break;
            case 'Clouds':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40"><circle cx="24" cy="24" r="10" fill="#B0C4DE"/><circle cx="40" cy="30" r="14" fill="#B0C4DE"/></svg>';
                break;
            case 'Rain':
                icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40"><circle cx="24" cy="24" r="10" fill="#B0C4DE"/><circle cx="40" cy="30" r="14" fill="#B0C4DE"/><path d="M20 40l-2 6M30 40l-2 6M40 40l-2 6M50 40l-2 6" stroke="#1E90FF" stroke-width="2"/></svg>';
                break;
            default:
                icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="12" fill="#B0C4DE"/><path d="M32 8V0M32 64v-8M8 32H0M64 32h-8M16.24 16.24l-5.66-5.66M52.02 52.02l-5.66-5.66M16.24 47.76l-5.66 5.66M52.02 11.98l-5.66 5.66" stroke="#B0C4DE" stroke-width="4"/></svg>';
                break;
        }
        return icon;
    }
});
