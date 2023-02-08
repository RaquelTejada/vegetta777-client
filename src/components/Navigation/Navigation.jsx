import './Navigation.css'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar className='color-nav' collapseOnSelect expand="lg">
            <Link to="/">
                <Navbar.Brand className='brand-name' as='div'>VV2023</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="/videogameList">Videogames List</Nav.Link> */}
                    <Nav.Link href="/createVideogame">Create Videogames</Nav.Link>
                    <NavDropdown title="Access" align="end">
                        {
                            !user
                                ?
                                <>
                                    <Link to="/signup">
                                        <Nav.Link className='dropdown-text ' as='div'>Sign Up</Nav.Link>
                                    </Link>
                                    <Link to="/login">
                                        <Nav.Link className='dropdown-text' as='div'>Log In</Nav.Link>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/">
                                        {user && <Nav.Link className='dropdown-text' as='div' onClick={logoutUser}>Log Out</Nav.Link>}
                                    </Link>
                                </>
                        }
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
