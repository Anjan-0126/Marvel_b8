const API_KEY = "490a02c5a6858e1729c5b8d3614e4ea7"; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const body = document.getElementById('body-bg');

async function fetchWeather() {
    const city = cityInput.value;
    if (!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === 200) {
            updateUI(data);
        } else {
            alert("City not found!");
        }
    } catch (error) {
        console.error("API Error:", error);
    }
}

function updateUI(data) {
    const weatherMain = data.weather[0].main.toLowerCase();
    
    // Update Text Elements
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = Math.round(data.main.temp) + "°";
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity + "%";
    document.getElementById('wind').innerText = data.wind.speed + " km/h";
    document.getElementById('feels-like').innerText = Math.round(data.main.feels_like) + "°";

    // Update Background and Icons based on Weather
    body.className = ''; // Clear classes
    const icon = document.getElementById('main-icon');

    if (weatherMain.includes('clear')) {
        body.classList.add('bg-clear');
        icon.className = "ph-fill ph-sun";
    } else if (weatherMain.includes('cloud')) {
        body.classList.add('bg-clouds');
        icon.className = "ph-fill ph-cloud";
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
        body.classList.add('bg-rain');
        icon.className = "ph-fill ph-cloud-rain";
    } else if (weatherMain.includes('snow')) {
        body.classList.add('bg-snow');
        icon.className = "ph-fill ph-snowflake";
    } else {
        body.classList.add('bg-default');
        icon.className = "ph-fill ph-cloud-fog";
    }
}

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchWeather(); });

// Set default background on load
body.classList.add('bg-default');