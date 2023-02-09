import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import videogameService from "../../services/videogame.service"


const EditVideogameForm = ({ videogame_id, closeModal }) => {

    const [videogameData, setVideogameData] = useState({})

    useEffect(() => {
        videogameService
            .getOneVideogame(videogame_id)
            .then(({ data }) => setVideogameData(data))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setVideogameData({ ...videogameData, [name]: value })
    }

    // const [loadingImage, setLoadingImage] = useState(false)

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
    //         .catch(err => console.log(err))
    // }

    const handleFormSubmit = e => {
        e.preventDefault()

        videogameService
            .editVideogame(videogame_id, videogameData)
            .then(() => {
                navigate('/createVideogame')
                closeModal()
            })
            .catch(err => console.error(err))
    }



    const { image, name, category } = videogameData

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
                <Button className="create-button" type="submit">{'Edit Videogame'}</Button>
            </div>

        </Form>
    )
}

export default EditVideogameForm