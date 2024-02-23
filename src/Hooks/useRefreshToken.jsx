import { useContext } from 'react'
import axios from '../Services/axios'
import useSignOut from './useLogout'
import { AppContext } from '../Context/AppProvider'

const useRefreshToken = () => {
  const { setSignIn } = useContext(AppContext)
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
