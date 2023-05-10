export default  function appendWeatherContainer(cityName, temperature, imageUrl, dateMonth, dateHour, humidity, rainProbability, forecast) {
    const container = document.createElement("div");
    container.classList.add("current-weather");
    
    const contents = document.createElement("div");
    contents.classList.add("current-weather-contents");
    
    const title = document.createElement("div");
    title.classList.add("current-weather-title");
    title.textContent = cityName;
    contents.appendChild(title);
    
    const middle = document.createElement("div");
    middle.classList.add("current-weather-middle");
    
    const temp = document.createElement("p");
    temp.classList.add("current-weather-temperature");
    temp.textContent = temperature;
    middle.appendChild(temp);
    
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Weatherimg";
    img.classList.add("weather-image");
    middle.appendChild(img);
    
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
    
    const cityNameValue = document.createElement("div");
    cityNameValue.classList.add("city-name");
    cityNameValue.textContent = cityName;
    values.appendChild(cityNameValue);
    
    bottomContents.appendChild(values);
    bottom.appendChild(bottomContents);
    contents.appendChild(bottom);
    
    container.appendChild(contents);
    
    return container;
  }