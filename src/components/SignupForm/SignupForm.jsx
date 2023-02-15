import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { MessageContext } from './../../contexts/userMessage.context'
import ErrorMessage from '../ErrorMessage/ErrorMessage'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                setShowToast(true)
                setToastMessage('Signed in successfully')
                navigate('/login')
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    const { password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit">{'Sign Up'}</Button>
            </div>

        </Form>
    )
}

export default SignupForm