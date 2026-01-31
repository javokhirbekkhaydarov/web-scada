import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField.jsx'
import { setPhone, nextStep, setCountdown, setError, clearError, prevStep } from '@/store/registerSlice.js'

const VALID_CODES = ['90', '99', '95', '66', '71', '73', '50', '93', '94', '88']

const PhoneStep = () => {
  const dispatch = useDispatch()
  const phone = useSelector((state) => state.registerStore.phone)
  const errors = useSelector((state) => state.registerStore.errors)
  const [codeSent, setCodeSent] = useState(false)

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '')

    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
    if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5)}`

return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`
  }

  const validatePhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '')

    if (numbers.length !== 9) return false

    const code = numbers.slice(0, 2)


return VALID_CODES.includes(code)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9)
    const formatted = formatPhoneNumber(value)

    dispatch(setPhone(formatted))

    if (value.length > 0 && value.length < 9) {
      dispatch(setError({ field: 'phone', message: 'Telefon raqamni to\'liq kiriting' }))
    } else if (value.length === 9 && !validatePhoneNumber(value)) {
      dispatch(setError({ field: 'phone', message: 'Noto\'g\'ri operator kodi' }))
    } else {
      dispatch(clearError('phone'))
    }
  }

  const handleSendCode = () => {
    if (validatePhoneNumber(phone)) {
      dispatch(clearError('phone'))
      dispatch(setCountdown(300)) // 5 minutes
      setCodeSent(true)
      dispatch(nextStep())
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography variant='h4'>Telefon raqam</Typography>
        <Typography>Telefon raqamingizni kiriting</Typography>
      </div>

      <CustomTextField
        autoFocus
        fullWidth
        label='Telefon raqam'
        value={phone}
        onChange={handlePhoneChange}
        placeholder='90 123 45 67'
        error={!!errors.phone}
        helperText={errors.phone || 'Format: 90 123 45 67'}
        InputProps={{
          startAdornment: <span style={{ marginRight: 8 }}>+998</span>
        }}
      />

      <div className='flex gap-3'>
        <Button
          fullWidth
          variant='outlined'
          onClick={() => dispatch(prevStep())}
        >
          Orqaga
        </Button>
        <Button
          fullWidth
          variant='contained'
          onClick={handleSendCode}
          disabled={!validatePhoneNumber(phone)}
        >
          Kodni olish
        </Button>
      </div>
    </div>
  )
}

export default PhoneStep
