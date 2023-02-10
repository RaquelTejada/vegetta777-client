import './VideogameListPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import videogameService from '../../services/videogame.service'
import { useState, useEffect, useContext } from 'react'
import VideogameCard from '../../components/VideogameCard/VideogameCard'
import FilterName from '../../components/FilterName/FilterName'
import { VideogameContext } from '../../contexts/videogame.context'
import { useParams } from 'react-router-dom'


const VideogameListPage = () => {

    const [query, setQuery] = useState(null)

    const { videogames, setVideogames } = useContext(VideogameContext)

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

    const filterAlphabeticalyAsc = () => {

        videogameService
            .getAlphabeticOrder('asc')
            .then(({ data }) => {
                setVideogames(data)
            })
            .catch(err => console.log(err))
    }

    const filterAlphabeticalyDesc = () => {

        videogameService
            .getAlphabeticOrder('desc')
            .then(({ data }) => {
                setVideogames(data)
            })
            .catch(err => console.log(err))
    }

    const filterVotesAsc = () => {

        videogameService
            .getVotesOrder('asc')
            .then(({ data }) => {
                setVideogames(data)
            })
            .catch(err => console.log(err))
    }

    const filterVotesDesc = () => {

        videogameService
            .getVotesOrder('desc')
            .then(({ data }) => {
                setVideogames(data)
            })
            .catch(err => console.log(err))
    }

    const [categoryNow, setCategoryNow] = useState({
        category: ''
    })

    const { loadVideogames, resetVideogame } = useContext(VideogameContext)

    const category = categoryNow

    useEffect(() => {
        resetVideogame()
        setCategoryNow({ category })
    }, [])

    const handleTypeChange = e => {
        const { name } = e.target
        setCategoryNow({ ...categoryNow, category: name })
        loadVideogames(categoryNow.category, name)
    }


    return (
        <>
            <Container fluid>
                <div>
                    <h3 className="titles mb-5">Search by name</h3>
                    <FilterName setQuery={setQuery} />
                </div>
                <div >
                    <button onClick={filterAlphabeticalyAsc}>Sort A-Z</button>
                    <button onClick={filterAlphabeticalyDesc}>Sort Z-A</button>
                </div>
                <div >
                    <button onClick={filterVotesAsc}>Less voted</button>
                    <button onClick={filterVotesDesc}>Top voted</button>
                </div>

                <Row>
                    <button onClick={handleTypeChange}>Fight</button>
                    <button onClick={handleTypeChange}>Arcade</button>
                    <button onClick={handleTypeChange}>Rol</button>
                    <button onClick={handleTypeChange}>Adventure</button>
                    <button onClick={handleTypeChange}>Simulation</button>
                </Row>

                <Row>
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
            </Container>
        </>
    )

}

export default VideogameListPage