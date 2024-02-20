import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Context/AppProvider'
import { Navbar } from './Components/Navbar'
import PersistLogin from './Components/PersistLogin'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { Home } from './Pages/Home'
import { SignIn } from './Components/SignIn'
import { SignUp } from './Components/SignUp'
import { Profile } from './Pages/Profile'
import { NotFoundPage } from './Pages/NotFoundPage'
import './App.css'

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <SignIn/>
        <SignUp/>
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
