document.addEventListener('DOMContentLoaded', ()=> {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo =document.getElementById('weather-info')
    const cityName =document.getElementById('city-name')
    const temperature =document.getElementById('temperature')
    const description =document.getElementById('description')
    const errorMessage =document.getElementById('error-message')

    const api_key = 'e5c7b9b7e8c4d3d2e3d2e3d2e3d2e3d2'//store it iin environment variable for security

    getWeatherBtn.addEventListener('click',async()=>{
        const city =cityInput.value.trim()
        if(!city)return

        //It may throw and error
        //server/database is always in another continent

        try{
            const weatherData =await fetchWeatherData(city)
        }catch(error){
            displayErrorMessage()
        }

    })

    async function fetchWeatherData(city){

    }
    function displayWeatherData(weatherData){
        //display the data
    }
    function displayErrorMessage(){
        //display the error message
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})