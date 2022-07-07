const moment = require('moment');
const { condition } = require('sequelize');
const { get } = require('../controllers/homeRoutes');
const openWeathermapKey = '26430011a9e304ff62d863402ab09fcc';

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    let thisDate = new Date(date);
    thisDate.setMinutes(thisDate.getMinutes() + thisDate.getTimezoneOffset());
    return moment(thisDate).format('M/D/yyyy');
  },
  format_datetime: (date) => {
    return date.toLocaleTimeString() + ' on ' + date.toLocaleDateString();
  },
  format_date_input: (date) => {
    const thisDate = new Date(date);
    return thisDate.toISOString().substring(0, 10);
  },
  lc: (text) => {
    if(text){
      return (text.toLowerCase());
    } 
    return "";
  },
};
// 7 day weather forcast goes here

// function getWeather(
//   city,
//   country,
//   startDate
// ) {
//   var cityEvent = new Date(city);
//   var cityNow = new Date();
//   var intDateDiff =
//     Math.floor((cityNow.getTime() - cityEvent.getTime()) / (24 * 3600 * 1000)) *
//       -1 -
//     1;
//   if (intDateDiff <= 6) {
//     var params =
//       'country=' +
//       country +
//       '&startDate=' +
//       startDate +
//       '&exclude=minutely,hourly,alerts&units=imperial&aapid=' +
//       apiOpenWeather;
//     fetch('https://api.openweathermap.org/data/2.5/onecall?' + params)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         var forecast = data.daily[intDateDiff];
//         containerElement.append(
//           '<img src=\'https://openweathermap.org/img/wn/' +
//             forecast.weather[0].icon +
//             '.png \' class=\'weather-icons\'>'
//         );
//         containerElement.append(
//           '<span class=\'accent-text h6(' +
//             Math.floor(forecast.temp.max) +
//             '/' +
//             Math.floor(forecast.temp.min) +
//             '°F)</span>'
//         );
//       });
//   }
// }

// getWeather();
// function populateWeather(city, country) {
//   var params = 'city=' + city + '&country=' + country + openWeathermapKey;
//   fetch('https://api.openweathermap.org/geo/1.0/direct?' + params)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       if (data.length > 0) {
//         var item = data[0];
//         getWeatherByGCS(item.city, item.country, item.startDate);
//       } else {
//         alert('No matching city was found!');
//       }
//     });
// }
// function getWeatherByGCS(city, country) {
//   var params =
//     'city=' +
//     city +
//     '&country=' +
//     country +
//     '&exclude=minutely,hourly,alerts&units=imperial&appid=' +
//     openWeathermapKey;
//   fetch('https://api.openweathermap.org/data/2.5/oncall?' + params)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       var current = data.current;
//       cityWeather(city, current.temp, current.wind_speed, current.humidity, current.uvi, current.weather[0].main, current.weather[0].icon);)
//       for(i = 0; i < 5; i++){
//         var forcast = data.daily[i];
//         cityForcast(i, forecast.temp.max, forecast.wind_speed, forecast.humidity, forecast.weather[0].main, forecast.weather[0].icon)
//       }

//       var cites = localStorage.getItem('weather-dash-cites');
//       if (!cites.includes(city)) {
//         localStorage.setItem('weather-dash-city', cites + ',' + city);
//       }
//     });
// }

// function populateLocalStorage() {
//   var cites = localStorage.getItem('weather-dash-cities');
//   if(cites == null) { localStorage.setItem("weather-dash-cities", "Atlanta,Charlotte,Los Angeles")};
// }

// function populateButtons() {
//   var cites = localStorage.getItem("weather-dash-cities");
//   cites = cites.split(",");
//   elQuickButtons.html("");
//   for (i =0; i < cites.length; i++) {
//     elQuickButtons.append('<button class="btn qb btn-warning text-dark w-100 m-1">' + cites[i] + '<button>');
//   }

// }

// $("#search").on("click", function () {
//   populateWeather($("#city").val());
// })

// elQuickButtons.on("click", function (event) {
//   populateWeather($(event.target).text());
// })

// populateLocalStorage();
// populateButtons();
// populateWeather();
