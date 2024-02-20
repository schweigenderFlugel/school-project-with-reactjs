import { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'

export const useSignIn = () => {
  return useContext(AppContext)
}
