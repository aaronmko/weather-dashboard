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