//Use Dom manipulation to update the html elements
const locationNameElement = document.getElementById('#location-name');
const temperatureElement = document.getElementById('#temperature');
const weatherConditionsElement = document.getElementById('#weather-conditions');
const forecastTempElements = document.querySelectorAll('.forecast-temp');
const forecastConditionsElement = document.querySelectorA('.forecast-conditions');
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
  },
  {
    day: 'Day2',
    temp: 28,
    forecastConditions: 'sunny'
  },
  {
    day: 'Day3',
    temp: 28,
    forecastConditions: 'Partly Cloudy'
  },
  {
    day: 'Day4',
    temp: 28,
    forecastConditions: 'Cloudy'
  },
  {
    day: 'Day5',
    temp: 28,
    forecastConditions: 'Rainy'
  }
]
};

//Function to update weather data
function updateWeatherData (weatherData) {

locationNameElement.textContent = weatherData.location;
temperatureElement.textContent = weatherData.temperature + '°C';
weatherConditionsElement.textContent = weatherData.conditions;

forecastTempElements.forEach((element, index) => {
    element.textContent = weatherData.forecast[index].temp + '°C';
});
forecastConditionsElements.forEach((element, index) => {
    element.textContent= weatherData.forecast[index].forecastConditions;
});

errorElement.textContent = '';
}



 //Fetch weather data from API
function fetcheatherData (location){
  const apiKey = b0c7b37d3059bd769e201b648f67214b;
  const apiUrl = `https://home.openweathermap.org/api_keys`
}
 


//Make a get request


//Implement error hamdlimg where the API request fails

//Add event for fetch button

//Add event listener for unit toggle button

//function to convert temperature units and format data

//Implement Users geolocation 

