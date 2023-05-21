let weatherLink = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = 'a7926f4cc1173527e56b88813f74682a';
let searchButton = document.querySelector("#clickButton");
var errorMessage = document.getElementById("error_message");

function loadWeatherInfo(data)
{
    try{
        errorMessage.innerHTML = "";
        document.querySelector(".weatherContainer").style.background = "white";
        let divContainer = document.querySelector("#weather-section")
        let Paragraphs = divContainer.querySelectorAll("p");
        let Headers = divContainer.querySelectorAll("h3");
        for(let u = 1; u < Paragraphs; u++){
            Paragraphs[u].style.display = "block";
        }
        document.querySelector("#weather").style.display = "inline-block";
        for(let u = 0; u < Headers.length; u++){
            Headers[u].style.display = "block";
        }    
        Headers[Headers.length-1].style.display = "flex";
        Headers[Headers.length-2].style.display = "flex";
        imageDesc = data.weather[0].main;
        imageUrl = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        let imageWeather = document.createElement("img");
        imageWeather.setAttribute("src", imageUrl);
        imageWeather.setAttribute("alt", imageDesc);
        let imageContainer = document.querySelector("#weather");
        while (imageContainer.hasChildNodes()) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
        imageContainer.appendChild(imageWeather);
        let location = document.querySelector("#location");
        let time = document.querySelector("#time");
        let humidity = document.querySelector("#humidity_data");
        let wind = document.querySelector("#wind_data"); 
        let description = document.querySelector("#description");
        let degrees = document.querySelector("#degrees");
        location.innerHTML = String(data.name) + ", " + String(data.sys.country);
        let utcTime = new Date();
        let localTime = new Date(utcTime.getTime() + data.timezone * 1000);
        let easternTime = new Date(localTime.getTime() + (4 * 60 * 60 * 1000));
        time.innerHTML = "Time: " + easternTime.toLocaleTimeString();
        humidity.innerHTML = "Humidity: " +  data.main.humidity;
        wind.innerHTML = "wind: " + data.wind.speed;
        description.innerHTML = data.weather[0].description;
        let temperature =  parseInt(data.main.temp - 273.15);
        degrees.innerHTML = temperature + "&deg; C";
        timeImg = document.querySelector("#timeImg");
        timeImg.src = "time.png";
        timeImg.alt = "time";
        let locationImg = document.querySelector("#country");
        locationImg.src = "country.png";
        locationImg.alt = "country";
    }
    catch (error){
        console.log(error)
        if(error instanceof TypeError){
            errorMessage = document.querySelector("#error_message");
            errorMessage.style.color = "white";
            errorMessage.style.fontWeight = "bold";
            errorMessage.innerHTML = "Whoops! Looks like that is not a city! Please enter a valid city like 'Chicago, US' or 'Chicago'";
            document.querySelector(".weatherContainer").style.background = "red";
            let divContainer = document.querySelector("#weather-section")
            let Paragraphs = divContainer.querySelectorAll("p");
            let Headers = divContainer.querySelectorAll("h3");
            for(let u = 1; u < Paragraphs; u++){
                Paragraphs[u].style.display = "none";
            }
            document.querySelector("#weather").style.display = "none";
            for(let u = 0; u < Headers.length; u++){
                Headers[u].style.display = "none";
            }
        }
    }
}


function initializeData() {
    let cityLocation = document.getElementById("city_name").value;
    let params = "q=" + cityLocation + "&appid=" + apiKey;
    fetch(weatherLink + params, {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
        .then(response => response.json())
        .then(loadWeatherInfo);
}



searchButton.addEventListener("click", () => 
{
    document.querySelector("#weather-section").style.display = "grid";
    initializeData();
})

