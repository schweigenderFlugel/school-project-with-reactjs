import { useContext } from "react"
import { AppContext } from "../Context/AppProvider"

export const useModals = () => {
    const { 
        openSignInModal, 
        setOpenSignInModal,
        openSignUpModal, 
        setOpenSignUpModal,
        openValidationModal,
        setOpenValidationModal,
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

    return { 
      openSignInModal,
      setOpenSignInModal,
      openSignUpModal,
      setOpenSignUpModal,
      openValidationModal,
      setOpenValidationModal, 
      error, 
      setError 
    }
}