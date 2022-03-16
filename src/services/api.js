import axios from 'axios'

const Api = axios.create({baseURL: 'http://localhost:4000'})

let data = {
    data:{}
}
const apiService = {
    start: (params) => Api.post('/game', params)
        .then(response => { 
            data.data=response.data
        })
}

export { data }
export default apiService