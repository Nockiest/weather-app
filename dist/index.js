 
const worldCityData = {
  currentCityData: {
    city: "New York",
    temperature: 20,
    humidity: 50,
    forecast: "clouds",
    rain: 20 
  },
  newyork: {
    cityName: "New York",
    temperature: 20,
    imageUrl: undefined,
    dateMonth: 12,
    dateHour: 12,
    humidity: "50%",
    rainProbability: "20%",
    forecast: "Sunny"
  },
  tokio: {
    cityName: "Tokio",
    temperature: 25,
    imageUrl: undefined,
    dateMonth: 12,
    dateHour: 12,
    humidity: "60%",
    rainProbability: "30%",
    forecast: "clouds"
  },
  london: {
    cityName: "London",
    temperature: 15,
    imageUrl: undefined,
    dateMonth: 12,
    dateHour: 12,
    humidity: "70%",
    rainProbability: "40%",
    forecast: "Rainy"
  },
  moscow: {
    cityName: "Moscow",
    temperature: 5,
    imageUrl: undefined,
    dateMonth: 12,
    dateHour: 12,
    humidity: "80%",
    rainProbability: "50%",
    forecast: "Snowy"
  }
};
function generateForecastChart(forecastData) {
  const chartContainer = document.getElementById("week-forecast-chart");

  // Remove all existing chart elements from the chart container
  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
  }

  // Calculate the percentage of each temperature relative to the first temperature
  const firstTemperature = forecastData[0].main.temp;
  const temperaturePercentages = forecastData.map(dayData => (dayData.main.temp / firstTemperature) * 100);

  // Loop through each day of the forecast and create a chart element
  for (let i = 0; i < 6; i++) {
    const dayData = forecastData[i];
    const temperature = dayData.main.temp;
    const dayOfWeek = new Date(dayData.dt_txt).toLocaleString('en-us', {weekday: 'short'});

    // Create a chart element and its sub-elements
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-element", `chart-element-${i+1}`);

    const chartDay = document.createElement("div");
    chartDay.classList.add("body-text", "chart-day");
    chartDay.textContent = dayOfWeek;

    const chartBar = document.createElement("div");
    chartBar.classList.add("chart-bar");

    const chartTemperature = document.createElement("div");
    chartTemperature.classList.add("body-text", "chart-temperature");
    chartTemperature.textContent = `${temperature.toFixed(0)}\xB0C`;

    // Set the gradient of the chart bar
    const percentRed = (temperature / 50) * 100 * 1.5; // Convert temperature to percentage
    const colorStop = percentRed.toFixed(0); // Get the percentage as a whole number
    chartBar.style.background = `linear-gradient(to top, #ff4d4d ${colorStop}%, #DBECFD ${colorStop}%, #DBECFD ${colorStop}%, #DBECFD ${colorStop}%, #4da6ff ${colorStop}%)`;

    // Add the sub-elements to the chart element
    chartElement.appendChild(chartDay);
    chartElement.appendChild(chartBar);
    chartElement.appendChild(chartTemperature);

    // Add the chart element to the chart container
    chartContainer.appendChild(chartElement);
  }
}


function getWeatherIcon(description) {
  const weatherImages = {
    sun: '<i class="fa fa-sun"></i>',
    cloud: '<i class="fa fa-cloud"></i>',
    storm: '<i class="fa fa-bolt"></i>',
    rain: '<i class="fa fa-cloud-showers-heavy"></i>',
    snow: '<i class="fa fa-snowflake"></i>',
    mist: '<i class="fa fa-smog"></i>',
  };

  const keywords = {
    sun: ['clear', 'sunny', 'fair'],
    cloud: ['clouds', 'overcast'],
    storm: ['storm', 'thunderstorm', 'lightning'],
    rain: ['rain', 'shower', "light rain", "heavy rain"],
    snow: ['snow', 'flurry'],
    mist: ['mist', 'fog', 'haze', 'smoke'],
  };

  // Check if the description matches any of the keywords for each weather type
  for (const weatherType in keywords) {
    for (const keyword of keywords[weatherType]) {
      if (description.toLowerCase().includes(keyword)) {
        return weatherImages[weatherType];
      }
    }
  }

  // If no matches were found, return the mist icon as a default
  return weatherImages.mist;
}

