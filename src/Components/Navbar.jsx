import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { useSignIn } from '../Hooks/useLogin'
import useSignOut from '../Hooks/useLogout'
import useAuthDiscord from '../Hooks/useDiscordAuth'
import useDiscordRevoke from '../Hooks/useDiscordRevoke'
import { useModalButton } from '../Hooks/useModalButton'
import { SignInButton, SignUpButton } from './Buttons/SignButtons'

const NavLink = ({ to, children }) => {
  const activeStyle = 'font-bold underline'
  return (
    <li className='px-2'>
      <ReactRouterNavLink to={to} className={({ isActive }) => isActive ? activeStyle : undefined}>
        {children}
      </ReactRouterNavLink>
    </li>
  )
}

export const Navbar = () => {
  const { signIn } = useSignIn();
  const { discordAuth } = useAuthDiscord()
  const signOut = useSignOut();
  const discordRevoke = useDiscordRevoke();
  const { openSignInModal, setOpenSignInModal, openSignUpModal, setOpenSignUpModal } = useModalButton();

  return (
    <nav className='flex bg-white z-10 w-full justify-between'>
      <div className='py-3 px-4'>
        <ul>
          <IoMenu className='text-[30px] cursor-pointer'></IoMenu>
        </ul>
      </div>
      <div>
        <ul className='flex text-black py-3 px-2'>
          {!signIn?.accessToken && <SignUpButton setOpen={() => setOpenSignUpModal(!openSignUpModal)}>Sign Up</SignUpButton>}
          {!signIn?.accessToken && <SignInButton setOpen={() => setOpenSignInModal(!openSignInModal)}>Sign In</SignInButton>}
          {signIn?.accessToken && <NavLink to='profile'>Profile</NavLink>}
          {signIn?.accessToken && !discordAuth && <ReactRouterNavLink className='px-2' onClick={() => signOut()}>Logout</ReactRouterNavLink>}
          {discordAuth && signIn?.accessToken && <ReactRouterNavLink className='px-2' onClick={() => discordRevoke()}>LogoutDiscord</ReactRouterNavLink>}
        </ul>
      </div>
    </nav>
  )
}
