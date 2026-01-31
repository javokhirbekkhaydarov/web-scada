'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import CustomTextField from '@core/components/mui/TextField.jsx'
import {
  setPassword,
  setConfirmPassword,
  setError,
  clearError,
  resetRegister,
  prevStep
} from '@/store/registerSlice.js'
import { useToast } from '@/hooks/useToast'

const PasswordStep = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const password = useSelector(state => state.registerStore.password)
  const confirmPassword = useSelector(state => state.registerStore.confirmPassword)
  const errors = useSelector(state => state.registerStore.errors)
  const { success } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatePassword = value => {
    const minLength = value.length >= 8
    const hasUpperCase = /[A-Z]/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    if (!minLength) {
      return "Parol kamida 8 ta belgidan iborat bo'lishi kerak"
    }

    if (!hasUpperCase) {
      return "Parol kamida bitta katta harfni o'z ichiga olishi kerak"
    }

    if (!hasSpecialChar) {
      return "Parol kamida bitta maxsus belgini o'z ichiga olishi kerak"
    }

    return null
  }

  const handlePasswordChange = e => {
    const value = e.target.value

    dispatch(setPassword(value))

    const error = validatePassword(value)

    if (error) {
      dispatch(setError({ field: 'password', message: error }))
    } else {
      dispatch(clearError('password'))
    }

    if (confirmPassword && value !== confirmPassword) {
      dispatch(setError({ field: 'confirmPassword', message: 'Parollar mos kelmaydi' }))
    } else if (confirmPassword) {
      dispatch(clearError('confirmPassword'))
    }
  }

  const handleConfirmPasswordChange = e => {
    const value = e.target.value

    dispatch(setConfirmPassword(value))

    if (value !== password) {
      dispatch(setError({ field: 'confirmPassword', message: 'Parollar mos kelmaydi' }))
    } else {
      dispatch(clearError('confirmPassword'))
    }
  }

  const handleSubmit = () => {
    const passwordError = validatePassword(password)

    if (passwordError) {
      dispatch(setError({ field: 'password', message: passwordError }))

      return
    }

    if (password !== confirmPassword) {
      dispatch(setError({ field: 'confirmPassword', message: 'Parollar mos kelmaydi' }))

      return
    }

    success('Muvaffaqiyatli ro‘yxatdan o‘tdingiz ')

    // Simulate successful registration
    localStorage.setItem('access_token', 'mock_token_' + Date.now())
    dispatch(resetRegister())
    router.push('/dashboards')
  }

  const isValid = password && confirmPassword && !validatePassword(password) && password === confirmPassword

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography variant='h4'>Parol o&#39;rnatish</Typography>
        <Typography>Parolingizni yarating</Typography>
      </div>

      <CustomTextField
        fullWidth
        label='Parol'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        error={!!errors.password}
        helperText={errors.password || 'Kamida 8 ta belgi, katta harf va maxsus belgi'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={e => e.preventDefault()}
              >
                <i className={showPassword ? 'tabler-eye-off' : 'tabler-eye'} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <CustomTextField
        fullWidth
        label='Parolni tasdiqlash'
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onMouseDown={e => e.preventDefault()}
              >
                <i className={showConfirmPassword ? 'tabler-eye-off' : 'tabler-eye'} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <div className='flex gap-3'>
        <Button fullWidth variant='outlined' onClick={() => dispatch(prevStep())}>
          Orqaga
        </Button>
        <Button fullWidth variant='contained' onClick={handleSubmit} disabled={!isValid}>
          Ro&#39;yxatdan o&#39;tish
        </Button>
      </div>
    </div>
  )
}

export default PasswordStep
