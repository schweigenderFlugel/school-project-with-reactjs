import { FaDiscord } from 'react-icons/fa'

export const DiscordAuthButton = () => {
    const authDiscord = () => {
      window.location.href = 'http://localhost:3000/discord/auth'
    }
  
    return (
      <button onClick={() => authDiscord()} className='flex text-center mt-4 mb-2 px-3 border-black bg-white rounded-md hover:bg-blue-900 hover:text-white hover:border-0'>
        <FaDiscord className='text-[24px] mr-2' />
        Ingresar con Discord
      </button>
    )
  }