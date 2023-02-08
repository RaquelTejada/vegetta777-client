import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import videogameService from "../../services/videogame.service"
import './NewVideogameForm.css'


import { useNavigate } from 'react-router-dom'

const NewVideogameForm = ({ fireFinalActions }) => {

    const [videogameData, setVideogameData] = useState({
        image: '',
        name: '',
        category: ''
    })

    const { image, name, category } = videogameData

    const handleAutoCompleteCity = async value => {
        setVideogameData({ ...videogameData, category: value })
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setVideogameData({ ...videogameData, [name]: value })
    }

    const handleCheckboxChange = e => {
        const { name, checked } = e.target
        setVideogameData({ ...videogameData, [name]: checked })
    }

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    const handleFormSubmit = e => {
        e.preventDefault()

        videogameService
            .saveVideogame({ ...videogameData })
            .then((response) => {
                const { _id: videogame_id } = response.data
                navigate(`/details/${videogame_id}`)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const [loadingImage, setLoadingImage] = useState(false)

    // const handleFileUpload = e => {

    //     setLoadingImage(true)

    //     const formData = new FormData()
    //     formData.append('imageData', e.target.files[0])

    //     uploadServices
    //         .uploadimage(formData)
    //         .then(res => {
    //             setItineraryData({ ...itineraryData, images: res.data.cloudinary_url })
    //             setLoadingImage(false)
    //         })
    //         .catch(err => setErrors(err.response.data.errorMessages))
    // }

    return (
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file"
                // onChange={handleFileUpload} 
                />
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
                <Button className="create-button" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Create Videogame'}</Button>
            </div>

        </Form >
    )
}

export default NewVideogameForm