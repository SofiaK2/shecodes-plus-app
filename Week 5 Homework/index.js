let now = new Date();
let date = document.querySelector(".date");
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
date.innerHTML = `${day} ${hour}:${minutes}`;

let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

function search(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showTemperature);
}

function showTemperature(position) {
  axios
    .get(
      `${apiUrl}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    )
    .then(function (response) {
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector(".temp");
      temperatureElement.innerHTML = `${temperature}`;
      let enterCity = document.querySelector("#enter-city");
      let cityName = document.querySelector(".city");
      cityName.innerHTML = `${enterCity.value}`;
    });
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `6a48a550fc04f170639e60d52b8a6bc5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = `${temperature}`;
  let city = response.data.name;
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = `${city}`;
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(".btn.btn-success");
button.addEventListener("click", getCurrentPosition);
