//Use Dom manipulation to update the html elements
const locationNameElement = document.querySelector('location-name');
const temperatureElement = document.querySelector('temperature');
const weatherConditionsElement = document.querySelector('weather-conditions');
const getTemperature = document.querySelector('.forecast-temp');
const forecastConditionsElement = document.querySelector('.forecast-conditions');

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

updateWeatherData(intialWeatherData);

}
//Add event listeners
//Api key with users location
//Make a get request
//Handle the api request
//Extract relevant weather data from api repsomse 
//Convert temperature umits amd format the data
//Display the temperature weather conditions icons
//Implement error hamdlimg where the API request fails
//Update the UI tp display error messages
//Implement Users geolocation 
//Use the geolocation API to to obtain coordinats and make an API request 
