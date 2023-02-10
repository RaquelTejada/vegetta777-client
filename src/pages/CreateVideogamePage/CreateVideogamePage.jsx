import { useState, useContext, useEffect } from "react"
import { Row, Modal, Container, Col } from "react-bootstrap"
import NewVideogameForm from '../../components/NewVideogameForm/NewVideogameForm'
import './CreateVideogamePage.css'
import VideogameCard from '../../components/VideogameCard/VideogameCard'
import videogameService from '../../services/videogame.service'
import { VideogameContext } from '../../contexts/videogame.context'


const VideogamePage = () => {

    const [showModal, setShowModal] = useState(false)
    const { videogames, setVideogames } = useContext(VideogameContext)


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
    }

    const printVideogames = () => {

        videogameService
            .getAllVideogames()
            .then(response => setVideogames(response.data))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        printVideogames()
        // eslint-disable-next-line
    }, [])

    return (

        <Container>
            <Row className="mt-5 route-row justify-content-center">

                <Row>
                    <div className="d-flex justify-content-center">
                        <span className="fill span-home-page span-create-videogame" onClick={openModal} variant="gray">Create New Videogame</span>
                    </div>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Videogame</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewVideogameForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>
                    </Modal>
                </Row>
                <Row className='my-5 flex-row'>
                    {
                        videogames.map((videogame, idx) => {
                            return (
                                <Col key={idx} md={{ span: 3 }}>
                                    <VideogameCard
                                        image={videogame.image}
                                        name={videogame.name}
                                        category={videogame.category}
                                        votes={videogame.votes}
                                        owner={videogame.owner}
                                        _id={videogame._id}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Row>
        </Container>
    )
}

export default VideogamePage