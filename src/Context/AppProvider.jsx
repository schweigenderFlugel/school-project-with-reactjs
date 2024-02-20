import { createContext, useState } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [ signIn, setSignIn ] = useState()
  const [ discordAuth, setDiscordAuth ] = useState(false)
  const [ openSignInModal, setOpenSignInModal ] = useState(false);
  const [ openSignUpModal, setOpenSignUpModal ] = useState(false);
  const [ error, setError ] = useState(null);

  return (
    <AppContext.Provider
      value={{
        signIn,
        setSignIn,
        discordAuth,
        setDiscordAuth,
        openSignInModal, 
        setOpenSignInModal,
        openSignUpModal, 
        setOpenSignUpModal,
        error,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
