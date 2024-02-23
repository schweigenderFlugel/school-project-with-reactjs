import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { AppContext } from "../Context/AppProvider";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";


export const Navbar = () => {
  const { signIn } = useContext(AppContext);
  const { profileMenu, setProfileMenu, session } = useContext(AppContext);

  return (
    <nav className='flex bg-white z-10 w-full justify-between'>
      <div className='py-3 px-4'>
        <ul>
          <IoMenu className='text-[40px] cursor-pointer'></IoMenu>
        </ul>
      </div>
      <div>
        <ul className='flex py-4 px-3 mr-6'>
          <li>{!session && <SignUp />}</li>
          <li>{!session && <SignIn />}</li>
          <li>{signIn?.accessToken && <FaCircleUser className='text-[40px] cursor-pointer overflow-hidden' onClick={() => setProfileMenu(!profileMenu)} />}</li>
        </ul>
      </div>
    </nav>
  )
}
