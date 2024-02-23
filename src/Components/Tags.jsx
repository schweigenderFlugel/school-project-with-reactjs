import { createPortal } from "react-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";

export const Tags = () => {
  const { error } = useContext(AppContext);

  if (!error) return null;
  return createPortal(
    <section className='flex flex-col items-center transition duration-300 ease-out'>{error}</section>,
    document.getElementById('tags')
  )
}