export const INPUTS_SIGNIN = {
  email: {
    id: 'email',
    name: 'email',
    type: 'text',
    className: 'rounded-md px-2 py-1 mb-3',
    placeholder: 'Email'
  },
  password: {
    id: 'password',
    name: 'password',
    type: 'password',
    className: 'rounded-md px-2 py-1 mb-6',
    placeholder: 'Contraseña'
  }
}

export const INPUTS_SIGNUP = {
  email: {
    id: 'email',
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    className: 'rounded-md px-2 py-1 mb-3',
  },
  password: {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Contraseña',
    min: '8',
    max: '20',
    className: 'out-of-range:bg-red-500 rounded-md px-2 py-1 mb-3',
  },
  confirmPassword: {
    id: 'confirm_password',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Confirmar contraseña',
    min: '8',
    max: '20',
    className: 'out-of-range:bg-red-500 rounded-md px-2 py-1 mb-3',
  }
}
