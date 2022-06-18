import axios from 'axios'

async function fetchData(dataSource) {
    try {
        const response = await axios.get(dataSource)
        return { data: response.data, error: ''}
    } catch(error) {
        return { data: [], error: error.message }
    }
}

async function postData(dataSource, content) {
    try {
        const response = await axios.post(dataSource, content)
        return { data: response.data, error: ''}
    } catch(error) {
        return { data: [], error: error.message }
    }
}

const API = { fetchData, postData }
export default API