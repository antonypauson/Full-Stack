import { useEffect, useState } from "react"
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const url =  `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const Country = ({country,handleShow,weather}) => {
  if (country.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (country.length > 1) {
    return (
      <ul>
        {country.map(n => 
          <li>{n.name.common}<button onClick={() => handleShow(n.name.common)}>{'show'}</button>
          </li>
          
        )}
      </ul>
    )
  }
  else if (country.length === 1){
    //country length is 1
    const selectedCountry = country[0]
    return (
      <div>
        <h2>{selectedCountry.name.official}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Continent: {selectedCountry.continents[0]}</p>
        Languages:
        <ul>
        {Object.values(selectedCountry.languages).map((l,i) => 
          <li key={i}>{l}</li>
        )}
        </ul>
        {selectedCountry.flag}
        <h4>Weather in {selectedCountry.capital}</h4>
        {weather ? (
          <>
          <p>temperature: {weather.temp} Celsius</p>
          <img src={weather.icon}/>
          <p>wind: {weather.wind}m/s</p>
          </>
        ) : (
          <p>Loading weather info</p>
        )}
        
      </div>
      
    )
  }
  else {
    return null
  }
}


const App = () => {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState([])
  const [status, setStatus] = useState("")
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (value) {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const filteredCountries = response.data.filter(country => 
        country.name.official.toLowerCase().includes(value.toLowerCase())
      )
      setCountry(filteredCountries)
      setStatus("")
    })
    }
    else {
      setCountry([])
      setStatus("")
    }
  },[value])

  useEffect (() => {
    if (country.length === 1) {
      const selectedCountry = country[0]
      const countryUrl = `${url}&q=${selectedCountry.capital}`
    axios
    .get(countryUrl)
    .then(response => {
      console.log(response.data.main.temp,'temperature')
      console.log(response.data.wind.speed,'wind')
      console.log(response.data.weather[0].icon, 'icon')
      console.log(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      const imgObject = {
        temp: (response.data.main.temp - 273.15),
        wind: response.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      }
      setWeather(imgObject)
    })
    } 
  },[country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleShow = (name) => {
    const selectedCountry = country.find((c => c.name.common === name))
    if (selectedCountry) {
      setCountry([selectedCountry])
    }
  }
  return (
    <div>
      <h1>COUNTRIES</h1>
      <form>
        find countries<input value={value} onChange={handleChange}/>
      </form>
      {status}
      <div>
        {/* {JSON.stringify(country)} */}
        <Country country={country} handleShow={handleShow} weather={weather}/>
      </div>
    </div>
  )
}


export default App
