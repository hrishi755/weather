document.addEventListener('DOMContentLoaded', function() {
    // API key and URL
    const apiKey = '5226b0b2058f1061f25b948e56b74720'; // Replace with your OpenWeatherMap API key
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    // Function to fetch weather data
    function fetchWeather(city) {
        fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    alert('City not found');
                    return;
                }

                // Update current weather
                document.getElementById('current-temp').innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="other">
                        <div class="day">${moment().format('dddd')}</div>
                        <div class="temp">Night - ${data.main.temp_min}&#176; C</div>
                        <div class="temp">Day - ${data.main.temp_max}&#176; C</div>
                    </div>
                `;

                // Update current date and time
                document.getElementById('time').innerHTML = moment().format('h:mm') + ` <span id="am-pm">${moment().format('A')}</span>`;
                document.getElementById('date').innerHTML = moment().format('dddd, D MMMM');

                // Update location info
                document.getElementById('time-zone').textContent = data.name;
                document.getElementById('country').textContent = data.sys.country;

                // Future forecast (you may want to adjust this to fit your needs)
                fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(forecastData => {
                        const forecastItems = forecastData.list.slice(0, 5).map(item => `
                            <div class="weather-forecast-item">
                                <div class="day">${moment(item.dt_txt).format('ddd')}</div>
                                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                                <div class="temp">Night - ${item.main.temp_min}&#176; C</div>
                                <div class="temp">Day - ${item.main.temp_max}&#176; C</div>
                            </div>
                        `).join('');
                        document.getElementById('weather-forecast').innerHTML = forecastItems;
                    })
                    .catch(error => console.error('Error fetching forecast data:', error));
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Example city
    fetchWeather('London'); // Replace 'London' with a default city or implement user input
});
