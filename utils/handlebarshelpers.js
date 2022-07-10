const moment = require('moment');
const fetch = require('node-fetch');
const openWeathermapKey = '26430011a9e304ff62d863402ab09fcc';

const format_time = (date) => {
  return date.toLocaleTimeString();
};

const format_date = (date) => {
  let thisDate = new Date(date);
  thisDate.setMinutes(thisDate.getMinutes() + thisDate.getTimezoneOffset());
  return moment(thisDate).format('M/D/yyyy');
};

const format_datetime = (date) => {
  return date.toLocaleTimeString() + ' on ' + date.toLocaleDateString();
};

const format_date_input = (date) => {
  const thisDate = new Date(date);
  return thisDate.toISOString().substring(0, 10);
};

const lc = (text) => {
  if (text) {
    return text.toLowerCase();
  }
  return '';
};

const trunc = (text, length) => {
  const thisString=new String(text);
  if (thisString) {
    return thisString.substring(0,length);
  }
  return '';
};



const getWeatherAPI = async (city, country, dateStart) => {
  const params =
    'q=' + city + ',,' + country + '&limit=1&appid=' + openWeathermapKey;
  const response = await fetch(
    'https://api.openweathermap.org/geo/1.0/direct?' + params
  );
  const data = await response.json();
  if (data?.length > 0) {
    const item = data[0];
    const params =
      'lat=' +
      item.lat +
      '&lon=' +
      item.lon +
      '&exclude=minutely,hourly,alerts&units=imperial&appid=' +
      openWeathermapKey;
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/onecall?' + params
    );
    const weatherData = await response.json();
    console.log(weatherData, 'weather call');
    return 'weather call';
  }
};

const getWeather = (city, country, dateIn) => {
  if (dateIn != '') {
    var dateStart = new Date(dateIn);
    var dateNow = new Date();
    var icons = ['02d', '09d', '01d'];

    var intDateDiff =
      Math.floor((dateNow.getTime() - dateStart.getTime()) / (24 * 3600 * 1000)) * -1 - 1;
    if (intDateDiff <= 6) {
      let weatherIcon = icons[0];
      if (city.length % 2 == 0) {
        weatherIcon = icons[1];
      } else if (city.length % 3 == 0) {
        weatherIcon = icons[2];
      }
      return (
        "<img src='https://openweathermap.org/img/wn/" +
        weatherIcon +
        "@2x.png'>"
      );
    }
  }
};

module.exports = {
  format_time,
  format_date,
  format_date_input,
  format_datetime,
  lc,
  trunc,
  getWeather,
  getWeatherAPI,
};
