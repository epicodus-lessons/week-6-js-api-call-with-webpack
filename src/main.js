import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
  $('.show-gif').text("");
}

function displayWeatherDescription(description) {
  $('.weather-description').text(`The weather is ${description}!`);
}

function displayGif(response) {
  if (response.data) {
    const url = response.data[0].images.downsized.url
    $('.show-gif').html(`<img src='${url}'>`);
  } else {
    $('.show-errors').text(`There was an error: ${response}`);
  }
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
      .then(function(response) {
        const weatherDescription = response.weather[0].description;
        displayWeatherDescription(weatherDescription);
        return GiphyService.getGif(weatherDescription);
      })
      .then(function(giphyResponse) {
        displayGif(giphyResponse);
      })
  });
});