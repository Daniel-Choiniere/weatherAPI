// as soon as page loads this eventlistener fires
window.addEventListener("load", () => {
    let long;
    let lat;
    
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
                // log the data to the console behind the scenes
                console.log(data);
                const {temprature, summary} = data.currently;giut 
            });
        });
    }
});