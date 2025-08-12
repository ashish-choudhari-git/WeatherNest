'use strict';

import {updateWeather, error404} from "./app.js";
const defaultLocation = "#/weather?lat=21.1458&lon=79.0882"; /*Nagpur */

const currentLocation = function(){
    window.navigator.geolocation.getCurrentPosition(res => {
        const {latitude, longitude} = res.coords;
        updateWeather(latitude, longitude);
    }, err =>{
        window.location.hash=defaultLocation;
    });
}

const searchedLocation = query => {
    const params = new URLSearchParams(query);
    const lat = parseFloat(params.get("lat"));
    const lon = parseFloat(params.get("lon"));
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
        updateWeather(lat, lon);
    } else {
        window.location.hash = defaultLocation;
    }
};

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function (){
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes("?") ? requestURL.split("?") : [requestURL]

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function(){
    if(!window.location.hash){
        window.location.hash = "#/current-location";
    }
    else{
        checkHash();
    }
});