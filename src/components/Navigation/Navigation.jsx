import './Navigation.css'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    // const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar className='color-nav' expand="lg">
            <Link to="/">
                <Navbar.Brand className='brand-name' as='div'>Vegetta777</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Videogames List</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>

                    <NavDropdown title="Access" id="basic-nav-dropdown">
                        <Link to="/signup">
                            <Nav.Link className='dropdown-text ' as='div'>Sign Up</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link className='dropdown-text' as='div'>Log In</Nav.Link>
                        </Link>
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
