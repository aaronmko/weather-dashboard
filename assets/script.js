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
                    return response.json(); // takes function and translates into json
                })
                .then(function (fiveDayData) {
                    if (searchHistory.includes(currentData.name) === false) {
                        searchHistory.push(currentData.name);
                        localStorage.setItem("city", JSON.stringify(searchHistory));
                    }
                    // display city information where it dynamically generates the weather
                    displayCity();
                    console.log(fiveDayData);
                    presentDayWeather.innerHTML = `<ul>
        <li class="title">${currentData.name} /<span> ${moment(
                        currentData.dt,
                        "X" 
                    ).format(" MM/DD/YYYY")} </span></li> 
        <li><img src ="http://openweathermap.org/img/wn/${currentData.weather[0].icon
                        }@2x.png" /></li> 
        <li>Temp: ${currentData.main.temp}</li>
        <li>Wind: ${currentData.wind.speed}</li>
        <li>Humidity: ${currentData.main.humidity}</li>
        <li>UV: <span style="background-color: green; color: white;"> ${fiveDayData.current.uvi
                        }</span></li>