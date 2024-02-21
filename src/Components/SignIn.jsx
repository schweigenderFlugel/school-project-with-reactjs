import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";

import { useSignIn } from '../Hooks/useLogin';
import axios from '../Services/axios';
import { ErrorMessages } from './ErrorMessages';
import { INPUTS_SIGNIN } from './const/inputs.auth';
import { DiscordAuthButton } from './Buttons/DiscordAuthButton';
import { Modal } from './Modal';
import { useModals } from '../Hooks/useModals';

export const SignIn = () => {
  const { setSignIn } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { openSignInModal, setOpenSignInModal, setOpenSignUpModal, setOpenValidationModal, setError } = useModals();

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const errRef = useRef()

  const registerForm = () => {
    setOpenSignInModal(false);
    setOpenSignUpModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios({
        url: '/sign-in',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
        data: JSON.stringify({ email, password })
      })
      const accessToken = response?.data
      console.log(accessToken)
      setSignIn(accessToken);
      setIsLoading(false);
      setOpenSignInModal(false);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setIsLoading(false);
        setOpenSignInModal(false);
        setError(<ErrorMessages>No pudo conectarse al servidor</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 401) {
        setIsLoading(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setOpenSignInModal(false);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 404) {
        setIsLoading(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setOpenSignInModal(false);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 403) {
        setIsLoading(false);
        setOpenSignInModal(false);
        setOpenValidationModal(true);
      }
       else {
        setIsLoading(false);
        setError(<ErrorMessages>Error desconocido</ErrorMessages>);
        setOpenSignInModal(false);
        setTimeout(() => {
          setError(null);
        }, 3000)
      }
    }
  }

  return (
    <Modal open={openSignInModal}>
      <main className='grid place-content-center text-center px-12 py-6 bg-white rounded-3xl'>
        <IoCloseCircleOutline onClick={() => setOpenSignInModal(!openSignInModal)} className='text-[30px] hover:text-red-600 relative cursor-pointer'></IoCloseCircleOutline>
        <header className='font-bold mb-6 mt-4 text-[20px]'>Ingrese sus datos</header>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                {...INPUTS_SIGNIN.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                {...INPUTS_SIGNIN.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              {isLoading
                ? (
                  <button type='button' className='text-center bg-green-700 opacity-70 text-white rounded-md py-1 px-2 font-bold' disabled>
                    <svg className='animate-spin h-5 w-10 text-white' viewBox='0 0 24 24' />
                  </button>
                )
                : (
                  <button type='submit' className='bg-green-700 text-white rounded-md py-1 px-2 font-bold'>Ingresar</button>
                )
              }
            </div>
          </form>
          <div>
          <div className='text-blue-900 hover:underline cursor-pointer' onClick={() => registerForm()}>¿Todavía no estás registrado?</div>
          </div>
          <div>
            <div className='text-blue-900 hover:underline cursor-pointer'>¿Has olvidado tu contraseña?</div>
          </div>
          <DiscordAuthButton />
        </div>
      </main>
    </Modal>
  )
}
