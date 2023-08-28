//Use Dom manipulation to update the html elements
const locationNameElement = document.getElementById('location-name');
const temperatureElement = document.getElementById('temperature');
const weatherConditionsElement = document.getElementById('weather-conditions');
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
//function to convert temperature units and format data
function convertAndFormatTemperature(tempInCelsius, toFahrenheit = false) {

  let temperature;
  if (toFahrenheit) {
    temperature =(tempInCelsius * 9) / 5 +32;
    temperature = temperature.toFixed(2) + '°F';
   
    }else{
      temperature = tempInCelsius.toFixed(2) + '°C';
    }
    return temperature;2
}

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
function fetchWeatherData (location){
  const apiKey = b0c7b37d3059bd769e201b648f67214b;
  const apiUrl = `https://home.openweathermap.org/api_keys`
//Get request
fetch (apiUrl)
.then((response) => {
  if(!response.ok) {
    throw new Error('Netwok response was not ok');
  }
  return response.json();
  
})
.then((data) => {
  const fetchedWeatherData = {
    location: data.main,
    temperature: data.main. temp,
    conditons: data.weather[0].description,
    forecast: weatherData.forecast,
  };
  updateWeatherData(fetchedWeatherData);

})
//Implement error hamdlimg where the API request fails
.catch((error) => { 
  console.error('Error fetching data:', error);
  errorElement.textContent = 'An error occurred while fetching the weather data.';
});

}
 


//Add event for fetch button
fetchButton.addEventListener('click', () => {
  const location = prompt('Enter a location:');
  if (location){
    fetchWeatherData(location)
  }
  });

//Add event listener for unit toggle button
unitToggle.addEventListener('click', () => {

});



//Implement Users geolocation 
const target = {
  latitude: 4.3874387,
  longitude:  -71.394839
}


function watchSuccess(pos) {
  const coords = pos.coords;
  console.log(coords);

  if (target.latitude === coords.latitude && target.longitude === 
    coords.longitude) {
    console.log('You have reached your destination');
    navigator.geolocation.clearWatch(id);
    }
}

function watchError(err) {
  console.log(`Error: ${err.code} ${err.message}`);
}

const watchOptions = {
  enableHighAccuracy: true, //Use GPS if available
  timeout: 5000, //Time to wait to stop trying for loaction
  maximumAge: 0 // Do not use cached position
};

 const id = navigator.geolocation.watchPosition(watchSuccess, 
  watchError, watchOptions);


