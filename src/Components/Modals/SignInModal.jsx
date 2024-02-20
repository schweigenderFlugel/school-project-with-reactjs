import { React } from 'react'
import { createPortal } from 'react-dom'

export const SignInModal = ({ open, children }) => {
  if (!open) return null
  return createPortal(
    <div className='flex fixed inset-0 z-10 justify-center items-center transition duration-300 ease-out bg-gray-700 bg-opacity-90'>
      <div>{children}</div>
    </div>,
    document.getElementById('portal')
  )
}
