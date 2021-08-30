$(document).ready(function(){
    //key 4JMyipUakmC7s7BuUj7FxmOzSoQDLRme
    //full url api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    var locationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search?'
    var startURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/10day/'
    var apiId = 'apikey=4JMyipUakmC7s7BuUj7FxmOzSoQDLRme'

    // console.log(startURL + 'Detroit'+ apiId)
    // fetch('https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=YcREa0xWOPvRaNXOWdvSuVNybl1HDLKK').then(function(response){
    //     console.log(response)
    //     response.json().then(function(data){
    //         console.log(data)
    //         //temp = data.main.temp
    //         //humid = data.main.humidity
    //         //wind = data.wind.speed
    //     })
    // })


    // "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=4JMyipUakmC7s7BuUj7FxmOzSoQDLRme&q=Detroit"
    $('#submitForm').on('submit', function(event){
        event.preventDefault();
        var location = $('.form-control').val()
        console.log(location)
        fetch(locationUrl + apiId + '&q=' + location
            ,{ mode: 'no-cors'}).then(function(response){
                console.log(response)
                response.json().then(function(data){
                console.log(data)
            })
        })
    })
})