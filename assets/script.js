// global variables
var cityInput = document.querySelector("#city-input");
var searchForm = document.querySelector("#search-form");
var clearButton = document.querySelector("#clear-history-button");
var searchHistory = document.querySelector("#search-history");
var presentDayWeather = document.querySelector("#present-day-weather");
var fiveDayForecast = document.querySelector("#five-day-forecast");

// function to display the dashboard
function dashboard(event) {
    event.preventDefault();
    var cityName = cityInput.value;
    displayWeather(cityName);
}

// grab api from openweathermap
function displayWeather(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentData) {
            console.log(currentData);
            var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`;
            fetch(oneCallUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (fiveDayData) {
                    if (searchHistory.includes(currentData.name) === false) {
                        searchHistory.push(currentData.name);
                        localStorage.setItem("city", JSON.stringify(searchHistory));
                    }