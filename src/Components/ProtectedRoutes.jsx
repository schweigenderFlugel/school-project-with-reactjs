import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSignIn } from '../Hooks/useLogin'
import { useModals } from '../Hooks/useModals'

const ProtectedRoutes = () => {
  const { signIn } = useSignIn()
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
