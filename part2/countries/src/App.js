import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountryInDetail from './CountryInDetail'
import CountryInList from './CountryInList'

const App = () => {

  const [newFilter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data)
    })
  }, [])

  const filteredCountries = countries.length === 0 ? [] : countries.filter((country) => {
    return country.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  let countriesToRender;
  if (filteredCountries.length > 10) {
    countriesToRender = <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length === 1) {
    countriesToRender = <CountryInDetail filteredCountries={filteredCountries} />
  } else {
    countriesToRender = filteredCountries.map(country => <CountryInList key={country.alpha3Code} country={country} setFilter={setFilter} />)
  }

  return (
    <div>
      <div>
        find countries <input value={newFilter} onChange={onFilterChange} />
      </div>
      {countriesToRender}
    </div>
  )
}

export default App;
