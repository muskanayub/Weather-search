const apiKey="b0e1111cfc123fdeae3483a341968460";

/* SEARCH PAGE */

function searchWeather(){

const city=document.getElementById("cityInput").value;

localStorage.setItem("city",city);

window.location.href="weather.html";

}

/* BACK BUTTON */

function goBack(){

window.location.href="index.html";

}

/* WEATHER PAGE */

async function loadWeather(){

const city=localStorage.getItem("city");

if(!city) return;

const loader=document.getElementById("loader");
loader.style.display="block";

const weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

try{

const weatherRes=await fetch(weatherURL);
const weatherData=await weatherRes.json();

document.getElementById("cityName").innerText=weatherData.name;

document.getElementById("temperature").innerText=weatherData.main.temp+"°C";
document.getElementById("humidity").innerText=weatherData.main.humidity+"%";
document.getElementById("wind").innerText=weatherData.wind.speed+" m/s";
document.getElementById("feels").innerText=weatherData.main.feels_like+"°C";

const weather=weatherData.weather[0].main;

document.getElementById("condition").innerText=weather;

/* ICON */

document.getElementById("weatherIcon").src=
`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

/* MOOD */

const moodMessages={
Clear:"☀ Perfect day for sunshine!",
Rain:"🌧 Don't forget your umbrella!",
Clouds:"☁ Cozy cloudy weather.",
Snow:"❄ Winter magic outside!"
};

document.getElementById("mood").innerText=
moodMessages[weather] || "Enjoy the weather!";

/* RAIN EFFECT */

if(weather.toLowerCase().includes("rain")){
createRain();
}

/* FORECAST */

const forecastRes=await fetch(forecastURL);
const forecastData=await forecastRes.json();

const forecastContainer=document.getElementById("forecast");

forecastContainer.innerHTML="";

for(let i=0;i<5;i++){

const data=forecastData.list[i*8];

const card=document.createElement("div");
card.className="forecastCard";

const day = new Date(data.dt_txt).toLocaleDateString('en-US',{
weekday:'short'
});

card.innerHTML=`
<p>${day}</p>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
<p>${Math.round(data.main.temp)}°C</p>
`;

forecastContainer.appendChild(card);

}

}catch{

alert("City not found");

}

loader.style.display="none";

}

/* RAIN ANIMATION */

function createRain(){

for(let i=0;i<100;i++){

let drop=document.createElement("div");
drop.className="raindrop";

drop.style.left=Math.random()*100+"vw";
drop.style.animationDuration=Math.random()*1+"s";

document.body.appendChild(drop);

}

}

/* LOAD WEATHER PAGE */

if(window.location.pathname.includes("weather.html")){
loadWeather();
}