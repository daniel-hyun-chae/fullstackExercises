import {useState, useEffect} from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        if (name !== ""){
            axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
                .then((response) => {
                    setCountry(response)
            })
        }
    }, [name])
  
    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }