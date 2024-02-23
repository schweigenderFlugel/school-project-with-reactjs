import { useContext } from "react"
import { AppContext } from "../Context/AppProvider"

export const useModals = () => {
    const { 
        openSignUpModal, 
        setOpenSignUpModal,
        openValidationModal,
        setOpenValidationModal,
        error,
        setError,
    } = useContext(AppContext);

    const setErrorNull = () => {
      if (error !== null) {
        setError(null);
      }
    }

    setErrorNull();

    return { 
      openSignUpModal,
      setOpenSignUpModal,
      openValidationModal,
      setOpenValidationModal, 
      error, 
      setError 
    }
}