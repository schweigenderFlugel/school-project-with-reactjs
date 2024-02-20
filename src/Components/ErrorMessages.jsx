import { IoIosWarning } from 'react-icons/io'

export const ErrorMessages = ({ children }) => {
  return (
    <div className='flex center fixed mt-8 py-2 px-6 border rounded-md bg-red-200 border-red-700 text-red-700 font-bold'>
      <IoIosWarning className='h-6 w-6 mr-1' />
      <p>{children}</p>
    </div>
  )
}
