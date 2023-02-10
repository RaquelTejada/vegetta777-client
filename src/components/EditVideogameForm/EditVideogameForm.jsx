import { useState, useEffect, useContext } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import videogameService from "../../services/videogame.service"
import { VideogameContext } from "../../contexts/videogame.context"


const EditVideogameForm = ({ videogame_id, closeModal }) => {

    const [videogameData, setVideogameData] = useState({})

    const { loadVideogames } = useContext(VideogameContext)

    useEffect(() => {
        videogameService
            .getOneVideogame(videogame_id)
            .then(({ data }) => setVideogameData(data))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setVideogameData({ ...videogameData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        videogameService
            .editVideogame(videogame_id, videogameData)
            .then(() => {
                navigate('/createVideogame')
                loadVideogames()
                closeModal()
            })
            .catch(err => console.error(err))
    }



    const { image, name, category } = videogameData

    return (
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Image</Form.Label>
                <Form.Control type="rul" value={image} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Category</Form.Label>
                <Form.Select className="mb-3" aria-label="category" value={category} onChange={handleInputChange} name="category">
                    <option>Choose a category</option>
                    <option>Fight</option>
                    <option>Arcade</option>
                    <option>Rol</option>
                    <option>Adventure</option>
                    <option>Simulation</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-center">
                <button className="create-button" type="submit">{'Edit Videogame'}</button>
            </div>

        </Form>
    )
}

export default EditVideogameForm