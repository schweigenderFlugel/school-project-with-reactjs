import { IoIosWarning } from 'react-icons/io';
import { createPortal } from 'react-dom';
import { useModals } from '../Hooks/useModals';

export const ErrorMessages = ({ children }) => {
  return (
    <div className='flex absolute py-2 px-6 border rounded-md bg-red-200 border-red-700 text-red-700 font-bold'>
      <IoIosWarning className='h-6 w-6 mr-1' />
      <p>{children}</p>
    </div>
  )
}

export const ErrorMessagesTag = () => {
  const { error } = useModals();

  return createPortal(
    <section className='flex flex-col items-center transition duration-300 ease-out'>{error}</section>,
    document.getElementById('tags')
  )
}
