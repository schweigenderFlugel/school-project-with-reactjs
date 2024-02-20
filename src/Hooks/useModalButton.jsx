import { useContext } from "react"
import { AppContext } from "../Context/AppProvider"

export const useModalButton = () => {
    const { 
        openSignInModal, 
        setOpenSignInModal,
        openSignUpModal, 
        setOpenSignUpModal,
        error,
        setError,
    } = useContext(AppContext);

    const setErrorNull = () => {
      if (error !== null) {
        if(openSignInModal || openSignUpModal) {
          setError(null);
        }
      }
    }

    setErrorNull();

    return { openSignInModal, setOpenSignInModal, openSignUpModal, setOpenSignUpModal, error, setError }
}