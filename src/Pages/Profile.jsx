import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '../Hooks/useLogin'
import { useAxiosPrivate } from '../Hooks/useInterceptor'

export const Profile = () => {
  const { signIn } = useSignIn()
  const [profile, setProfile] = useState({})
  const [controller, setController] = useState(null)
  const [loading, setLoading] = useState(true)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  useEffect(() => {
    const abortController = new AbortController()
    setController(abortController)

    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate({
          url: '/profile',
          method: 'GET',
          signal: abortController.signal
        })
        setProfile(response?.data)
        setLoading(false)
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate('/sign-in', { replace: true })
        }
      }
    }
    fetchProfile()
  }, [])

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort()
    }
  }

  return (
    <>
      {!loading && signIn
        ? (
          <>
            <label>Nombre de usuario</label>
            <input name='username' type='text' defaultValue={profile.username} />
            <label>Dirección</label>
            <input name='address' type='text' defaultValue={profile.address} />
            <label>Teléfono</label>
            <input name='phone' type='text' defaultValue={profile.phone} />
          </>
          )
        : (
          <>
            <h1>Cargando</h1>
            <button onClick={() => handleCancelRequest()}>Cancelar petición</button>
          </>
          )}
    </>
  )
}
