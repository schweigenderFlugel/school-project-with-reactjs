import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { AppContext } from "../Context/AppProvider";
import { useSignIn } from '../Hooks/useLogin'
import { useModalButton } from '../Hooks/useModalButton'
import { SignInButton, SignUpButton } from './Buttons/SignButtons';
import { ProfileMenu } from "../Components/ProfileMenu";


export const Navbar = () => {
  const { signIn } = useSignIn();
  const { profileMenu, setProfileMenu } = useContext(AppContext);
  const { openSignInModal, setOpenSignInModal, openSignUpModal, setOpenSignUpModal } = useModalButton();

  return (
    <nav className='flex bg-white z-10 w-full justify-between'>
      <div className='py-3 px-4'>
        <ul>
          <IoMenu className='text-[40px] cursor-pointer'></IoMenu>
        </ul>
      </div>
      <div>
        <ul className='flex py-4 px-3 mr-6'>
          <li>{!signIn?.accessToken && <SignUpButton setOpen={() => setOpenSignUpModal(!openSignUpModal)}>Sign Up</SignUpButton>}</li>
          <li>{!signIn?.accessToken && <SignInButton setOpen={() => setOpenSignInModal(!openSignInModal)}>Sign In</SignInButton>}</li>
          <li>{signIn?.accessToken && <FaCircleUser className='text-[40px] cursor-pointer overflow-hidden' onClick={() => setProfileMenu(!profileMenu)} />}</li>
        </ul>
      </div>
    </nav>
  )
}
