import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useSignIn } from '../Hooks/useLogin'
import useSignOut from '../Hooks/useLogout';
import useAuthDiscord from '../Hooks/useDiscordAuth';
import useDiscordRevoke from '../Hooks/useDiscordRevoke';
import { AppContext } from '../Context/AppProvider';

export const ProfileMenu = () => {
  const { discordAuth } = useAuthDiscord()
  const { signIn } = useSignIn();
  const signOut = useSignOut();
  const discordRevoke = useDiscordRevoke();
  const { profileMenu } = useContext(AppContext);

  return (
    <>
      {profileMenu && ( 
        <div className='absolute inline-block text-right mr-6'>
          <ul>
            <li className='block hover:bg-gray-400'>Tu perfil</li>
            <li className='block hover:bg-gray-400'>Tus artículos</li>
            <li>{signIn?.accessToken && !discordAuth && <NavLink className='px-2' onClick={() => signOut()}>Logout</NavLink>}</li>
            <li>{discordAuth && signIn?.accessToken && <NavLink className='px-2' onClick={() => discordRevoke()}>LogoutDiscord</NavLink>}</li>
          </ul>
        </div>
      )
    }
    </>
  )
}