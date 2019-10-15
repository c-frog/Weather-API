// SEARCH FUNTION TO DISPLAY IN MAIN DIV
$("#citySearch").on('click', function () {
    var city = $('#inputCity').val();
    // API URL FOR CURRENT WEATHER REPORT
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a67d42645251ab0dca0b8fa010f2fa15';
    // AJAX CALL FOR CURRENT WEATHER REPORT
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#cityName').text('City: ' + response.name);
        $('#cityTemp').text('Temperature: '+ ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + '°F');
        $('#cityHum').text('Humidity: '+ response.main.humidity+'%');
        $('#windSpeed').text('Wind Speed: '+ (response.wind.speed).toFixed(1) + ' mph');
    // AJAX CALL FOR UV INDEX 
        var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='+response.coord.lat+'&lon='+response.coord.lon+'&appid=a67d42645251ab0dca0b8fa010f2fa15';
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse)
            $('#uvIndex').text('UV Index: '+(uvResponse.value).toFixed(1))
        })
    })
    // AJAX CALL FOR 5-DAY FORECAST 
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=a67d42645251ab0dca0b8fa010f2fa15';
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (fcReponse) {
        console.log(fcReponse);
        
        var maxTemps1 = [fcReponse.list[0].main.temp,fcReponse.list[1].main.temp,fcReponse.list[2].main.temp,fcReponse.list[3].main.temp,fcReponse.list[4].main.temp,fcReponse.list[5].main.temp,fcReponse.list[6].main.temp]
        var maxTemps2 = [fcReponse.list[7].main.temp,fcReponse.list[8].main.temp,fcReponse.list[9].main.temp,fcReponse.list[10].main.temp,fcReponse.list[11].main.temp,fcReponse.list[12].main.temp,fcReponse.list[13].main.temp]
        var maxTemps3 = [fcReponse.list[15].main.temp,fcReponse.list[16].main.temp,fcReponse.list[17].main.temp,fcReponse.list[18].main.temp,fcReponse.list[19].main.temp,fcReponse.list[20].main.temp,fcReponse.list[21].main.temp]
        var maxTemps4 = [fcReponse.list[23].main.temp,fcReponse.list[24].main.temp,fcReponse.list[25].main.temp,fcReponse.list[26].main.temp,fcReponse.list[27].main.temp,fcReponse.list[28].main.temp,fcReponse.list[29].main.temp]
        var maxTemps5 = [fcReponse.list[31].main.temp,fcReponse.list[32].main.temp,fcReponse.list[33].main.temp,fcReponse.list[34].main.temp,fcReponse.list[35].main.temp,fcReponse.list[36].main.temp,fcReponse.list[37].main.temp]
        
        var maxTemp1 = 0;
            for (let i = 0; i < maxTemps1.length; i++) {
                if(maxTemp1<maxTemps1[i]) {
                    maxTemp1 = maxTemps1[i];
                }}
        $("#temp1").text('Temp: '+((maxTemp1 -273.15) *1.80 +32).toFixed(0)+'°F')
        
        var maxTemp2 = 0
                for (let i = 0; i < maxTemps2.length; i++) {
                    if (maxTemp2<maxTemps2[i]) {   
                        maxTemp2 = maxTemps2[i];
                        console.log(maxTemp2);
                    }}
        $("#temp2").text('Temp: '+((maxTemp2 -273.15) *1.80 +32).toFixed(0)+'°F')

        var maxTemp3 = 0
        for (let i = 0; i < maxTemps3.length; i++) {
            if (maxTemp3<maxTemps3[i]) {   
                maxTemp3 = maxTemps3[i];
            }}
        $("#temp3").text('Temp: '+((maxTemp3 -273.15) *1.80 +32).toFixed(0)+'°F')

        var maxTemp4 = 0
        for (let i = 0; i < maxTemps4.length; i++) {
            if (maxTemp4<maxTemps4[i]) {   
                maxTemp4 = maxTemps4[i];
            }}
        $("#temp4").text('Temp: '+((maxTemp4 -273.15) *1.80 +32).toFixed(0)+'°F')

        var maxTemp5 = 0
        for (let i = 0; i < maxTemps5.length; i++) {
            if (maxTemp5<maxTemps5[i]) {   
                maxTemp5 = maxTemps5[i];
            }}
        $("#temp5").text('Temp: '+((maxTemp5 -273.15) *1.80 +32).toFixed(0)+'°F')


    })
})
