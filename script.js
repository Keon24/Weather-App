//Use Dom manipulation to update the html elements
const locationNameElement = document.getElementById('#location-name');
const temperatureElement = document.getElementById('#temperature');
const weatherConditionsElement = document.getElementById('#weather-conditions');
const forecastTempElements = document.querySelectorAll('.forecast-temp');
const forecastConditionsElement = document.querySelectorAll('.forecast-conditions');
const errorElement = document.getElementById('error-message');
const fetchButton = document.getElementById('search-button');
const unitToggle = document.getElementById('unit-toggle');


const weatherData = {
locatiion: 'New York',
temperature: 25,
conditions: 'Sunny',
forecast: [
  {
    day: 'Day1',
    temp: 28,
    forecastConditions: 'Partly Cloudy'
  }
]
};

function updateWeatherData (weatherData) {

locationNameElement.textContent = weatherData.location;
temperatureElement.textContent = weatherData.temperature;
weatherConditionsElement.textContent = weatherData.conditions;
forecastTempElement.textContent = weatherData.forecast[0].temp;
forecastTempElement.textContent = weatherData.forecast[0].forecastConditions;
errorElement.textContent = '';
}



 //Fetch weather data from API


//Make a get request

//Add event listeners
//Handle the api request
//Extract relevant weather data from api repsomse 
//Convert temperature umits amd format the data
//Display the temperature weather conditions icons
//Implement error hamdlimg where the API request fails
//Update the UI tp display error messages
//Implement Users geolocation 
//Use the geolocation API to to obtain coordinats and make an API request 
