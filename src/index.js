import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getWeather(city, callback) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      callback(response, city);
    }
  }
  request.open("GET", url, true);
  request.send();
}

// UI Logic
function getElements(response, city) {
  $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
  $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    getWeather(city, getElements);
  });
});