const apiKey = "92a83ddb6b4846933703e6ee00519df8";
const worldCities = ["newyork", "tokio", "london", "moscow"];

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const cityName = data.city.name;
        const forecastList = data.list;
        console.log(forecastList);

        
         
        if (worldCities.includes(city)) {
          worldCityData[city].city = cityName;
          // Store the forecast data in worldCityData for later use
          worldCityData[city].forecastList = forecastList;
        } else {

          const temperatures = [];

          for (let i = 0; i < 5; i++) {
           const forecastData = forecastList[i*8];
           const temperature = forecastData.main.temp;
           const forecast = forecastData.weather[0].description;
           const humidity = forecastData.main.humidity;
           const rain = forecastData.clouds.all;
   
           temperatures.push(temperature);
           
           console.log(`Forecast for day ${i+1}:`, cityName, temperature, forecast, humidity, rain);
           
           // You can store this data in an array or object for later use
         }
   
         console.log('Temperatures:', temperatures);
          // Set the forecast data for the current city
          generateForecastChart(forecastList);
          // console.log(`Setting current city data to default values:`, worldCityData.currentCityData);
          // document.getElementById("current-city-name").innerHTML = cityName;ˇ
          
          console.log(cityName)
          const now = new Date();
          const date = now.toLocaleDateString();
          const hour = now.getHours();
          const minute = now.getMinutes();
          console.log(`${date} ${hour}:${minute}`);
          document.getElementById("date-month").innerHTML = date;
          document.getElementById("date-hour").innerHTML =  `${hour}:${minute}`;
          
          // Display the forecast data for the current day
          const currentForecastData = forecastList[0];
          const currentTemperature = currentForecastData.main.temp;
          const currentForecast = currentForecastData.weather[0].description;
          const currentHumidity = currentForecastData.main.humidity;
          const currentRain = currentForecastData.clouds.all;
          
          document.getElementById("current-forecast").innerHTML = currentForecast;
          document.getElementById("current-humidity").innerHTML = currentHumidity;
          document.getElementById("current-rain").innerHTML = currentRain;
          document.getElementById("current-temperature").innerHTML = currentTemperature;
          const iconContainer = document.getElementById("icon-container");
          const icon  = getWeatherIcon(currentForecast);
          iconContainer.innerHTML = icon;
        }
      })
      .catch(error => console.log(error));
    
  console.log(worldCityData)
}


function updateWorldCitiesWeather() {
  worldCities.forEach(city => {
    //getWeather(city);
  });
}

function displayCityWeather(city){

}


window.onload = function() {
    const body = document.body; // Get the body element
    const observer = new MutationObserver(function(mutations) {
      const divTags = body.getElementsByTagName('div'); // Get all div tags inside the body element
  
      if (divTags.length >= 3) { // If there are at least 3 div tags
        const lastDivTag = divTags[divTags.length - 1]; // Get the last div tag
        body.removeChild(lastDivTag); // Remove the last div tag
      }
       
    });

    // setInterval(function() {
    //   const now = new Date();
    //   const date = now.toLocaleDateString();
    //   const hour = now.getHours();
    //   const minute = now.getMinutes();
    //   console.log(`${date} ${hour}:${minute}`);
    //   document.getElementById("date-month").innerHTML = date;
    //   document.getElementById("date-hour").innerHTML =  `${hour}:${minute}`;
    // }, 10000);
    
    const lowerContainer = document.getElementById("lower-container");

  // iterate over each city in the worldCityData object
  for (const city in worldCityData) {
    if (city !== "currentCityData") {
      // append the corresponding weather container to the lowerContainer element
      const cityData = worldCityData[city];
      lowerContainer.appendChild(appendWeatherContainer(cityData.cityName, cityData.temperature, cityData.imageUrl, cityData.dateMonth, cityData.dateHour, cityData.humidity, cityData.rainProbability, cityData.forecast));
    }
  }

  updateWorldCitiesWeather() 
    observer.observe(body, { childList: true }); // Start observing the body element for changes
  };


