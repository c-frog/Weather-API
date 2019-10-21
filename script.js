var searchHistory = JSON.parse(localStorage.getItem("searches")) || [];
var date = new Date();


// SEARCH HISTORY LIST
function history () {
    $('#searchHistory').text("");
    searchHistory.length = 8;
    for (let i = 0; i < searchHistory.length; i++) {
        var search = searchHistory[i];
        if (search === undefined || search === null) {
            $('#searchHistory').append("");
        } else {
            $('#searchHistory').append("<li id='searches'>" + search + "</li>")    
        }
    }
    $('.searches').css("border", ".1px solid lightgrey")
}
history()
// SEARCH FUNCTION TO DISPLAY CURRENT WEATHER AND FORECASTS
function render() {
    if ($('#inputCity').val() !== "" ){
        var city = $('#inputCity').val();
    } else {
        var city = searchHistory[0];
    }
    searchHistory.unshift(city);
    localStorage.setItem("searches", JSON.stringify(searchHistory));
    history()
    
    // API URL FOR CURRENT WEATHER REPORT
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a67d42645251ab0dca0b8fa010f2fa15';
    // AJAX CALL FOR CURRENT WEATHER REPORT
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#cityName').text(response.name+" "+(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()));
        $('#cityTemp').text('Temperature: '+ ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + '°F');
        $('#cityHum').text('Humidity: '+ response.main.humidity+'%');
        $('#windSpeed').text('Wind Speed: '+ (response.wind.speed).toFixed(1) + ' mph');
        // AJAX CALL FOR UV INDEX 
        var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='+response.coord.lat+'&lon='+response.coord.lon+'&appid=a67d42645251ab0dca0b8fa010f2fa15';
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvResponse) {
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
        var arr = fcReponse.list
        
        var maxTemps1 = [arr[0].main.temp, arr[1].main.temp, arr[2].main.temp, arr[3].main.temp, arr[4].main.temp, arr[5].main.temp, arr[6].main.temp, arr[7].main.temp]
        var maxTemps2 = [arr[8].main.temp, arr[9].main.temp, arr[10].main.temp, arr[11].main.temp, arr[12].main.temp, arr[13].main.temp, arr[14].main.temp, arr[15].main.temp]
        var maxTemps3 = [arr[16].main.temp, arr[17].main.temp, arr[18].main.temp, arr[19].main.temp, arr[20].main.temp, arr[21].main.temp, arr[22].main.temp, arr[23].main.temp]
        var maxTemps4 = [arr[24].main.temp, arr[25].main.temp, arr[26].main.temp, arr[27].main.temp, arr[28].main.temp, arr[29].main.temp, arr[30].main.temp, arr[31].main.temp]
        var maxTemps5 = [arr[32].main.temp, arr[33].main.temp, arr[34].main.temp, arr[35].main.temp, arr[36].main.temp, arr[37].main.temp, arr[38].main.temp, arr[39].main.temp]
        
        
        var rh1 = [arr[0].main.humidity, arr[1].main.humidity, arr[2].main.humidity, arr[3].main.humidity, arr[4].main.humidity, arr[5].main.humidity, arr[6].main.humidity, arr[7].main.humidity]
        var rh2 = [arr[8].main.humidity, arr[9].main.humidity, arr[10].main.humidity, arr[11].main.humidity, arr[12].main.humidity, arr[13].main.humidity, arr[14].main.humidity, arr[15].main.humidity]
        var rh3 = [arr[16].main.humidity, arr[17].main.humidity, arr[18].main.humidity, arr[19].main.humidity, arr[20].main.humidity, arr[21].main.humidity, arr[22].main.humidity, arr[23].main.humidity]
        var rh4 = [arr[24].main.humidity, arr[25].main.humidity, arr[26].main.humidity, arr[27].main.humidity, arr[28].main.humidity, arr[29].main.humidity, arr[30].main.humidity, arr[31].main.humidity]
        var rh5 = [arr[32].main.humidity, arr[33].main.humidity, arr[34].main.humidity, arr[35].main.humidity, arr[36].main.humidity, arr[37].main.humidity, arr[38].main.humidity, arr[39].main.humidity]
        
        function temperatures(id, temps) {
            for (let i = 0; i < temps.length; i++) {
                var temp = 0;
                if (temp < temps[i]) {
                    temp = temps[i];
                    $(id).text('Temp: '+((temp -273.15) *1.80 +32).toFixed(0)+'°F')
                }
            }
        }
        temperatures('#temp1', maxTemps1);
        temperatures('#temp2', maxTemps2);
        temperatures('#temp3', maxTemps3);
        temperatures('#temp4', maxTemps4);
        temperatures('#temp5', maxTemps5);
        
        function relativeHumidity (id, currentRH) {
            let sum = 0
            for (let i = 0; i < currentRH.length; i++) {
                sum += currentRH[i];
                averageRH = sum/currentRH.length;
                $(id).text('Humidity: '+averageRH.toFixed(0)+'%');
            }   
        }
        relativeHumidity('#avgRH1', rh1);
        relativeHumidity('#avgRH2', rh2);
        relativeHumidity('#avgRH3', rh3);
        relativeHumidity('#avgRH4', rh4);
        relativeHumidity('#avgRH5', rh5);
        
        
        $("#day1").text((date.getMonth()+1)+"/"+(date.getDate()+1));
        $("#day2").text((date.getMonth()+1)+"/"+(date.getDate()+2));
        $("#day3").text((date.getMonth()+1)+"/"+(date.getDate()+3));
        $("#day4").text((date.getMonth()+1)+"/"+(date.getDate()+4));
        $("#day5").text((date.getMonth()+1)+"/"+(date.getDate()+5));
        
        var iconCode1 = arr[5].weather[0].icon;
        var iconCode2 = arr[13].weather[0].icon;
        var iconCode3 = arr[21].weather[0].icon;
        var iconCode4 = arr[29].weather[0].icon;
        var iconCode5 = arr[37].weather[0].icon;
        
        
        function icons(id, noonIcon) {
            $(id).html("<img src=https://openweathermap.org/img/w/" + noonIcon + ".png>")
        }
        icons('#icon1', iconCode1);
        icons('#icon2', iconCode2);
        icons('#icon3', iconCode3);
        icons('#icon4', iconCode4);
        icons('#icon5', iconCode5);
        console.log(iconCode1)
    })
    
}

$("#citySearch").click(render);
$(document).ready(render())