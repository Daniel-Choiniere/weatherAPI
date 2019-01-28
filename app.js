// as soon as page loads this eventlistener fires
window.addEventListener("load", () => {
    let long;
    let lat;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
            // const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=7efc20ad68027c60035208cabfd5ea02`;
            const api = `${proxy}https://api.darksky.net/forecast/15882ae30429d0f0d653f9f3bfb1fb7f/${lat},${long}`;
            
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            });
        });
    }
});