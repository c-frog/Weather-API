// SEARCH FUNTION TO DISPLAY IN MAIN DIV
$("#citySearch").on('click', function () {
    var city = $('#inputCity').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a67d42645251ab0dca0b8fa010f2fa15';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#cityName').text('City: ' + response.name);
        $('#cityTemp').text('Temperature: '+ ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + '°F');
        $('#cityHum').text('Humidity: '+ response.main.humidity+'%');
        $('#windSpeed').text('Wind Speed: '+ (response.wind.speed).toFixed(1) + ' mph');
        
        var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='+response.coord.lat+'&lon='+response.coord.lon+'&appid=a67d42645251ab0dca0b8fa010f2fa15';
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse)
            $('#uvIndex').text('UV Index: '+(uvResponse.value).toFixed(1))
        })
    })
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=a67d42645251ab0dca0b8fa010f2fa15';
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (fcReponse) {
        var maxTemps1 = [fcReponse.list[0].main.temp,fcReponse.list[1].main.temp,fcReponse.list[2].main.temp,fcReponse.list[3].main.temp,fcReponse.list[4].main.temp,fcReponse.list[5].main.temp,fcReponse.list[6].main.temp]
        var maxTemp = 0;
        for (let i = 0; i < maxTemps1.length; i++) {
            if(maxTemp<maxTemps1[i]) {
                maxTemp = maxTemps1[i];
            }}
        $("#temp1").text('Temp: '+((maxTemp -273.15) *1.80 +32).toFixed(0)+'°F')
    })
})
