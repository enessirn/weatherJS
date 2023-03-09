// !api
var key = 'b9edc86bf631a79fca2296c92ab9af8a'
var api = 'https://api.openweathermap.org/data/2.5/weather?'
var iconAPI = ' http://openweathermap.org/img/wn/';


//?dom
var searchBox = document.getElementById("searchBox")
var cityDOM = document.getElementById("city")
var temp = document.getElementById("temp")
var desc = document.getElementById("desc")
var minmax = document.getElementById("minmax")
var imgIcon = document.getElementById("imgIcon")


// funcs
function cityAdd(e){
    if (e.keyCode == '13') {
        if (searchBox.value == "") {
            alert("Bir şehir giriniz")
        }
        else {
            fetchData(searchBox.value)
            imgIcon.innerHTML = ""
        }
        
        
    }
    }
const fetchData = async (city)=> {
    try {
        let locationData = 'http://api.openweathermap.org/geo/1.0/direct?q=';
        let fullLocationData = await `${locationData}${city}&appid=${key}`
        
        const result = await fetch(fullLocationData)
        const locationCity = await result.json();
        let cityLat = locationCity[0].lat;
        let cityLon = locationCity[0].lon;
        //location end

        let FULL_API_URL = `${api}lat=${cityLat}&lon=${cityLon}&appid=${key}&units=metric&lang=tr`

        const weatherData = await fetch(FULL_API_URL)
        const weatherDataJson = await weatherData.json()
        const weatherIcon = `${iconAPI}${weatherDataJson.weather[0].icon}.png`
        cityDOM.innerText = weatherDataJson.name;
        const imgElement = document.createElement("img")
        imgElement.setAttribute("src",`${weatherIcon}`)
        imgIcon.appendChild(imgElement)
    


        temp.innerText = Math.round(weatherDataJson.main.temp) + "°C "
        desc.innerText = weatherDataJson.weather[0].description
        minmax.innerText = Math.round(`${weatherDataJson.main.temp_min}`) + "°C " + " / " + Math.round(`${weatherDataJson.main.temp_max}`) + "°C "
    } catch (error) {
        alert(error)
        console.log(error)
    }
}





searchBox.addEventListener("keydown",cityAdd)