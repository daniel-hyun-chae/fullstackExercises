import axios from 'axios'

const baseUrl = "/api/persons"
const getAll = () => {
    return axios.get(baseUrl)
        .then(res => res.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(res => res.data)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)
}

const exportModule = { getAll, create, update, remove }

export default exportModule