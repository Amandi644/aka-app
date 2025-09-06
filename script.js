const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const cityDisplay = document.querySelector(".cityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const emojiDisplay = document.querySelector(".weatherEmoji");
const errorDisplay = document.querySelector(".errorDisplay");

const apiKey = "cc26aad02c1e4648aca125229250609"; // Replace with your real key

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    displayError("Please enter a city.");
    return;
  }

  try {
    const data = await getWeatherData(city);
    displayWeatherInfo(data);
  } catch (error) {
    displayError("City not found. Try again.");
  }
});

async function getWeatherData(city) {
  const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Weather data not found.");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const { name, country } = data.location;
  const { temp_c, humidity, condition } = data.current;

  cityDisplay.textContent = `${name}, ${country}`;
  tempDisplay.textContent = `${temp_c} °C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = condition.text;
  emojiDisplay.textContent = getWeatherEmoji(condition.code);

  errorDisplay.textContent = ""; // Clear error
  card.style.display = "block";
}

function displayError(message) {
  errorDisplay.textContent = message;
  card.style.display = "block";
}

function getWeatherEmoji(code) {
  // WeatherAPI condition code to emoji map (simplified)
  if (code >= 1000 && code < 1003) return "☀";        // Sunny
  if (code >= 1003 && code <= 1006) return "⛅";       // Cloudy
  if (code >= 1009 && code <= 1030) return "☁";       // Overcast/fog
  if (code >= 1063 && code <= 1195) return "🌧";       // Rain
  if (code >= 1210 && code <= 1237) return "🌨";       // Snow
  if (code >= 1240 && code <= 1276) return "⛈";       // Thunder
  return "❓";                                          // Unknown
}