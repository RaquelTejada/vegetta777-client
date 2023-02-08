import { createContext, useState } from "react"
import videogameService from '../services/videogame.service'


const VideogameContext = createContext()

function VideogameProviderWrapper(props) {

    const [videogames, setVideogames] = useState([])

    const resetVideogame = () => {
        setVideogames([])
    }

    const loadVideogames = (category, votes) => {
        videogameService
            .getfilteredVideogame(category, votes)
            .then((response) => {
                setVideogames(response.data)
            })
            .catch(err => console.log(err))
    }

    const getAllVideogames = () => {
        videogameService
            .getVideogames()
            .then((response) => {
                setVideogames(response.data)
            })
            .catch(err => console.log(err))
    }


    return (
        < VideogameContext.Provider value={{ videogames, loadVideogames, getAllVideogames }}>
            {props.children}
        </VideogameContext.Provider >

    )
}

export { VideogameContext, VideogameProviderWrapper }