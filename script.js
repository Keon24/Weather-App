
const apikey = 'b0c7b37d3059bd769e201b648f67214b';
 const BASE_Url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apikey}&units=metric&q=`;
 const FORECAST_Url = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apikey}&units=metric&q=`;


//Use Dom manipulation to update the html elements
document.addEventListener('DOMContentLoaded' , () => { 
const locationNameElement = document.getElementById('location-name');
const temperatureElement = document.getElementById('temperature');
const weatherConditionsElement = document.getElementById('weather-conditions');
const forecastTempElements = document.querySelectorAll('.forecast-temperature');
const forecastConditionsElement = document.querySelectorAll('.forecast-conditions');
const errorElement = document.getElementById('error-message');
const fetchButton = document.getElementById('search-button');
const unitToggle = document.getElementById('unit-toggle');
const weatherIconElement = document.getElementById('weather-icon');


// Check if geolocation is available in the browser
if("geolocation" in navigator) {
  // Request permission for geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    // Extract latitude and longitude from the position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
   if(window.console) console.log('Latitude:'+ latitude);
   if(window.console) console.log('Longitude'+ longitude);

   // update the weather data using the user's location
   fetchWeatherData(latitude,longitude);
  }, 
  function(error) {
    //Handle errors
    if(error.code === 1) {
     if(window.console) console.error('User denied location permission')
    }else if (error.code === 2) {
     if(window.console) console.error('Unable to determine location. Please tryagain later');
    }else if (error.code === 3) {
     if(window.console) console.error('Geolocation information is temporary unavailable');
       }else{
      if(window.console)console.error('Error getting location:' + error.message);

    }
  }
  ); 
}else{
 if(window.console) console.error('Geolocation is not available in the browser');
}
  
 

const weatherData = {
location: 'New York',
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
    return temperature;
}

//Function to update weather data
function updateWeatherData (weatherData) {

locationNameElement.textContent = weatherData.location;
temperatureElement.textContent = weatherData.temperature + '°C';
weatherConditionsElement.textContent = weatherData.conditions;

const currentIconCode = getIconCode(weatherData.conditions)
const currentIconUrl =  `https://openweathermap.org/img/wn/${currentIconCode}.png`;
weatherIconElement.src = currentIconUrl;

forecastTempElements.forEach((element, index) => {
    element.textContent = weatherData.forecast[index].temp + '°C';
});
forecastConditionsElement.forEach((element, index) => {
  const forecastIconCode = weatherData.forecast[index].iconCode;
  const forecastIconUrl = `https://openweathermap.org/img/wn/${forecastIconCode}.png`;
  element.textContent = weatherData.forecast[index].forecastConditions;
  const forecastIconElement = element.previousElementSibling;
  forecastIconElement.src = forecastIconUrl;
});
errorElement.textContent = '';
}

function getIconCode(icon) {
  const iconMapping = {
    'clear sky': '01d',
    'few clouds': '02d',
    'scattered clouds': '03d',
    'broken clouds': '04d',
    'shower rain': '09d',
    'rain': '10d',
    'thunderstorm': '11d',
    'snow': '13d',
    'mist': '50d',
  }
return iconMapping[icon];
}

 //Fetch weather data from API
function fetchWeatherData (latitude,longitude,locationName) {
  let apiUrl;
   // Use latitude and longitude if present, otherwise use location name
   if (latitude && longitude) {
   apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

   } else{
   apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apikey}`;

   apiUrl = apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
   } 
   //Get request
fetch (apiUrl)
.then((response) => {
  if(!response.ok) {
    throw new Error('Netwok response was not ok');
  }
  return response.json();
  
})
.then((currentWeatherData) => {
  if (currentWeatherData.cod && currentWeatherData.cod === '404') {
    throw new Error(
      `${currentWeatherData.message}. Please enter a valid location`
    );
  }

  let latitude = currentWeatherData.coord.lat;
  let longitude= currentWeatherData.coord.lon;
  let location = currentWeatherData.name;
  //Fetch forcast data using latitude and longitude
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

   fetch(apiUrl)
   .then((response) => {
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json()
   })
   .then((forecastData) => {
    const fetchedWeatherData = {
      location: location,
      temperature: convertAndFormatTemperature(currentWeatherData.main.temp),
      conditons: currentWeatherData.weather[0].description,
      forecast: [],
    };
    forecastData.list.forEach((timeData) => {
    if(timeData.dt_txt.includes('12:00:00')) {
      const weatherCondition = timeData.weather[0].description;
      const iconCode = getIconCode(weatherCondition)
      const dayForecast = {
        temp:convertAndFormatTemperature(timeData.main.temp),
        forecastConditions: weatherCondition,
        day:timeData.dt_txt.split('')[0],
        iconCode: iconCode
      };
      fetchedWeatherData.forecast.push(dayForecast);
    }
    });
    updateWeatherData(fetchedWeatherData);
   });
    
})
//Implement error hamdlimg where the API request fails
.catch((error) => { 
  console.error('Error fetching data:', error);
  errorElement.textContent = 'An error occurred while fetching the weather data.';
});

}
 


// Add event for fetch button
fetchButton.addEventListener('click', () => {
  const locationName = prompt('Enter a location:');
  if (location){
    fetchWeatherData(undefined, undefined,locationName);
  }
  });

//Add event listener for unit toggle button
unitToggle.addEventListener('click', () => {

// Get the temperature value
const currentTemperature = parseFloat(temperatureElement.textContent);

// Check if the temperature is in celsius
const isCelsius = temperatureElement.textContent.includes('°C');

// Convert and format the temperature based on the current unit
let newTemperature; 

if (isCelsius) {
// switch to Fahrenheit 
newTemperature = convertAndFormatTemperature(currentTemperature, true);
} else {
  // Switch to celsius
 newTemperature = convertAndFormatTemperature(currentTemperature, false);

// Update the temperature element with the new value
temperatureElement.textContent = newTemperature;
}
});


 });

