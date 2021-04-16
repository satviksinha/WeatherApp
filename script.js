var temperature;
var tempDeg = document.querySelector('.degree');
var areaLocation = document.querySelector('.area-location');
var humidity = document.querySelector('.humidity');
var descrip = document.getElementById('weather-desc');
var windSpeed = document.querySelector('.speed');
var weatherIcon = document.getElementById('weather-icon');
var cityName = document.getElementById('city');
var form = document.getElementById('myform');
var input = document.getElementById('city');
var proxy;
console.log(weatherIcon);
console.log(tempDeg);
console.log(form);

window.addEventListener('load', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function success(pos) {
            console.log(pos);
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            console.log(latitude, longitude);

             proxy = 'http://cors-anywhere.herokuapp.com/';
            // proxy = 'https://thingproxy.freeboard.io/fetch/';
            const api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0a58d2ee648c39df86e275cd99e3610e`;

            fetch(api).then(function(response){
                return response.json();
            }).then(function(weath){
                console.log(weath);
                 temperature = weath.main.temp;
                tempDeg.innerHTML = temperature -273.15 + '&nbspC';
                areaLocation.innerHTML = weath.name;
                humidity.innerHTML = weath.main.humidity + '&nbsp%';
                windSpeed.innerHTML = weath.wind.speed +'&nbspkm/h';
                descrip.innerHTML = weath.weather[0].description;
                var iconcode = weath.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
                weatherIcon.src = iconURL;
            })
        });
    }
    form.addEventListener("submit",function(e){
        e.preventDefault();
        var newapi = `api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=0a58d2ee648c39df86e275cd99e3610e`;
        fetch(newapi).then(function(res){
            return res.json();
        }).then(function(data){
            console.log(data);
            temperature = data.main.temp;
                tempDeg.innerHTML = temperature -273.15 + '&nbspC';
                areaLocation.innerHTML = data.name;
                humidity.innerHTML = data.main.humidity + '&nbsp%';
                descrip.innerHTML = data.weather[0].description;
                var iconcode = data.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
                weatherIcon.src = iconURL;
        })
    })
});