'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import classnames from 'classnames'

import Link from '@components/Link.jsx'
import Logo from '@components/layout/shared/Logo.jsx'

import { useImageVariant } from '@core/hooks/useImageVariant.js'
import { useSettings } from '@core/hooks/useSettings.jsx'

import InnStep from './InnStep'
import PhoneStep from './PhoneStep'
import OtpStep from './OtpStep'
import PasswordStep from './PasswordStep'

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const RegisterPage = ({ mode }) => {
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const currentStep = useSelector((state) => state.registerStore.step)

  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/dashboard'

      router.push(lastVisitedPage)
      localStorage.removeItem('lastVisitedPage')
    }
  }, [router])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InnStep />
      case 2:
        return <PhoneStep />
      case 3:
        return <OtpStep />
      case 4:
        return <PasswordStep />
      default:
        return <InnStep />
    }
  }

  return (
    <div className='flex justify-center bs-full'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[540px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          {renderStep()}

          <p>
            Allaqachon ro&#39;yxatdan o&#39;tganmisiz? Unda{' '}
            <Link href={'/auth/login'} className={'underline text-primary'}>
              Login
            </Link>{' '}
            qiling
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
