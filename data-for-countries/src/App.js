import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchText,setSearchText] = useState('')
  const [msg,setMessage] = useState('')
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState({})
  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    if(searchText){
      const url = "https://restcountries.eu/rest/v2/name/"+searchText
      axios.get(url)
        .then(response => {
          if(response.data.length > 10){
            setCountries([])
            setCountry({})
            setMessage("Too many matches, specify another filter")
          }
          else if(response.data.length > 1 && response.data.length < 10){
              const newArr = response.data.map(country => country.name)
              setMessage('')
              setCountry({})
              setCountries(newArr)
          }
          else if(response.data.length === 1){
              const newObj = response.data[0]
              setMessage('')
              setCountries([])
              setCountry(newObj)
          }
              
          })
        .catch(error => {console.log(error)})
    }
    else{
      setMessage('')
      setCountries([])
      setCountry({})
    }
    
  },[searchText])

  const showView = (ctry) => {
    const url = "https://restcountries.eu/rest/v2/name/"+ctry
      axios.get(url)
        .then(response => {
          const newObj = response.data[0]
          setCountry(newObj)          
        })
        .catch(error => {
          console.log(error)
        })
  }

  return(
    <div>
      <div> find countries <input type="text" value={searchText} onChange={handleSearchChange}/></div>
      {!countries.length ? 
        <p>{msg}</p> : 
        countries.map(country => <div key={country}><p>{country} <button onClick={() => showView(country)}>show</button></p></div>)
      }
      {
        Object.keys(country).length !==0 && 
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>Languages</h2>
          <ul>
              {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={country.flag} alt="" width="200" height="200"></img>
        </div>
      }
    </div>
  )
}

export default App