const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

let APIKey = null;

async function loadAPIKey() {
    try {
        const response = await fetch("api_key.json");
        if (!response.ok) {
            throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        APIKey = data.api_key;
        return APIKey;
    } catch (error) {
        console.error("Error fetching API key:", error);
        throw error;
    }
}

async function start() {
    try {
        await loadAPIKey();
    } catch (error) {
        console.error(error);
        return;
    }

    weatherForm.addEventListener("submit", async (event) => {
    
        event.preventDefault();

        const city = cityInput.value;

        if(city){
            try {
                const weatherData = await getWeatherData(city);
                displayWeatherInfo(weatherData);
            } catch(error) {
                console.error(error);
                displayError(error.message);
            }
        }
        else{
            displayError("Please enter a city name.");
        }

    });
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data. Please check the city name and try again.");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
        
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp * 9/5 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "💨"; // Mist
        case (weatherId === 800):
            return "☀️"; // Clear
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"; // Clouds
        default:
            return "❓"; // Unknown Weather Phenomenon
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

start();
