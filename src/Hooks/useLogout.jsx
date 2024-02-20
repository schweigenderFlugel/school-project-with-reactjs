import axios from '../Services/axios'
import { useSignIn } from './useLogin'

const useSignOut = () => {
  const { setSignIn } = useSignIn()

  const signOut = async () => {
    setSignIn({})
    try {
      await axios({
        url: '/sign-out',
        method: 'GET',
      })
    } catch (error) {
      console.error(error)
    }
  }
  return signOut
}

export default useSignOut
