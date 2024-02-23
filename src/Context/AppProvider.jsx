import { createContext, useState } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [ signIn, setSignIn ] = useState('');
  const [ session, setSession ] = useState(false);
  const [ discordSession, setDiscordSession ] = useState(false);
  const [ openSignUpModal, setOpenSignUpModal ] = useState(false);
  const [ openValidationModal, setOpenValidationModal ] = useState(false);
  const [ error, setError ] = useState(null);

  return (
    <AppContext.Provider
      value={{
        signIn,
        setSignIn,
        session, 
        setSession,
        discordSession, 
        setDiscordSession,
        openSignUpModal,
        setOpenSignUpModal,
        openValidationModal, 
        setOpenValidationModal,
        error,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
