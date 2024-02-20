export const SignInButton = ({ children, setOpen }) => {
    return (
    <button className="bg-black rounded-2xl text-white px-2 py-2 font-bold mr-2" onClick={setOpen}>
        {children}
    </button>
    )
}

export const SignUpButton = ({ children, setOpen }) => {
  return (
  <button className="bg-black rounded-2xl text-white px-2 py-2 font-bold mr-2" onClick={setOpen}>
      {children}
  </button>
  )
}
  