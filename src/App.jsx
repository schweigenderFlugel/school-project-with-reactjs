import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Context/AppProvider'
import { Navbar } from './Components/Navbar'
import PersistLogin from './Components/PersistLogin'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { Home } from './Pages/Home'
import { Validation } from './Components/Validation'
import { Profile } from './Pages/Profile'
import { NotFoundPage } from './Pages/NotFoundPage'
import './App.css'
import { Tags } from './Components/Tags'

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Tags />
        <Navbar />
        <Validation />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoutes />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage />} />

        </Routes>

      </BrowserRouter>
    </AppProvider>
  )
}
