// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import ReduxProvider from '@components/ReduxProvider'

import { store } from '@/store'
import AuthWrapper from '@components/AuthWrapper'

export const metadata = {
  title: '  WEB SCADA',
  description: 'WEB SCADA'
}
import Providers from '@components/Providers'
import ProgressProvider from './providers'

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body suppressHydrationWarning={true} className='flex is-full min-bs-full flex-auto flex-col'>
        <AuthWrapper>
          <ProgressProvider>
            <Providers direction={direction}>
              <ReduxProvider>{children}</ReduxProvider>
            </Providers>
          </ProgressProvider>
        </AuthWrapper>
      </body>
    </html>
  )
}

export default RootLayout
