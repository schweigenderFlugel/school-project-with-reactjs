import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import axios from "../Services/axios";
import { Modal } from "./Modal";
import { useModals } from "../Hooks/useModals";
import { ErrorMessages } from "./ErrorMessages";

export const Validation = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ code, setCode ] = useState('');
  const { openValidationModal, setOpenValidationModal, setError } = useModals();

  const validateRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios({
        url: '/activation',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ code })
      })
      setOpenValidationModal(false)
    } catch (error) {
      if (!error?.response) {
        setIsLoading(false);
        setError(<ErrorMessages>No pudo conectarse al servidor</ErrorMessages>);
        setOpenSignInModal(false);
      } else if (error?.response.status === 403) {
        setIsLoading(false);
        setError(<ErrorMessages>El código es incorrecto</ErrorMessages>);
        setOpenSignInModal(false);
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
    <Modal open={openValidationModal}>
      <main className='grid place-content-center text-center bg-white rounded-3xl px-12 py-6'>
      <IoCloseCircleOutline onClick={() => setOpenValidationModal(!openValidationModal)} className='text-[30px] hover:text-red-600 relative cursor-pointer'></IoCloseCircleOutline>
        <header className='font-bold mb-6 mt-4 text-[20px]'>Ingrese el código de activación</header>
        <div>
          <form onSubmit={validateRegister}>
            <div>
              <input className='rounded-md px-2 py-1 mb-6' onChange={(e) => setCode(e.target.value)}/>
            </div>
              {isLoading
                ? (
                  <button type='button' className='text-center bg-green-700 opacity-70 text-white rounded-md py-1 px-2 font-bold' disabled>
                    <svg className='animate-spin h-5 w-10 text-white' viewBox='0 0 24 24' />
                  </button>
                  )
                : (
                  <button type='submit' className='bg-green-700 text-white rounded-md py-1 px-2 font-bold'>Validar</button>
                )
              }
          </form>
        </div>
      </main>
    </Modal>
  )
}