import { useEffect, useState } from "react"
import axios from 'axios'

const Country = ({country,handleShow}) => {
  if (country.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (country.length > 1) {
    const msg = 'show'
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
        
      </div>
      
    )
  }
  else{
    return null
  }
}


const App = () => {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState([])
  const [status, setStatus] = useState("")

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
        <Country country={country} handleShow={handleShow}/>
      </div>
    </div>
  )
}


export default App
