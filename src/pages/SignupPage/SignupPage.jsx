import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container>

            <Row className='mt-5'>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Sign Up</h1>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage