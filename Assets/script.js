
 // Variables 

var apiKey = "a2be8081e76d81dc48560ed9a9eaec38";
var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");

// Left column locations
var cityNameEl = $(".cityName");
var currentDateEl = $(".currentDate");
var weatherIconEl = $(".weatherIcon");
var searchHistoryEl = $(".historyItems");

// Right column locations
var tempEl = $(".temp");
var humidityEl = $(".humidity");
var windSpeedEl = $(".windSpeed");
var uvIndexEl = $(".uvIndex");
var cardRow = $(".card-row");

// Create a current date variable
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
}else{
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}

searchBtn.on("click", function(e) {
    e.preventDefault();
    if (searchInput.val() === "") {
        alert("You must enter a city");
        return;
    }
    console.log("clicked button")
    getWeather(searchInput.val());
});

$(document).on("click", ".historyEntry", function() {
    console.log("clicked history item")
    var thisElement = $(this);
    getWeather(thisElement.text());
})

function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchHistoryArr.length; i++) {
        // We put newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
        var newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
}

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text(`UV Index: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desiredCity) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(weatherData) {
        var cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            cityUVIndex: weatherData.coord,
            cityWeatherIconName: weatherData.weather[0].icon
        }
    var queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    .then(function(uvData) {
        if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
            var searchHistoryArr = [];
            // Keeps user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory(cityObj.cityName);
                //prevents  add same city to list
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }else{
            var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
            // Keeps user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory(cityObj.cityName);
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }
    })
        
    });
    getFiveDayForecast();

   function getFiveDayForecast() {
        cardRow.empty();
        var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(fiveDayReponse) {
            for (var i = 0; i != fiveDayReponse.list.length; i+=8 ) {
                var cityObj = {
                    date: fiveDayReponse.list[i].dt_txt,
                    icon: fiveDayReponse.list[i].weather[0].icon,
                    temp: fiveDayReponse.list[i].main.temp,
                    humidity: fiveDayReponse.list[i].main.humidity
                }
                var dateStr = cityObj.date;
                var trimmedDate = dateStr.substring(0, 10); 
                var weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
            }
        })
    }   
}

function createForecastCard(date, icon, temp, humidity) {

    
    var fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    var cardDate = $("<h3>").attr("class", "card-text");
    var cardIcon = $("<img>").attr("class", "weatherIcon");
    var cardTemp = $("<p>").attr("class", "card-text");
    var cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}







            

