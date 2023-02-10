import './HomePage.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {

    return (
        <div className='background-home-page'>

            <Container>
                <Row className='row-home-page'>
                    <Col>
                        <h1 className='title-home-page'>
                            Welcome to <br />
                            2023 Videogame Ranking
                        </h1>
                        <hr />
                        <p className='paragraph-home-page'>
                            Hi! I'm Vegetta777 and I have a question for you: <br />
                            Which are your the video games you would like the most to watch me to play? <br />
                            Click on the button and vote for your top 5!
                        </p>
                    </Col>

                    <Col>
                        <Link to={'/videogameList'} className='div-span-home-page'>
                            <span className='span-home-page'>Videogame List</span>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage