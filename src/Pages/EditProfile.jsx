import { useState, useEffect } from "react";
import { useSignIn } from '../Hooks/useLogin'
import { useAxiosPrivate } from "../Hooks/useInterceptor";

export const EditProfile = () => {
  const { signIn } = useSignIn()
  const [profile, setProfile] = useState()

  const usePrivate = useAxiosPrivate()

  const handleSubmit = () => {
    const response = usePrivate({
      url: '/profile',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setProfile(response?.data);
  }

  return (
    <main>
        <form onSubmit={handleSubmit}></form>
        <div>
            <label>Nombre de usuario:</label>
            <input type="text" value={profile?.username} />
        </div>
        <div>
            <label>Descripción:</label>
            <input type="text" value={profile?.description} />
        </div>
        <button type="submit">Editar</button>
    </main>
  )
}