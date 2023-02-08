import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import './VideogameCard.css'
import Card from 'react-bootstrap/Card'
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { AuthContext } from './../../contexts/auth.context'
import { VideogameContext } from '../../contexts/videogame.context'
import videogameService from '../../services/videogame.service'
import EditVideogameForm from '../../components/EditVideogameForm/EditVideogameForm'

function VideogameCard({ image, name, category, votes, owner, _id }) {

    const { loadVideogames } = useContext(VideogameContext)

    const { user } = useContext(AuthContext)

    const deleteVideogame = e => {
        e.preventDefault()

        videogameService
            .deleteVideogame(_id)
            .then(() => {
                loadVideogames(category)
            })
            .catch(err => console.error(err))
    }

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    return (
        <>
            {
                !user
                    ?
                    < Card className="mb-4 VideogameCard">
                        <Card.Img variant="top" src={image} />
                        <Link to={`/login`}>
                            <div>
                                <Card.Title className='videogame-card-title'>{name}</Card.Title>
                            </div>
                        </Link>
                    </Card>
                    :

                    < Card className="mb-4 videogame-card">
                        <Card.Img className='videogame-image' variant="top" src={image} />
                        <Card.Body>
                            <div>
                                <Card.Title className='videogame-card-title'>Name: {name}</Card.Title>
                                <Card.Title className='videogame-card-title'>Category: {category}</Card.Title>
                                <Card.Title className='videogame-card-title'>Votes: {votes}</Card.Title>
                            </div>
                            {
                                !owner || owner != user?._id
                                    ?
                                    <>
                                    </>
                                    :
                                    <>
                                        <div className="d-grid">
                                            <ButtonGroup aria-label="Basic example">
                                                <Button className="fill-card itinerary-button d-flex align-items-center justify-content-center" variant="gray" onClick={openModal}>Edit</Button>
                                                <>
                                                    <Button className="fill-card itinerary-button d-flex align-items-center justify-content-center" variant="gray" onClick={deleteVideogame}>Delete</Button>

                                                    <Modal show={showModal} onHide={closeModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Create Videogame</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <EditVideogameForm videogame_id={_id} closeModal={closeModal} />
                                                        </Modal.Body>
                                                    </Modal>
                                                </>
                                            </ButtonGroup>
                                        </div>
                                    </>
                            }

                        </Card.Body>
                    </Card>
            }
        </>
    );
}

export default VideogameCard;