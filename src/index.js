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

function searchCity(city) {
 
  let apiKey = "8da74ddd4473f588885d2a59e98e14d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather).catch(error => {
    if (error.response && error.response.status === 404) {
      alert('City not found. Please enter a valid city name.');
    }
     //else {alert('An error occurred. Please try again.'); }
  });
}
  function currentWeather(response) {
    let cityweather = document.querySelector("h1");
    cityweather.innerHTML = `${response.data.name}`;
    //
    let responseTemperature = Math.round(response.data.main.temp);
    let todayTemperature = document.querySelector("#now-temperature");
    todayTemperature.innerHTML = `${responseTemperature}`;
    //
    let todayWeather = document.querySelector("#now-Weather");
    todayWeather.innerHTML = `${response.data.weather[0].main}`;
    //
    let responseHighTemperature = Math.round(response.data.main.temp_max);
    let highTemperature = document.querySelector("#high-Temp");
    highTemperature.innerHTML = `${responseHighTemperature}°C `;
    //
    let responseLowTemperature = Math.round(response.data.main.temp_min);
    let lowTemperature = document.querySelector("#low-temp");
    lowTemperature.innerHTML = `${responseLowTemperature}°C `;
    //
    let responseWindSpeed = Math.round(response.data.wind.speed);
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = `${responseWindSpeed} mph`;
  //
  let responseHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${responseHumidity}% `;
  //
  let responseSunrise = new Date(response.data.sys.sunrise * 1000);
  let responseSunset = new Date(response.data.sys.sunset * 1000);
 
 sunriseHours = responseSunrise.getHours();
 sunriseMinutes = responseSunrise.getMinutes();
 sunsetHours = responseSunset.getHours();
 sunsetMinutes = responseSunset.getMinutes();

// Ensure hours and minutes are always two digits
sunriseHours = sunriseHours < 10 ? '0' + sunriseHours : sunriseHours;
sunriseMinutes = sunriseMinutes < 10 ? '0' + sunriseMinutes : sunriseMinutes;
sunsetHours = sunsetHours < 10 ? '0' + sunsetHours : sunsetHours;
sunsetMinutes = sunsetMinutes < 10 ? '0' + sunsetMinutes : sunsetMinutes;

let sunrise = document.querySelector("#sunrise");
sunrise.innerHTML = `${sunriseHours}:${sunriseMinutes}`;
let sunset = document.querySelector("#sunset");
sunset.innerHTML = `${sunsetHours}:${sunsetMinutes}`;
  }
  
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  searchCity(searchInput.value);
}


let searchBox = document.getElementById("magnifying-search");
searchBox.addEventListener("click", handleSearchSubmit);

searchCity("Mashhad");

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
celsius.style.color = "gray";


}

function convertToCelsius() {
  if (temperatureUnit !== "F") return;
  let nowTemperature = document.querySelector("#now-temperature");
  celsiusTemprature = Math.round((nowTemperature.outerText - 32) * 0.55);
  nowTemperature.innerHTML = `${celsiusTemprature}`;
  temperatureUnit = "C";
  fahrenheit.style.color = "gray";
celsius.style.color= "rgb(13,110,252)";

}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);
