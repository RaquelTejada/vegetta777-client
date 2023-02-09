import './VideogameListPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import videogameService from '../../services/videogame.service'
import { useState, useEffect } from 'react'
import VideogameCard from '../../components/VideogameCard/VideogameCard'
import FilterName from '../../components/FilterName/FilterName'


const VideogameListPage = () => {

    const [videogames, setVideogames] = useState()
    const [query, setQuery] = useState(null)
    const [videogameSortByName, setVideogameSortByName] = useState()

    useEffect(() => {
        loadData()
    }, [query])

    const loadData = () => {

        query ?
            videogameService
                .filteredVideogame(query)
                .then(({ data }) => {
                    setVideogames(data)
                })
                .catch(err => console.log(err))
            :
            setQuery(null)
    }

    const printVideogames = () => {

        videogameService
            .getAllVideogames()
            .then(response => setVideogames(response.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        printVideogames()
    }, [])

    const sortByName = () => {
        const sortedByName = [...videogameSortByName];
        console.log(videogameSortByName)
        sortedByName.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setVideogameSortByName(sortedByName);
    };

    return (
        <>
            <Container fluid>
                <div>
                    <h3 className="titles mb-5">Search by name</h3>
                    <FilterName setQuery={setQuery} />
                </div>
                <button onClick={sortByName}>Sort by name</button>
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
                                        _id={videogame._id}
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