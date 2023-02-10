import { Form, Row } from "react-bootstrap"
import { useState } from 'react'
import './FilterName.css'


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
            <Form.Group className="mb-4">
                <Row>
                    <div className="mt-3">
                        <Form.Control className="search-var" type="text" name="name" value={inputValue} onChange={searchVideogame}
                            placeholder='Search Videogame by name and press "Enter"' />
                    </div>

                </Row>
            </Form.Group>
        </Form>
    )

}

export default FilterName