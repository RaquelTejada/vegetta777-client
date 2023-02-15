import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import './VideogameCard.css'
import Card from 'react-bootstrap/Card'
import { ButtonGroup, Modal } from 'react-bootstrap';
import { AuthContext } from './../../contexts/auth.context'
import { VideogameContext } from '../../contexts/videogame.context'
import videogameService from '../../services/videogame.service'
import EditVideogameForm from '../../components/EditVideogameForm/EditVideogameForm'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { MessageContext } from '../../contexts/userMessage.context';

function VideogameCard({ image, name, category, votes, owner, _id }) {

    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])

    const { loadVideogames } = useContext(VideogameContext)
    const { user } = useContext(AuthContext)
    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const deleteVideogame = e => {
        e.preventDefault()
        videogameService
            .deleteVideogame(_id)
            .then(() => {
                loadVideogames()
                navigate('/createVideogame')

            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const handleVote = () => {

        videogameService
            .addVideogameVote(_id)
            .then(() => {
                setShowToast(true)
                setToastMessage('Remember you can only vote for your top 5')
                loadVideogames()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const checkVotes = () => {

        const filterUserId = votes.filter(elm => elm === user._id)

        if (user.votes === 5) {
            return true
        } else if (filterUserId.length === 1) {
            return true
        } else return false
    }


    return (
        <>
            < Card className="mb-4 videogame-card VideogameCard">
                <Card.Img className='videogame-image' variant="top" src={image} />
                <Card.Body>
                    <div className='card-text'>
                        <Card.Title>Name: {name}</Card.Title>
                        <Card.Title>Category: {category}</Card.Title>
                        <Card.Title>Votes: {votes.length}</Card.Title>
                    </div>
                    {
                        !owner || owner !== user?._id
                            ?
                            <>
                            </>
                            :
                            <>
                                <div className="d-grid">
                                    <ButtonGroup aria-label="Basic example">
                                        <button className="span-home-page margin-buttons" variant="gray" onClick={openModal}>Edit</button>
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
                                    <button className='span-home-page'>Vote</button>
                                </Link>
                            </>
                            :
                            <>
                                <button onClick={handleVote} className='span-home-page mt-2'
                                    disabled={checkVotes() ? true : false}
                                >Vote</button>
                            </>
                    }

                    {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

                </Card.Body>
            </Card>
        </>
    );
}

export default VideogameCard;