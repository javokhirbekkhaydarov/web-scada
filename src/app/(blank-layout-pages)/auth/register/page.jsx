// Component Imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers.js'
import RegisterPage from '@/entities/auth/register/ui/RegisterPage.jsx'

export const metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const Register = () => {
  // Vars
  const mode = getServerMode()

  return (
    <>
      <ToastContainer />
      <RegisterPage mode={mode} />
    </>
  )
}

export default Register
