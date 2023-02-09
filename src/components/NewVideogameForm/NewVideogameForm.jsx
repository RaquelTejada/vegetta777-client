import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import videogameService from "../../services/videogame.service"
import './NewVideogameForm.css'
import { VideogameContext } from "../../contexts/videogame.context"

const NewVideogameForm = ({ fireFinalActions }) => {

    const { loadVideogames } = useContext(VideogameContext)

    const [videogameData, setVideogameData] = useState({
        image: '',
        name: '',
        category: ''
    })

    const { image, name, category } = videogameData

    const handleInputChange = e => {
        const { name, value } = e.target
        setVideogameData({ ...videogameData, [name]: value })
    }

    const [errors, setErrors] = useState([])

    const handleFormSubmit = e => {
        e.preventDefault()

        videogameService
            .saveVideogame({ ...videogameData, image })
            .then(() => {
                fireFinalActions();
                loadVideogames()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    // const [loadingImage, setLoadingImage] = useState(false)


    return (
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" />
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

            <div className="d-grid">
                <Button className="create-button" type="submit">{'Create Videogame'}</Button>
            </div>

        </Form >
    )
}

export default NewVideogameForm