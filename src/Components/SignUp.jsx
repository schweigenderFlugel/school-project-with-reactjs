import { useContext, useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

import { Modal } from './Modal';
import { ErrorMessages } from './ErrorMessages';
import { INPUTS_SIGNUP } from './const/inputs.auth';
import { SignButton } from './Buttons/SignButton';
import axios from '../Services/axios';
import { AppContext } from '../Context/AppProvider';

export const SignUp = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const { openSignUpModal, setOpenSignUpModal, setOpenValidationModal } = useContext(AppContext);

  const handleSubmit = async (e) => {
    const abortController = new AbortController();
    e.preventDefault();
    setIsLoading(true)
    try {
      await axios({
        url: '/sign-up',
        method: 'POST',
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ email, password, confirmPassword })
      })
      setIsLoading(false);
      setOpenSignUpModal(false);
      setOpenValidationModal(true);
    } catch (error) {
      if (!error?.response) {
        setIsLoading(false);
        setError(<ErrorMessages>No pudo conectarse al servidor</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 401) {
        setIsLoading(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 404) {
        setIsLoading(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 409) {
        setIsLoading(false);
        setError(<ErrorMessages>El correo ingresado ya está registrado</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else {
        setIsLoading(false);
        setError(<ErrorMessages>Error desconocido</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      }
    }
  }

  return (
    <>
      <SignButton setOpen={() => setOpenSignUpModal(!openSignUpModal)}>Sign Up</SignButton>
      <Modal open={openSignUpModal}>
      <main className='grid place-content-center text-center bg-white rounded-3xl px-12 py-6'>
      <IoCloseCircleOutline onClick={() => setOpenSignUpModal(!openSignUpModal)} className='text-[30px] hover:text-red-600 relative cursor-pointer'></IoCloseCircleOutline>
      <header className='font-bold mb-6 mt-4 text-[20px]'>Ingrese sus datos</header>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
            {...INPUTS_SIGNUP.email}
            required
            onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input
            {...INPUTS_SIGNUP.password}
            required
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input 
            {...INPUTS_SIGNUP.confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {isLoading
            ? (
              <button type='button' className='text-center bg-green-700 opacity-70 text-white rounded-md py-1 px-2 font-bold' disabled>
                <svg className='animate-spin h-5 w-10 text-white' viewBox='0 0 24 24' />
              </button>)
            : (
              <button type='submit' className='bg-green-700 text-white rounded-md py-1 px-2 font-bold'>Registrarse</button>
            )
          }
        </form>
      </main>
    </Modal>
    </>
  )
}
