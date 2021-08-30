$(document).ready(function(){
    //full url https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
    //myID eba6d54703d207f3af8bc307df016cab
    var startURL = 'https://api.openweathermap.org/data/2.5/onecall?'
    var apiId = '&appid=eba6d54703d207f3af8bc307df016cab'
    var cities
    var location

    fetch('./assets/json/cities.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        cities = data
    })

    function findLat(obj){
        return obj.name === location
    }

    function displayWeather(info){
        console.log(info)
        $('#temp').text('Current Temp: ' + info.current.temp)
        $('#wind').text('Wind Speed: ' + info.current.wind_speed)
        $('#humid').text('Humidity: ' + info.current.humidity)
        $('#uv').text('UV Index: ' + info.current.uvi)

        console.log($('.forecastCards'))
        $('.forecastCards').children.forEach(element => {
            console.log("Bruh")
        });
    }

    function getFetch(){
        if (location != ''){
            var locationObj = cities.find(findLat)
            if (locationObj != null){
                fetch(startURL + 'lat=' + locationObj.lat + '&lon=' + locationObj.lng + apiId)
                    .then(function(response){
                        response.json().then(function(data){
                        displayWeather(data)
                    })
                })
            } 
            else{
                //put error message
            }
        }   
    }

    $('#submitForm').on('submit', function(event){
        event.preventDefault();
        location = $('.form-control').val()
        getFetch()
    })
})