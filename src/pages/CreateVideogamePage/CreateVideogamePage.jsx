import { useContext, useState } from "react"
import { Col, Row, Button, Modal, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import VideogameCard from '../../components/VideogameCard/VideogameCard'
import { VideogameContext } from "../../contexts/videogame.context"
import { AuthContext } from '../../contexts/auth.context'
import NewVideogameForm from '../../components/NewVideogameForm/NewVideogameForm'
import VideogameListPage from "../VideogameListPage/VideogameListPage"

const VideogamePage = () => {

    const { videogames } = useContext(VideogameContext)

    const { user } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
    }

    return (

        <Container>
            <Row className="mt-5 route-row">
                {
                    !user
                        ?
                        <>
                            <Link to={'/login'}>
                                <Button className="fill create-route-button" variant="gray" size="sm">Create New Videogame</Button>
                            </Link>
                        </>
                        :
                        <>
                            <Row className="d-flex justify-content-center">
                                <Button className="fill create-route-button" onClick={openModal} variant="gray">Create New Videogame</Button>
                                <Modal show={showModal} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Videogame</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewVideogameForm fireFinalActions={fireFinalActions} />
                                    </Modal.Body>
                                </Modal>
                            </Row>
                        </>
                }
                <VideogameListPage />
            </Row>
        </Container>
    )
}

export default VideogamePage