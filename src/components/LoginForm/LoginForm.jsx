import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import authService from "../../services/auth.service"


const LoginForm = () => {

    const { user } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                const tokenFromServe = data.authToken
                storeToken(tokenFromServe)
                authenticateUser()
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { password, email } = loginData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Log In</Button>
            </div>

        </Form>
    )
}

export default LoginForm