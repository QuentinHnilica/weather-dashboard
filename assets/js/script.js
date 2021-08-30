$(document).ready(function(){
    //full url https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
    //myID eba6d54703d207f3af8bc307df016cab
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    var startURL = 'https://api.openweathermap.org/data/2.5/onecall?'
    var apiId = '&appid=eba6d54703d207f3af8bc307df016cab'
    var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    var location

    function displayWeather(info){
        console.log(info)
        $('#temp').text('Current Temp: ' + info.current.temp)
        $('#wind').text('Wind Speed: ' + info.current.wind_speed)
        $('#humid').text('Humidity: ' + info.current.humidity)
        $('#uv').text('UV Index: ' + info.current.uvi)

        console.log($('.forecastCards'))
        $('.forecastCards').children().each(function(i) {
            console.log($(this))
            for(var i = 0; i < $(this).children().length; i++){
                console.log('yessir')
            }
        });
    }

    function getFetch(){
        if (location != ''){
            fetch(cityUrl + location + apiId).then(function(response){
                response.json().then(function(data){
                    locationObj = data.coord
                    if (locationObj != null){
                        fetch(startURL + 'lat=' + locationObj.lat + '&lon=' + locationObj.lon + apiId)
                            .then(function(response){
                                if (response.status === 404){
                                    console.log('404Moment')
                                }
                                else{
                                    response.json().then(function(data){
                                        displayWeather(data)
                                    })
                                }
                                
                            })
                    } 
                    else{
                        //put error message
                    }
                })
            })  
        }   
    }

    $('#submitForm').on('submit', function(event){
        event.preventDefault();
        location = $('.form-control').val()
        getFetch()
    })
})