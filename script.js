async function getWeather(){

const city=document.getElementById("cityInput").value;

const apiKey="b0e1111cfc123fdeae3483a341968460";

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);
const data=await response.json();

if(data.cod !== 200){
document.getElementById("error").innerText="City not found";
return;
}

document.getElementById("cityName").innerText="City: "+data.name;

document.getElementById("temperature").innerText=
"Temperature: "+data.main.temp+" °C";

document.getElementById("condition").innerText=
"Condition: "+data.weather[0].main;

document.getElementById("humidity").innerText=
"Humidity: "+data.main.humidity+" %";

document.getElementById("wind").innerText=
"Wind Speed: "+data.wind.speed+" m/s";

document.getElementById("error").innerText="";

}catch(error){

document.getElementById("error").innerText="Something went wrong";

}

}