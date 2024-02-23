import { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useModals } from '../Hooks/useModals'
import { AppContext } from '../Context/AppProvider'

const ProtectedRoutes = () => {
  const { signIn } = useContext(AppContext)
  const location = useLocation()
  const { signInOpenModal, setOpenSignInModal } = useModals();

  const Modal = () => {
    setOpenSignInModal(!signInOpenModal)
  }

  Modal();

  return (
    signIn?.accessToken
      ? <Outlet />
      : <Navigate to='/home' state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
