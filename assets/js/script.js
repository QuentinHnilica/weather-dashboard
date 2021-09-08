$(document).ready(function(){
    var startURL = 'https://api.openweathermap.org/data/2.5/onecall?'
    var apiId = '&appid=eba6d54703d207f3af8bc307df016cab'
    var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    var iconUrl = 'http://openweathermap.org/img/wn/'
    var location = 'San Diego' //So that default page is SanDiego
    var date = new Date()
    var today = date.toDateString()
    var tomorrow
    var recentSearch = []

    function KToF(kalvin) //api default is in kalvin, so this converts temp to farenhieght
    {
        var kToFahr = (kalvin-273.15) * 1.8 + 32
        var newTemp = kToFahr.toFixed(2)
        return newTemp
    }

    function cardInfo(card, info, nextDay) { //displays all the weather properties
        tomorrow = new Date(new Date().setDate(date.getDate() + nextDay))
        var convertTemp = KToF(info.temp.day)
        card.children()[0].innerText = tomorrow.toDateString()
        card.children()[1].setAttribute('src', iconUrl + info.weather[0].icon + '.png')
        card.children()[1].setAttribute('width', '50')
        card.children()[2].innerText = 'Temp: ' + convertTemp + " ℉"
        card.children()[3].innerText = 'Wind: ' + info.wind_speed
        card.children()[4].innerText = 'Humidity: ' + info.humidity
    }

    

    function displayWeather(info){ // big box current weather data
        var realTemp = KToF(info.current.temp)
        $('.area').text(location + ' : ' + today)
        $('.area').append(document.createElement('img'))
        $('.area').children().attr('src', iconUrl + info.current.weather[0].icon + '.png')
        $('#temp').text('Current Temp: ' + realTemp + "	℉")
        $('#wind').text('Wind Speed: ' + info.current.wind_speed)
        $('#humid').text('Humidity: ' + info.current.humidity)
        $('#uv').text('UV Index: ' + info.current.uvi)

        $('.forecastCards').children().each(function(i) { // 5 day forcast cards
            switch(i){ //switch statement for which day
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
    function displayHistory(){ //displays text on button from recent searches
        for (var i = 0; i < recentSearch.length; i++){
            if (i > 6){
                recentSearch[i] = null
                break;
            }
            $('#' + i)[0].innerText = recentSearch[i]         
        }
    }

    function addToLocal(theLocation){ //adds search to local storage
        for (var i = 0; i < 7; i++){
            if (localStorage.getItem(i) === null){
                localStorage.setItem(i, theLocation)
                return
            }
        }
    }

    $('#submitForm').on('submit', function(event){ //Gets location from your input
        event.preventDefault();
        location = $('#searchCity').val()
        recentSearch.unshift(location)
        addToLocal(location)
        displayHistory()
        getFetch()
    })

    $('.buttonBox .formButton').on('click', function(event){ //Side Buttons For auto Search
        location = $(this)[0].innerText
        getFetch()
    })
    function getData(){
        for (var i = 0; i < 7; i++){ //we only want 6 searches
            if (localStorage.getItem(i) !== null){
                recentSearch.unshift(localStorage.getItem(i))
            }
            else{
                break 
            }
        }
        displayHistory()
    }
    getData() //local storage
    getFetch() //Sets default page to San Diego 
})