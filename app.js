//API KEY
const API_key = "33d07f4aa78a9f5325a8e919232ca63f";

//DOM select
const timeZone = document.querySelector('.time-zone');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const geolocation = document.querySelector('.geolocation');
const currentTemp = document.querySelector('.current-temp');
const weathericon = document.querySelector('.weather-icon');
const weatherdetails = document.querySelector('.weather-details');
const stime = document.querySelector('.suntime');
const aboutweather =document.querySelector('.aboutweather');

//Arrays for naming date and months
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


//Setting Time and Date frome system
setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    //Time in 12hr format
    const hoursIn12HrFormat = hour >= 13 ? hour%12: hour ;
    const minutes = time.getMinutes();
    // choose am or pm
    const ampm = hour >=12 ? 'PM' : 'AM';
    //Set time and fixing the missing 0
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = `${days[day]} ,   ${date} ${months[month]}`;
},1000);

//use HTML Geolocation to fetch the api data based on latitude and longitude from it 
const Data = () =>{
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&units=metric&lon=${longitude}&appid=${API_key}`).then(res => res.json()).then(data => {
            showData(data);
        })
        
    });
};

Data();


//Showing data function
const showData = (data) => {
   let {humidity,pressure,feels_like,temp,country,name} = data.main;
   let countyName = data.name;
   let countryCode = data.sys.country;
   let suntime = data.sys;
   let wind_speed = data.wind.speed;
   let visibility = data.visibility;
   let {lon,lat} = data.coord;
   let weather = data.weather[0];
   aboutweather.textContent=`Feels like ${feels_like}°C. ${weather.description}. Enjoy you time ❤️`;
   currentTemp.textContent = `${temp} °C`;
   timeZone.textContent = `${countyName} / ${countryCode}`;
   geolocation.textContent = `${lon},${lat}`;
   console.log(suntime.sunrise);

   weathericon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
   weatherdetails.innerHTML= `<div class="weather-item">
                                  <div>Humidity:<span class="details-values">${humidity} %</span></div>
                               </div>
                            <div class="weather-item">
                             <div>Pressure:<span class="details-values">${pressure} hPa</span></div>
                    
                              </div>
                                <div class="weather-item">
                                <div>Wind speed:<span class="details-values">${wind_speed } m/s WSW</span></div>
                              </div>
                          <div class="weather-item">
                             <div>Visibility:<span class="details-values">${visibility / 1000} km</span></div>
                              </div>
                             `;
    const sr =  moment(suntime.sunrise).format('LT');
    const ss =  moment(suntime.sunset).format('LT');
    stime.textContent = `Sunrise : ${sr} | Sunset : ${ss}`;

};




