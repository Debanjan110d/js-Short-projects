document.addEventListener('DOMContentLoaded', ()=> {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo =document.getElementById('weather-info')
    const cityName =document.getElementById('city-name')
    const temperature =document.getElementById('temperature')
    const description =document.getElementById('description')
    const errorMessage =document.getElementById('error-message')

    const api_key = '3b2260d054781647a8d82cbf714d93ca'//store it in environment variable for security

    getWeatherBtn.addEventListener('click',async()=>{
        const city =cityInput.value.trim()
        if(!city)return

        //It may throw and error
        //server/database is always in another continent
        try{
            const weatherData =await fetchWeatherData(city)
            displayWeatherData(weatherData)
        }catch(error){
            displayErrorMessage()
        }

    })

    async function fetchWeatherData(city){
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error('City not found')
        }
        const data = await response.json()
        return data 
    }
    function displayWeatherData(weatherData){
        //display the data
        const {name,main,weather}=weatherData
        cityName.textContent=name
        temperature.textContent=`${main.temp-273.15} C`
        description.textContent=weather[0].description
        //Unlock the display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
       
    }
    function displayErrorMessage(){
        //display the error message
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})
