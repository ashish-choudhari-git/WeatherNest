'se strict';

const api_key = "099344ea2dbed236300c4b12ee35236f";
// const URL ="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"

export const fetchData = function(URL,callback){
    fetch(`${URL}&apiid=${api_key}`)
        .then(res=>res.json()).then(data=>callback(data)
    );
}

export const url = {
    currentWeather(lat,lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}`
    },
    forecast(lat,lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}`
    },
    airPollution(lat,lon){
        return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    reverseGeo(lat,lon){
        return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
    geo(query){
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    }
}