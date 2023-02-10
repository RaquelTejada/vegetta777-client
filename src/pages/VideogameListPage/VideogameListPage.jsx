import './VideogameListPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import videogameService from '../../services/videogame.service'
import { useState, useEffect, useContext } from 'react'
import VideogameCard from '../../components/VideogameCard/VideogameCard'
import FilterName from '../../components/FilterName/FilterName'
import { VideogameContext } from '../../contexts/videogame.context'


const VideogameListPage = () => {

    const [query, setQuery] = useState(null)

    const { videogames, setVideogames } = useContext(VideogameContext)

    useEffect(() => {
        loadData()
        // eslint-disable-next-line
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
        // eslint-disable-next-line
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


    const filterCategory = (elm) => {

        videogameService
            .getFindCategory(elm)
            .then(({ data }) => {
                setVideogames(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <Container>
                <div>
                    <FilterName setQuery={setQuery} />
                </div>
                <div >
                    <button className='margin-buttons' onClick={filterAlphabeticalyAsc}>Sort A-Z</button>
                    <button onClick={filterAlphabeticalyDesc}>Sort Z-A</button>
                </div>
                <div className='mt-3'>
                    <button className='margin-buttons' onClick={filterVotesDesc}>Most voted</button>
                    <button onClick={filterVotesAsc}>Least voted</button>
                </div>

                <div className='mt-3'>
                    <button className='margin-buttons' onClick={() => printVideogames()}>All</button>
                    <button className='margin-buttons' onClick={() => filterCategory('Fight')}>Fight</button>
                    <button className='margin-buttons' onClick={() => filterCategory('Arcade')}>Arcade</button>
                    <button className='margin-buttons' onClick={() => filterCategory('Rol')}>Rol</button>
                    <button className='margin-buttons' onClick={() => filterCategory('Adventure')}>Adventure</button>
                    <button onClick={() => filterCategory('Simulation')}>Simulation</button>
                </div>

                <Row className='mt-3'>
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