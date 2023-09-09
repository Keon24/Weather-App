const apikey = 'b0c7b37d3059bd769e201b648f67214b';
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

// Check if geolocation is available in the browser
if("geolocation" in navigator) {
  // Request permission for geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    // Extract latitude and longitude from the position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
   // update the weather data using the user's location
   fetchWeatherData(latitude,longitude);
  }, function(error) {
    //Handle errors
    if(error.code === 1) {
      console.error("User denied geolocation permission.");
    }else if (error.code === 2) {
      console.error("Unable to determine location. Please try again later");

    }else if (error.code === 3) {
      console.error("Geolocation information is temporarily unavailable");
      
    }else{
      console.error("Error getting location: " + error.message);

    }
  }); 
}else{
  console.error("Geolocation is not available in the browser");
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

forecastTempElements.forEach((element, index) => {
    element.textContent = weatherData.forecast[index].temp + '°C';
});
forecastConditionsElement.forEach((element, index) => {
    element.textContent= weatherData.forecast[index].forecastConditions;
});

errorElement.textContent = '';
}



 //Fetch weather data from API
function fetchWeatherData (latitude,longitude,locationName) {
  let apiUrl ="";
   // Use latitude and longitude if present, otherwise use location name
   if (latitude && longitude) {
   apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
   } else{
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apikey}`;
   } 
   
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
    temperature: data.main.temp,
    conditons: data.weather[0].description,
    forecast: [

    ],
  };
  updateWeatherData(fetchedWeatherData);

})
//Implement error hamdlimg where the API request fails
.catch((error) => { 
  console.error('Error fetching data:', error);
  errorElement.textContent = 'An error occurred while fetching the weather data.';
});

}
 


// Add event for fetch button
fetchButton.addEventListener('click', () => {
  const location = prompt('Enter a location:');
  if (location){
    fetchWeatherData(location)
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
 });

