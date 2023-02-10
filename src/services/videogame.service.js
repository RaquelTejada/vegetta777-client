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

    filteredVideogame(name) {
        return this.api.get(`/filteredVideogame?name=${name}`)
    }

    getOneVideogame(videogame_id) {
        return this.api.get(`/getOneVideogame/${videogame_id}`)
    }

    getAlphabeticOrder(dir) {
        return this.api.get(`/getVideogamesSorted?name=${dir}`)
    }

    getVotesOrder(dir) {
        return this.api.get(`/getVideogamesSorted?votes=${dir}`)
    }

    addVideogameVote(videogame_id) {
        return this.api.post(`/addVideogameVote/${videogame_id}`)
    }
}

const videogameService = new VideogameService()

export default videogameService