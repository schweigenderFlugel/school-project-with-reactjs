import { useContext } from 'react'
import axios from '../Services/axios'
import { AppContext } from '../Context/AppProvider'

const useSignOut = () => {
  const { setSignIn } = useContext(AppContext);

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
