import $, { get } from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getWeather(city, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

function getFahrenheit(kelvin, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/convert?kelvin=${kelvin}`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

// this function takes the fahrenheit temperature number and pings an API that returns the 
function getAsciiLetter(fahrenheit, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/ascii?fahrenheit=${fahrenheit}`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

// UI Logic
function getElements(response) {
  console.log(response);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    getWeather(city, function(response) {
      console.log("weather", response);
      getFahrenheit(response.main.temp, function(response) {
        console.log("fahrenheight", response);
        getAsciiLetter(response, function(response) {
          console.log("ascii", response);
          if (response.random) {
            getElements(response.random);
          } else {
            getElements(response.actualAsciiChar);
          }
        })
      })
    });
  });
});