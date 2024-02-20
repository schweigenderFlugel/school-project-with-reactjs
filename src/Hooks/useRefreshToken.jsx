import axios from '../Services/axios'
import { useSignIn } from './useLogin'
import useSignOut from './useLogout'

const useRefreshToken = () => {
  const { setSignIn } = useSignIn()
  const logout = useSignOut()

  const refresh = async () => {
    try {
      const response = await axios('new-token', {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        }
      })
      setSignIn(prev => {
        return {
          ...prev,
          accessToken: response.data.accessToken
        }
      })
      return response.data.accessToken
    } catch (error) {
      if (error?.response?.status === 401) await logout()
    }
  }
  return refresh
}

export default useRefreshToken
