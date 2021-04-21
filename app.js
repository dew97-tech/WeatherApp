const api = {
  key: "5ae32fe8822ec95ad6f03dc98872fcec",
  baseUrl : "https://api.openweathermap.org/data/2.5/weather?"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress',setQuery);

function setQuery(event){
  if(event.keyCode === 13){
    getResults(searchBox.value);
  }
}

function getResults(query){
  fetch(`${api.baseUrl}q=${query}&appid=${api.key}`)
   .then(weather => {
     return weather.json();
   }).then(displayResults);
}

function displayResults(weather){
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerHTML = `${weather.name} , ${weather.sys.country}`;


  let today = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = getDate(today);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = ` ${Math.round(weather.main.temp) - 273}<span>&#730</span>`;


  let weather_cr = document.querySelector('.current .weather');

  weather_cr.innerHTML = weather.weather[0].main;

  let hi_low =  document.querySelector('.hi-low');
  let hi_low_min= (weather.main.temp_min - 273);
  hi_low_min = hi_low_min.toFixed(2);
  let hi_low_max= (weather.main.temp_max - 273);
  hi_low_max= hi_low_max.toFixed(2);
  
  hi_low.innerHTML = ` ${hi_low_min}<span>&#730</span>/ ${hi_low_max}<span>&#730</span>`;
}

function getDate(date){
  let months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[date.getDay()];
  let toDate =date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${day} ${toDate} ${month} ${year}`;
}

