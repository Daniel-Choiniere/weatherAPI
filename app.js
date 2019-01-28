// as soon as page loads this eventlistener fires
window.addEventListener("load", () => {
    // declare necessary global variables
    let long;
    let lat;
    // document.querySelector refers to an id on the html file
    let windSpeedSection = document.querySelector('.windspeed');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    
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
                console.log(data);
                const { windSpeed, temperature, summary, icon } = data.currently;
                
                // set DOM elements from the API, get the necessay object data from dev console on app
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone.replace(/_/g, " ");
                windSpeedSection.textContent = "Wind Speed: " + (windSpeed * 0.62137).toFixed(2) + " MPH";
                
                // Formula for celsius
                let celsius = (temperature -32) * (5 / 9);
                
                // trigger Set Icons function
                setIcons(icon, document.querySelector('.icon'));
                
                // Toggle temprature between celsius/farenheight
                temperatureSection.addEventListener('click', () =>{
                   if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent = "C";
                       temperatureDegree.textContent = celsius.toFixed(2);
                   }else{
                       temperatureSpan.textContent = "F";
                       temperatureDegree.textContent = temperature;
                   } 
                });
            });
        });
    }
    
    function setIcons(icon, iconID){
        // set skycon color
        const skycons = new Skycons({color: "white"});
        // replace the " - " character in the icon data received to a " _ " all (g for all occurunces)
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        // intiate animation
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});