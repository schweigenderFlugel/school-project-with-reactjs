import { useModalButton } from "../Hooks/useModalButton"

export const Home = () => {
  const { openSignUpModal, setOpenSignUpModal } = useModalButton();

  console.log(openSignUpModal)

  return (
    <h1>Este es el Home de la aplicación</h1>
  )
}
