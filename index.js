//Select Input Element
const input = document.querySelector(".weather-input")

//Create a function to fetch data from weather API
const fetchData = async(searchTerm) => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: searchTerm,
            appid: '1c79502fa7c62548b048c849251f6294',
            units: 'metric'
        }
    })

    if (!response.data) {
        throw new Error
    }
    console.log(response.data)
    renderCard(response.data)
        //We want to send .name as the h1, weather[0], main.temp
}


const renderCard = (data) => {
        const card = document.querySelector(".card")
        return card.innerHTML = `
    <div class="card bounce">
    <div class="card-content">
      <h1>${data.name}</h1>
      <img class = "icons" src = "https://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>
      <h2>${data.weather[0].description}</h2>
      <h1>${data.main.temp}&#176 C</h1>

    </div>
  </div>
    `
    }
    // renderCard()
    //Debounce this input so it doesn't send every character as a search term to the API
let timeoutId;
const searchInput = (event) => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value)
    }, 1000)
}

//Create event listener on the input and pass the value to fetch data
input.addEventListener('input', searchInput)