function appendWeatherContainer(cityName, temperature, imageUrl, dateMonth, dateHour, humidity, rainProbability, forecast) {
  const container = document.createElement("div");
  container.classList.add("current-weather");
  
  const contents = document.createElement("div");
  contents.classList.add("current-weather-contents");
  
  const title = document.createElement("div");
  title.classList.add("current-weather-title"); 
  title.classList.add("body-text");
  title.textContent = cityName;
  contents.appendChild(title);
  
  const middle = document.createElement("div");
  middle.classList.add("current-weather-middle");
  
  const temp = document.createElement("p");
  temp.classList.add("current-weather-temperature");
  temp.textContent = temperature;
  middle.appendChild(temp);
  
    
  const iconContainer = document.createElement("div")
  const icon  = getWeatherIcon(forecast);
  //const icon = document.createElement("i");
  console.log(icon )
  // icon.classList.add("fas", `fa-${iconClass}`);
  //icon.setAttribute("aria-hidden", "true");
  iconContainer.innerHTML = icon;    
  middle.appendChild(iconContainer);
  
  const date = document.createElement("div");
  date.classList.add("date");
  
  const month = document.createElement("p");
  month.classList.add("centered-text");
  month.classList.add("date-month");
  month.textContent = dateMonth;
  date.appendChild(month);
  
  const hour = document.createElement("p");
  hour.classList.add("centered-text");
  hour.classList.add("date-hour");
  hour.textContent = dateHour;
  date.appendChild(hour);
  
  middle.appendChild(date);
  contents.appendChild(middle);
  
  const bottom = document.createElement("div");
  bottom.classList.add("current-weather-bottom");
  
  const bottomContents = document.createElement("div");
  bottomContents.classList.add("current-weather-bottom-contents");
  
  const labels = document.createElement("div");
  labels.classList.add("labels");
  
  const temperatureLabel = document.createElement("div");
  temperatureLabel.classList.add("temperature");
  temperatureLabel.textContent = "Temperature:";
  labels.appendChild(temperatureLabel);
  
  const humidityLabel = document.createElement("div");
  humidityLabel.classList.add("humidity");
  humidityLabel.textContent = "Humidity:";
  labels.appendChild(humidityLabel);
  
  const rainProbabilityLabel = document.createElement("div");
  rainProbabilityLabel.classList.add("rain-probability");
  rainProbabilityLabel.textContent = "Rain Probability:";
  labels.appendChild(rainProbabilityLabel);
  
  const forecastLabel = document.createElement("div");
  forecastLabel.classList.add("forecast");
  forecastLabel.textContent = "Forecast:";
  labels.appendChild(forecastLabel);
  
  bottomContents.appendChild(labels);
  
  const values = document.createElement("div");
  values.classList.add("values");
  
  const temperatureValue = document.createElement("div");
  temperatureValue.classList.add("temperature-value");
  temperatureValue.textContent = temperature;
  values.appendChild(temperatureValue);
  
  const humidityValue = document.createElement("div");
  humidityValue.classList.add("humidity-value");
  humidityValue.textContent = humidity;
  values.appendChild(humidityValue);
  
  const rainProbabilityValue = document.createElement("div");
  rainProbabilityValue.classList.add("rain-probability-value");
  rainProbabilityValue.textContent = rainProbability;
  values.appendChild(rainProbabilityValue);
  
  const forecastValue = document.createElement("div");
  forecastValue.classList.add("forecast-value");
  forecastValue.textContent = forecast;
  values.appendChild(forecastValue);
  
  bottomContents.appendChild(values);
  bottom.appendChild(bottomContents);
  contents.appendChild(bottom);
  
  container.appendChild(contents);
  
  return container;
}

   