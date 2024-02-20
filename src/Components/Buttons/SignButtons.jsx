export const SignInButton = ({ children, setOpen }) => {
    return (
    <button className="bg-black rounded-3xl text-white px-4 py-2 font-bold mr-2" onClick={setOpen}>
        {children}
    </button>
    )
}

export const SignUpButton = ({ children, setOpen }) => {
  return (
  <button className="bg-black rounded-3xl text-white px-4 py-2 font-bold mr-2" onClick={setOpen}>
      {children}
  </button>
  )
}
  