import axios from 'axios'

class VideogameService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/videogame`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllVideogames() {
        return this.api.get('/getAllVideogames')
    }

    editVideogame(videogame_id, body) {
        return this.api.put(`/edit/${videogame_id}`, body)
    }

    deleteVideogame(videogame_id) {
        return this.api.delete(`/delete/${videogame_id}`)
    }

    saveVideogame(videogameData) {
        return this.api.post('/saveVideogame', videogameData)
    }

    filteredVideogame(category, votes) {
        return this.api.get(`/filtered?category=${category}&votes=${votes}`)
    }
}

const videogameService = new VideogameService()

export default videogameService