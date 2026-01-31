// Component Imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers.js'
import RegisterPage from '@/entities/auth/register/ui/RegisterPage.jsx'
import ForgotPasswordPage from '@/entities/auth/forgot-password/ui/ForgotPasswordPage.jsx'

export const metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const ForgotPassword = () => {
  // Vars
  const mode = getServerMode()

  return (
    <>
      <ToastContainer />
      <ForgotPasswordPage mode={mode} />
    </>
  )
}

export default ForgotPassword
