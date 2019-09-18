import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createPerson = (obj) => {
    return axios.post(baseUrl,obj)
}

const updatePerson = (obj,id) => {
    const url = baseUrl+'/'+id
    return axios.put(url,obj)
}

const personDelete = (id) => {
    const url = baseUrl+'/'+id
    return axios.delete(url)
}

export default { getAll, createPerson, personDelete, updatePerson }