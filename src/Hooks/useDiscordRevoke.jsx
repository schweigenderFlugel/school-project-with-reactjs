import { useContext } from "react";
import axios from "../Services/axios";
import { AppContext } from "../Context/AppProvider";

const useDiscordRevoke = () => {
  const { setDiscordAuth, setSignIn } = useContext(AppContext);

  const discordRevoke = async () => {
    setDiscordAuth(false)
    setSignIn({})
    try {
      await axios({
        url: '/discord/revoke',
        method: 'GET'
      })
    } catch (error) {
      console.error(error);
    }
  }
  return discordRevoke;
}

export default useDiscordRevoke;