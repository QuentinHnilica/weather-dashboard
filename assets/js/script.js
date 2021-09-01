$(document).ready(function(){
    var startURL = 'https://api.openweathermap.org/data/2.5/onecall?'
    var apiId = '&appid=eba6d54703d207f3af8bc307df016cab'
    var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    var iconUrl = 'http://openweathermap.org/img/wn/'
    var location = 'San Diego' //So that default page is SanDiego
    var date = new Date()
    var today = date.toDateString()
    var tomorrow

    function cardInfo(card, info, nextDay) { //displays all the weather properties
        tomorrow = new Date(new Date().setDate(date.getDate() + nextDay))

        card.children()[0].innerText = tomorrow.toDateString()
        card.children()[1].setAttribute('src', iconUrl + info.weather[0].icon + '.png')
        card.children()[1].setAttribute('width', '50')
        card.children()[2].innerText = 'Temp: ' + info.temp.day
        card.children()[3].innerText = 'Wind: ' + info.wind_speed
        card.children()[4].innerText = 'Humidity: ' + info.humidity
    }

    function displayWeather(info){ // big box current weather data
        $('.area').text(location + ' : ' + today)
        $('.area').append(document.createElement('img'))
        $('.area').children().attr('src', iconUrl + info.current.weather[0].icon + '.png')
        $('#temp').text('Current Temp: ' + info.current.temp)
        $('#wind').text('Wind Speed: ' + info.current.wind_speed)
        $('#humid').text('Humidity: ' + info.current.humidity)
        $('#uv').text('UV Index: ' + info.current.uvi)

        $('.forecastCards').children().each(function(i) { // 5 day forcast cards
            switch(i){
                case 0:{
                    cardInfo($(this), info.daily[i], i+1)
                    return
                }
                case 1:{
                    cardInfo($(this), info.daily[i], i+1)
                    return
                }
                case 2:{
                    cardInfo($(this), info.daily[i], i+1)
                    return
                }
                case 3:{
                    cardInfo($(this), info.daily[i], i+1)
                    return
                }
                case 4:{
                    cardInfo($(this), info.daily[i], i+1)
                    return
                }
            }
        });
    }

    function getFetch(){  
        if (location != ''){
            fetch(cityUrl + location + apiId).then(function(response){ //fetch to get lat and lon
                if (response.status === 404){
                    $('#searchCity').val('')
                    $('#searchCity').attr('placeholder', 'Input A Different City') //In case they input a city you can't fetch
                }
                else{
                    response.json().then(function(data){
                        locationObj = data.coord
                        if (locationObj != null){
                            fetch(startURL + 'lat=' + locationObj.lat + '&lon=' + locationObj.lon + apiId) //fetch for the weather data
                                .then(function(response){
                                    response.json().then(function(data){
                                        displayWeather(data)
                                    })
                                })
                        } 
                        else{
                            $('#searchCity').attr('placeholder', 'Input A Different City')
                        }
                    })
                }
                
            }).catch(function(error){
                console.log(error)
            })  
        }   
    }

    $('#submitForm').on('submit', function(event){ //Gets location from your input
        event.preventDefault();
        location = $('#searchCity').val()
        getFetch()
    })

    $('.buttonBox .formButton').on('click', function(event){ //Side Buttons For auto Search
        location = $(this)[0].innerText
        getFetch()
    })
    getFetch() //Sets default page to San Diego 
})