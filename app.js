const key = "3dade113dc2419308ac08dc10679dc54"


let input=document.querySelector('.city-input');
let weatherData = document.querySelector('.weather-data');
let btn=document.querySelector('.btn-search');
btn.addEventListener('click', ()=>{
    displayWeather();

})

document.addEventListener('keypress',e =>{
    if(e.keyCode===13){
        displayWeather();
    }
})
//spinner
/*const renderLoader = () => {
    let loader = `
    <div class="d-flex justify-content-center m-2">
      <div class="spinner-border spinner " role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </div>
      `;
    weatherData.insertAdjacentHTML('beforebegin', loader);
}

const clearLoader = () => {
    let spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.parentElement.removeChild(spinner);


    }

} */


function displayWeather(){
    let place = input.value;
    console.log(place);

    let api="https://api.openweathermap.org/data/2.5/find?q="+ place +"&units=metric&lang=sk&appid="+ key;
    console.log(api);
    //renderLoader();
    fetch(api)
    .then(response=>{
        data=response.json();
        return data;
})
    .then(data=>{
        console.log(data);
        //clearLoader();
     //access data from the fetched object
        let temp=data.list[0].main.feels_like;
        let weather=data.list[0].weather[0].description;
        let windSpeed=data.list[0].wind.speed;
        let maxTemp=data.list[0].main.temp_max;
        let minTemp=data.list[0].main.temp_min;
        let humidity=data.list[0].main.humidity;
        let pressure=data.list[0].main.pressure;

     //display weather
        document.querySelector('.temp').textContent=temp;
        document.querySelector('.weather').textContent=weather;
        document.querySelector('.wind-speed').textContent=windSpeed + " kph";
        document.querySelector('.max-temp').textContent=maxTemp;
        document.querySelector('.min-temp').textContent=minTemp ;
        document.querySelector('.humidity').textContent=humidity + " %";
        document.querySelector('.pressure').textContent=pressure + " Pa";
        document.querySelector('.place').textContent=place;

     //change icon for different weathers
        if( weather=='moderate rain')
        weatherIcon.setAttribute('src','icons/moderate.png')
        //document.querySelector('.weather').textContent="Mierny dážď";

        else if(weather=='haze')
        weatherIcon.setAttribute('src','icons/haze.png')
        //document.querySelector('.weather').textContent="Hmla";

        else if(weather=='scattered clouds')
        weatherIcon.setAttribute('src','icons/scattered.png')
      //  document.querySelector('.weather').textContent="Rozptýlené";

        else if(weather=='light rain')
        weatherIcon.setAttribute('src','icons/light.png')
      //  document.querySelector('.weather').textContent="Slabý dážď";

        else if(weather=='overcast clouds')
        weatherIcon.setAttribute('src','icons/overcast.png')
      //  document.querySelector('.weather').textContent="Zamračené";




    })
    .catch(error=>{
        console.log(error);
        alert('please enter a valid place.');
})


//daily forecast

let forecastapi="https://api.openweathermap.org/data/2.5/forecast/daily/find?q="+ place +"&units=metric&lang=sk&appid="+key;
fetch(forecastapi)
.then(response=>{
    forecastdata=response.json();
    return forecastdata;
})
.then(forecastdata=>{
    console.log(forecastdata);})





}
let weatherIcon=document.querySelector('.weather-icon');

//add today's date
//let timer = document.querySelector('.timer');
let date=document.querySelector('.date');
let today=new Date();
const options={year: 'numeric', month: 'long', day: 'numeric' }
date.textContent=today.toLocaleDateString('en-US',options);
//timer.textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();



//daily forcast
function currentTime() {
  let date = new Date(); /* creating object of Date class */
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
    let t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) { /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime();
