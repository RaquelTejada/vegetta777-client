import { createContext, useState } from "react"
import videogameService from '../services/videogame.service'


const VideogameContext = createContext()

function VideogameProviderWrapper(props) {

    const [videogames, setVideogames] = useState([])

    const resetVideogame = () => {
        setVideogames([])
    }

    const loadVideogames = () => {
        videogameService
            .getAllVideogames()
            .then((response) => {
                setVideogames(response.data)
            })
            .catch(err => console.log(err))
    }

    const getAllVideogames = () => {
        videogameService
            .getAllVideogames()
            .then((response) => {
                setVideogames(response.data)
            })
            .catch(err => console.log(err))
    }


    return (
        < VideogameContext.Provider value={{ videogames, resetVideogame, loadVideogames, getAllVideogames }}>
            {props.children}
        </VideogameContext.Provider >

    )
}

export { VideogameContext, VideogameProviderWrapper }