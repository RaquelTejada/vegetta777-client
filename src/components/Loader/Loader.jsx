import { Spinner } from "react-bootstrap"

function Loader() {
    return (
        <Spinner animation='border' role='stattus'>
            <span className='visually-hidden'>Cargando...</span>
        </Spinner>
    )
}

export default Loader