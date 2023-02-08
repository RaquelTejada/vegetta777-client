import './VideogameListPage.css'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import videogameService from '../../services/videogame.service'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideogameCard from '../../components/VideogameCard/VideogameCard'


const VideogameListPage = () => {

    const [videogames, setVideogames] = useState()

    const printVideogames = () => {

        videogameService
            .getAllVideogames()
            .then(response => setVideogames(response.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        printVideogames()
    }, [])


    return (
        <>
            <Container fluid>
                <Row>
                    {
                        videogames ? videogames.map((videogame, idx) => {
                            return (
                                <Col md={{ span: 3 }}>
                                    <VideogameCard
                                        image={videogame.image}
                                        name={videogame.name}
                                        category={videogame.category}
                                        votes={videogame.votes}
                                        owner={videogame.owner}
                                    />
                                </Col>
                            )
                        })
                            :
                            'Cargando...'}
                </Row>
            </Container>
        </>
    )

}

export default VideogameListPage