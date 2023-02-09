import { Form, Button, Row, Col } from "react-bootstrap"
import { useState } from 'react'


const FilterName = ({ setQuery }) => {

    const [inputValue, setInputValue] = useState('')

    const searchVideogame = e => {
        setInputValue(e.target.value)
        setQuery(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        setInputValue('')
    }

    return (
        <Form onSubmit={handleFormSubmit} >
            <Form.Group className="mb-4" controlId="ingredient">
                <Row>
                    <Col md={{ span: 7, offset: 2 }} >
                        <Form.Control type="text" name="name" value={inputValue} onChange={searchVideogame} placeholder='Search Videogame by name' />
                    </Col>
                    <Col md={{ span: 1 }}>
                        <Button variant="dark" type="submit"></Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )

}

export default FilterName