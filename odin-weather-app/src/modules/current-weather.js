'use strict';

import { getWeatherIcon } from "./weekly-forecast";

const fahrenheitToCelsius = (tempF) => ((tempF - 32) * 5 / 9).toFixed(1);

export const updateWeatherInfo = (weatherData) => {
    const weatherIcon = document.querySelector('.weekly-forecast__icon');
    const city = document.getElementById('currentWeatherCity');
    const degrees = document.getElementById('currentWeatherDegrees');
    const condition = document.getElementById('currentWeatherCondition');
    const rainProbability = document.getElementById('currentWeatherRainProbability');
    const lowHigh = document.getElementById('currentWeatherLowHigh');
    const uv = document.getElementById('currentWeatherUV');
  
    // Update the elements with the data from weatherData
    city.textContent = weatherData.location.LocalizedName;
    degrees.textContent = `${fahrenheitToCelsius(weatherData.DailyForecasts[0].Temperature.Minimum.Value)}°C`;
    condition.textContent = weatherData.DailyForecasts[0].Day.IconPhrase;
    rainProbability.textContent = `${weatherData.DailyForecasts[0].Day.PrecipitationProbability}% Probability of Rain`;
    lowHigh.textContent = `${fahrenheitToCelsius(weatherData.DailyForecasts[0].Temperature.Minimum.Value)}°C Low / ${fahrenheitToCelsius(weatherData.DailyForecasts[0].Temperature.Maximum.Value)}°C High`;
  
   // Set the weather icon
   const iconCode = weatherData.DailyForecasts[0].Day.IconPhrase;
   const iconClass = getWeatherIcon(iconCode);
   weatherIcon.className = `weekly-forecast__icon wi ${iconClass}`;

    // Find the UV index 
    const uvIndex = weatherData.DailyForecasts[1].AirAndPollen.find((item) => item.Name === 'UVIndex').Value;
    uv.textContent = getUVLevelText(weatherData.DailyForecasts[0].AirAndPollen[5].Value);
};

  function getUVLevelText(uvIndex) {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return `Low UV Levels ${uvIndex}`;
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        return `Moderate UV Levels ${uvIndex}`;
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        return `High UV Levels ${uvIndex}`;
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        return `Very High UV Levels ${uvIndex}`;
    } else if (uvIndex >= 11) {
        return `Extreme UV Levels ${uvIndex}`;
    } else {
        return `Unknown UV Levels ${uvIndex}`;
    }
}

