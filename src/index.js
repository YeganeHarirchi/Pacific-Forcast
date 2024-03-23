let now = new Date();
let todayDate = document.querySelector("#today-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let temperatureUnit = "C";
todayDate.innerHTML = `${day} ${date} ${month}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityweather = document.querySelector("h1");
  cityweather.innerHTML = `${city.value}`;
  let apiKey = "8da74ddd4473f588885d2a59e98e14d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  function currentWeather(response) {
    let responseTemperature = Math.round(response.data.main.temp);
    let todayTemperature = document.querySelector("#now-temperature");
    todayTemperature.innerHTML = `${responseTemperature}`;

    let responseWeather = `${response.data.weather[0].main}`;
    let todayWeather = document.querySelector("#now-Weather");
    todayWeather.innerHTML = `${responseWeather}`;
  }
  axios.get(apiUrl).then(currentWeather);
}
let searchBox = document.getElementById("magnifying-search");
searchBox.addEventListener("click", searchCity);

function currentCity(event) {
  event.preventDefault();

  function longLat(position) {
    let apiKey = "8da74ddd4473f588885d2a59e98e14d6";
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let cityweather = document.querySelector("h1");
    cityweather.innerHTML = `${position.sys.name}`;

    axios.get(apiUrl).then(currentWeather);
  }

  navigator.geolocation.getCurrentPosition(longLat);

  function currentWeather(response) {
    let responseTemperature = Math.round(response.data.main.temp);
    let todayTemperature = document.querySelector("#now-temperature");
    todayTemperature.innerHTML = `${responseTemperature}`;

    let responseWeather = `${response.data.weather[0].main}`;
    let todayWeather = document.querySelector("#now-Weather");
    todayWeather.innerHTML = `${responseWeather}`;
  }
}
let currentBox = document.getElementById("current-search");
currentBox.addEventListener("click", currentCity);

function convertToFahrenheit() {
  if (temperatureUnit !== "C") return;
  let nowTemperature = document.querySelector("#now-temperature");
  fahrenheitTemprature = Math.round((nowTemperature.outerText * 9) / 5 + 32);
  nowTemperature.innerHTML = `${fahrenheitTemprature}`;
  temperatureUnit = "F";
}

function convertToCelsius() {
  if (temperatureUnit !== "F") return;
  let nowTemperature = document.querySelector("#now-temperature");
  celsiusTemprature = Math.round((nowTemperature.outerText - 32) * 0.55);
  nowTemperature.innerHTML = `${celsiusTemprature}`;
  temperatureUnit = "C";
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);
