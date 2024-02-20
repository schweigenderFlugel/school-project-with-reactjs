import { useState, useEffect, useRef } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { SignUpModal } from './Modals/SignUpModal'
import { useModalButton } from '../Hooks/useModalButton'
import { INPUTS_SIGNUP } from './const/inputs.auth'
import axios from '../Services/axios';

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const { setOpenSignUpModal, openSignUpModal } = useModalButton();

  const errRef = useRef()

  useEffect(() => {
    setError(null)
  }, [email, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await axios({
        url: '/sign-up',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
        data: JSON.stringify({ email, password, confirmPassword })
      })
    } catch (error) {

    }
  }

  return (
    <>
      <section ref={errRef}>{error}</section>
      <SignUpModal open={openSignUpModal}>
        <main className='grid place-content-center text-center bg-white rounded-3xl px-12 py-6'>
        <IoCloseCircleOutline onClick={() => setOpenSignUpModal(!openSignUpModal)} className='text-[30px] hover:text-red-600 relative cursor-pointer'></IoCloseCircleOutline>
        <header className='font-bold mb-6 mt-4 text-[20px]'>Ingrese sus datos</header>
          <form onSubmit={handleSubmit}>
            <div>
              <input 
              {...INPUTS_SIGNUP.email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input
              {...INPUTS_SIGNUP.password}
              onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <input 
              {...INPUTS_SIGNUP.confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type='submit' className='bg-green-700 text-white rounded-md py-1 px-2 font-bold'>Registrarse</button>
          </form>
        </main>
      </SignUpModal>
    </>
  )
}
