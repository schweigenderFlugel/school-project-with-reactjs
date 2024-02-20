import { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppProvider';
import axios from '../Services/axios'

const useAuthDiscord = () => {
  const { discordAuth, setDiscordAuth, signIn, setSignIn } = useContext(AppContext)

  useEffect(() => {
    axios('/discord/user')
    .then(response => {
      setSignIn(response?.data)
      setDiscordAuth(true);
    })
    }, [])

    return { discordAuth }
}

export default useAuthDiscord;