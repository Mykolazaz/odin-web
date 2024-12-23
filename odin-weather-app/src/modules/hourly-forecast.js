'use strict';
import { getWeatherIcon } from "./weekly-forecast";

const fahrenheitToCelsius = (tempF) => ((tempF - 32) * 5 / 9).toFixed(1);

export function updateHourlyForecast(hourlyData) {
    const hourlyTimeline = document.querySelector('.hourly-forecast__timeline');
    hourlyTimeline.textContent = '';
  
    for (let i = 0; i < 12; i++) {
      const forecast = hourlyData[i];
      const time = new Date(forecast.DateTime).toLocaleTimeString('en-US', { hour: 'numeric' });
      const condition = forecast.IconPhrase;
      const iconClass = `wi ${getWeatherIcon(condition)}`;
      const degrees = fahrenheitToCelsius(Math.round(forecast.Temperature.Value));
  
      const hourlyForecastItem = document.createElement('div');
      hourlyForecastItem.className = 'hourly-forecast__item';
      
      const hourlyTime = document.createElement('div');
      hourlyTime.className = 'hourly-forecast__time';
      hourlyTime.textContent = time;
      
      const hourlyCondition = document.createElement('div');
      hourlyCondition.className = 'hourly-forecast__condition';
      
      const conditionText = document.createElement('span');
      conditionText.textContent = condition;
      
      const icon = document.createElement('i');
      icon.className = iconClass;
      
      const hourlyDegrees = document.createElement('div');
      hourlyDegrees.className = 'hourly-forecast__degrees';
      hourlyDegrees.textContent = `${degrees}°C`;
      
      hourlyCondition.appendChild(conditionText);
      hourlyCondition.appendChild(document.createElement('br'));
      hourlyCondition.appendChild(icon);
      
      hourlyForecastItem.appendChild(hourlyTime);
      hourlyForecastItem.appendChild(hourlyCondition);
      hourlyForecastItem.appendChild(hourlyDegrees);
      
      hourlyTimeline.appendChild(hourlyForecastItem);
    }
  }