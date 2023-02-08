import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import CreateVideogamePage from '../pages/CreateVideogamePage/CreateVideogamePage'
import VideogameListPage from '../pages/VideogameListPage/VideogameListPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/createVideogame' element={<CreateVideogamePage />} />
            <Route path='/videogameList' element={<VideogameListPage />} />
        </Routes>
    )
}

export default AppRoutes