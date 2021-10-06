# weather-dashboard-homework-6

This is the homework project 6 for Trilogy Full-Stack Bootcamp.

This is a work planner application using HTML, CSS, Javascript and third party API's. This application emphasizes the use of Java Script, Jquery, Bootstrap and API's call. It was resquested to use [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. 

In this app, the user enters the name of a city in the search field, then clicks the search button. The app will display the current weather conditions in that city, including temperature, humidity, UV index, and a picture representing whether it is clear, cloudy, raining, etc. Additionally, a 5-day forecast for that city is displayed below the current conditions showing similar information (predicted at 12:00 PM on each day).

Every time a user searches for a city, a list displaying that search information is created underneath the search field.  Additionally, if the user closes the window or refreshes the browser, the search history list remains. 

## Links

* ['Day-Planner GitHub'](https://github.com/mhdavie/weather-dashboard-homework6)
* ['Day-Planner GitHub IO'](https://mhdavie.github.io/weather-dashboard-homework6/)



## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```