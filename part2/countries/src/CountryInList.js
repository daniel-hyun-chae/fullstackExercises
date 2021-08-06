import React from 'react'

const CountryInList = ({ country, setFilter }) => {
    const showCountryDetail = () => {
        setFilter(country.name)
    }

    return (
        <div>
            {country.name}
            <button onClick={showCountryDetail}>show</button>
        </div>
    )
}

export default CountryInList