import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import CreateVideogamePage from '../pages/CreateVideogamePage/CreateVideogamePage'
import VideogameListPage from '../pages/VideogameListPage/VideogameListPage'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />} >
                <Route path='/createVideogame' element={<CreateVideogamePage />} />
            </Route>
            <Route path='/videogameList' element={<VideogameListPage />} />
            <Route paht='/*' element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes