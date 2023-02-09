import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import './VideogameCard.css'
import Card from 'react-bootstrap/Card'
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { AuthContext } from './../../contexts/auth.context'
import { VideogameContext } from '../../contexts/videogame.context'
import videogameService from '../../services/videogame.service'
import EditVideogameForm from '../../components/EditVideogameForm/EditVideogameForm'
import { useNavigate } from 'react-router-dom'

function VideogameCard({ image, name, category, votes, owner, _id }) {

    const { loadVideogames } = useContext(VideogameContext)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteVideogame = e => {
        e.preventDefault()
        videogameService
            .deleteVideogame(_id)
            .then(() => {
                loadVideogames()
                navigate('/createVideogame')

            })
            .catch(err => console.error(err))
    }

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const handleVote = () => {

        videogameService
            .addVideogameVote(_id)
            .then(() => {
                loadVideogames()
            })
            .catch(err => console.error(err))
    }


    return (
        <>
            < Card className="mb-4 videogame-card VideogameCard">
                <Card.Img className='videogame-image' variant="top" src={image} />
                <Card.Body>
                    <div>
                        <Card.Title>Name: {name}</Card.Title>
                        <Card.Title>Category: {category}</Card.Title>
                        <Card.Title>Votes: {votes.length}</Card.Title>
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
                                        <button className="span-home-page" variant="gray" onClick={openModal}>Edit</button>
                                        <>
                                            <button className="span-home-page" variant="gray" onClick={deleteVideogame}>Delete</button>

                                            <Modal show={showModal} onHide={closeModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit Videogame</Modal.Title>
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
                    {
                        !user
                            ?
                            <>
                                <Link to="/login">
                                    <span className='span-home-page'>Vote</span>
                                </Link>
                            </>
                            :
                            <>
                                <button onClick={handleVote} className='span-home-page'>Vote</button>
                            </>
                    }

                </Card.Body>
            </Card>
        </>
    );
}

export default VideogameCard;