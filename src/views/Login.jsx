'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'

import { api } from '@/utils/api'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { CircularProgress } from '@mui/material'

// Styled Custom Components
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

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('qwer1111!')
  const [password, setPassword] = useState('qwer1111!')

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
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
      const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/'

      router.push(lastVisitedPage)

      // window.location.href = lastVisitedPage
      localStorage.removeItem('lastVisitedPage')
    }
  }, [router])

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      // const response = await api({
      //   url: 'token/',
      //   method: 'POST',
      //   data: { username, password },
      //   open: true
      // })
setTimeout(() => {

  setLoading(false)

  const { access, refresh } = 'token'

  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)

  const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/'

  router.push(lastVisitedPage)

  // window.location.href = lastVisitedPage
  localStorage.removeItem('lastVisitedPage')
},1000)
    } catch (error) {
      setLoading(false)
      toast.error(error)
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
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`  ${themeConfig.templateName} ga xush kelibsiz!`}</Typography>
            <Typography>Boshlash uchun tizimga kiring</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Telefon raqam'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='+998 99 999 99 99'
            />
            <CustomTextField
              fullWidth
              label='Parol'
              placeholder='············'
              id='outlined-adornment-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={loading || (!username && !password)}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </Button>
          </form>
          <div className='flex flex-col items-start justify-start gap-1'>
            <p>
              Akkauntingiz yo‘qmi?{' '}
              <Link href="/auth/register" className="underline text-primary">
                Ro‘yxatdan o‘ting
              </Link>
            </p>

            <p>
              Parolni unutdingizmi?{' '}
              <Link href="/auth/forgot-password" className="underline text-primary">
                Tiklash
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
