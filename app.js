// as soon as page loads this eventlistener fires
window.addEventListener("load", () => {
    // declare necessary global variables
    let long;
    let lat;
    // document.querySelector refers to an id on the html file
    let temperatureDescription = document.querySelector('.temprature-description');
    let temperatureDegree = document.querySelector('.temprature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    
    // uses built in navigator.geolocation method to get users current longtitude and latitude
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            
            // saves the users long and lat into variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // use a proxy to route through to bypass CORS issue with darkSky API
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/15882ae30429d0f0d653f9f3bfb1fb7f/${lat},${long}`;
            
            // retrieve (fetch) the data from the darkSky API response
        fetch(api)
            .then(response => {
                // return the data in JSON format
                return response.json();
            })
            .then(data => {
                // set DOM elements from the API, get the necessay object data from dev console on app
                temperatureDegree.textContent = data.currently.temperature;
                temperatureDescription.textContent = data.currently.summary;
                locationTimezone.textContent = data.timezone; 
            });
        });
    }
});