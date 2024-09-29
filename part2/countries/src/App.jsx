import { useEffect, useState } from "react"
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>
      
    </div>
  )
}
const App = () => {

  const [value, setValue] = useState('bad')
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const filteredCountries = response.data.filter(country => 
        country.name.official.toLowerCase().includes(value.toLowerCase())
      )
      if (filteredCountries.length > 10) {
        setCountry('Too many matches, specify another filter')
      }
      else if (filteredCountries.length === 1) {
        setCountry('Just one country baby')
      }
      else {
        setCountry(filteredCountries.map(country => country.name.official))
      }
    })
  },[value])
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <h1>COUNTRIES</h1>
      <form>
        find countries<input value={value} onChange={handleChange}/>
      </form>
      <div>
        {JSON.stringify(country)}
        <Country country={country}/>
      </div>
    </div>
  )
}


export default App
