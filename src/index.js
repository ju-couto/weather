const input = document.querySelector('input'),
    button = document.querySelector('button'),
    result = document.querySelector('#weather'),
    city = result.querySelector('#city'),
    temp = result.querySelector('#temp-value'),
    conditions = result.querySelector('#conditions'),
    weatherIcon = result.querySelector('#weather-icon'),
    flag = result.querySelector('#country'),
    humidity = result.querySelector('#humidity span'),
    wind = result.querySelector('#wind span'),
    error = document.querySelector('#error'),
    apiKey = '06e17fa7454dd6abc133d6d160ed293b'
    

    const getWeatherData = async (cityInput) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        return data
    }
 
  const  showWeather = async (cityInput) => {
    try{
        const data = await getWeatherData(cityInput)   
        city.innerHTML = data.name
        country.src =`https://countryflagsapi.com/svg/${data.sys.country}`
        temp.innerHTML = (data.main.temp).toFixed(1)
        conditions.innerHTML = data.weather[0].description
        humidity.innerHTML = `${data.main.humidity} %`
        wind.innerHTML = `${Math.trunc(data.wind.speed *3.6)} km/h`
        weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        result.classList.remove('hidden')
        input.value = ''
    } catch (err) {
        error.innerHTML = 'This city does not exist'
        error.classList.remove('hidden')
        result.classList.add('hidden')
        setTimeout(() => error.classList.add('hidden'), 3000)
    }
  
    }
button.addEventListener('click', () => showWeather(input.value))
input.addEventListener('keyup', (e) => e.key === 'Enter' ? showWeather(input.value) : null)