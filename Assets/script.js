// Variables 
var searchButton = $(".searchButton");

var apiKey = "a2be8081e76d81dc48560ed9a9eaec38";

// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

// Key count for local storage 
var keyCount = 0;


// Search button click event
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // Variable for current weather working 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // list-group append an li to it with just set text
            // console.log(response.name);
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);
  
  
            // Adjust Date 
  var timeUTC = new Date(response.dt * 1000);
  currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
  currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
  // Add Temp 
  var currentTemp = currentName.append("<p>");
  // .addClass("card-text");
  currentName.append(currentTemp);
  currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
  // Add Humidity
  currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
  // // Add Wind Speed: 
  currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

