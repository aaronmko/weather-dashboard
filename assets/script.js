// Defining variables for weather dashboard
var cityInput = document.querySelector("#city-input");
var searchForm = document.querySelector("#search-form");
var clearButton = document.querySelector("#clear-history-button");
var pastCities = document.querySelector("#search-history");
var presentDayWeather = document.querySelector("#present-day-weather");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var searchHistory = [];


function dashboard(event) {
    event.preventDefault();
    var cityName = cityInput.value;
    displayWeather(cityName);
}
// function displayWeather takes cityName and retrives weather daya from openweathermpa API
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
                        localStorage.setItem("city", JSON.stringify(searchHistory)); // Adds current ity to search history if not already displayed
                    }
                    displayCity();
                    console.log(fiveDayData);
                    // Displays weather information in the presentDayWeather element in the HTML
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
    </ul>
        `;
                    var cards = "";
                    for (var i = 1; i < 6; i++) {
                        cards =
                            cards +
                            `<ul class="col-12 col-xl-2 day">
        <li>${moment(fiveDayData.daily[i].dt, "X").format(" MM/DD/YYYY")}</li>
        <li><img src ="http://openweathermap.org/img/wn/${fiveDayData.daily[i].weather[0].icon
                            }@2x.png" /></li>
        <li>Temp: ${fiveDayData.daily[i].temp.day}</li>
        <li>Wind: ${fiveDayData.daily[i].wind_speed}</li>
        <li>Humidity: ${fiveDayData.daily[i].humidity}</li>
    </ul>`;
                    }
                    fiveDayForecast.innerHTML = cards;
                });
        });
}
function displayCity() {
    if (localStorage.getItem("city")) {
        searchHistory = JSON.parse(localStorage.getItem("city"));
    }
    var cityList = "";
    for (var i = 0; i < searchHistory.length; i++) {
        cityList =
            cityList +
            `<button class="btn btn-secondary my-2" type="submit">${searchHistory[i]}</button>`;
    }
    pastCities.innerHTML = cityList;
    var myDashTwo = document.querySelectorAll(".my-2");
    for (var i = 0; i < myDashTwo.length; i++) {
        myDashTwo[i].addEventListener("click", function () {
            displayWeather(this.textContent);
        });
    }
}
displayCity();
// event listener to trigger dashboard function on line 11
searchForm.addEventListener("submit", dashboard); 
// Clears search history and local storage
function clearSearchHistory() {
    localStorage.clear();
    pastCities.innerHTML = "";
    searchHistory = [];
}
// Clears history
clearButton.addEventListener("click", function () {
    clearSearchHistory();
});