import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ filteredCountries }) => {
    const country = filteredCountries[0]
    const [weather, setWeather] = useState({
        current: {
            temperature: '',
            weather_icons: '',
            wind_speed: '',
            wind_dir: ''
        }
    })

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}=${country.name}`)
            .then((res) => {
                setWeather(res.data)
            })
    }, [])
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="100px" height="100px" />
            <h2>Weather in {country.name}</h2>
            <p>temperature: {weather.current.temperature}</p>
            <img src={weather.current.weather_icons} />
            <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default CountryDetail