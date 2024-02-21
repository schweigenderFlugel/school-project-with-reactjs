import { useState, useEffect, useRef } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

import { Modal } from './Modal';
import { ErrorMessages } from './ErrorMessages';
import { useModals } from '../Hooks/useModals';
import { INPUTS_SIGNUP } from './const/inputs.auth';
import axios from '../Services/axios';

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenSignUpModal, openSignUpModal, setOpenValidationModal, setError } = useModals();

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
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
        data: JSON.stringify({ email, password, confirmPassword })
      })
      setIsLoading(false);
      setOpenSignUpModal(false);
      setOpenValidationModal(true);
    } catch (error) {
      if (!error?.response) {
        setIsLoading(false);
        setError(<ErrorMessages>No pudo conectarse al servidor</ErrorMessages>);
        setOpenSignUpModal(false);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 401) {
        setIsLoading(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setOpenSignUpModal(false);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 404) {
        setIsLoading(false);
        setOpenSignUpModal(false);
        setError(<ErrorMessages>Datos Incorrectos</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else if (error?.response?.status === 409) {
        setIsLoading(false);
        setOpenSignUpModal(false);
        setError(<ErrorMessages>El correo ingresado ya está registrado</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      } else {
        setIsLoading(false);
        setOpenSignUpModal(false);
        setError(<ErrorMessages>Error desconocido</ErrorMessages>);
        setTimeout(() => {
          setError(null);
        }, 3000)
      }
    }
  }

  return (
    <Modal open={openSignUpModal}>
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
  )
}
