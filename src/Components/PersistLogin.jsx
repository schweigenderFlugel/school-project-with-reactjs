import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../Hooks/useRefreshToken'
import { useSignIn } from '../Hooks/useLogin'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState()
  const refresh = useRefreshToken()
  const { signIn } = useSignIn()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    !signIn?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading ? <p>Cargando...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin
