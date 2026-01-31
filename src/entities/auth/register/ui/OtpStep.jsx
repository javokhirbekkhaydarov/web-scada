import { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import { setOtp, nextStep, decrementCountdown, setCountdown, prevStep } from '@/store/registerSlice.js'


const OtpStep = () => {
  const dispatch = useDispatch()
  const otp = useSelector((state) => state.registerStore.otp)
  const countdown = useSelector((state) => state.registerStore.countdown)
  const [otpValues, setOtpValues] = useState(['', '', '', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        dispatch(decrementCountdown())
      }, 1000)


return () => clearInterval(timer)
    }
  }, [countdown, dispatch])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60


return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtpValues = [...otpValues]

    newOtpValues[index] = value.slice(-1)
    setOtpValues(newOtpValues)

    const otpString = newOtpValues.join('')

    dispatch(setOtp(otpString))

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    const newOtpValues = pastedData.split('').concat(['', '', '', '']).slice(0, 4)

    setOtpValues(newOtpValues)
    dispatch(setOtp(pastedData))

    const nextEmptyIndex = newOtpValues.findIndex(val => !val)

    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    }
  }

  const handleResendCode = () => {
    dispatch(setCountdown(300))
    setOtpValues(['', '', '', ''])
    dispatch(setOtp(''))
    inputRefs.current[0]?.focus()
  }

  const handleVerify = () => {
    if (otp.length === 4) {
      dispatch(nextStep())
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography variant='h4'>Tasdiqlash kodi</Typography>
        <Typography>
          +998 {useSelector((state) => state.registerStore.phone)} raqamiga yuborilgan kodni kiriting
        </Typography>
      </div>


      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {otpValues.map((value, index) => (
          <TextField
            variant="outlined"
            size='medium'
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                fontSize: '24px',
              }
            }}
            sx={{
              '& input': {
                textAlign: 'center'
              }
            }}
          />
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        {countdown > 0 ? (
          <Typography variant='body2' color='text.secondary'>
            {formatTime(countdown)}
          </Typography>
        ) : (
          <Button variant='text' onClick={handleResendCode}>
            Kodni qayta yuborish
          </Button>
        )}
      </Box>

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
          onClick={handleVerify}
          disabled={otp.length !== 4}
        >
          Tasdiqlash
        </Button>
      </div>
    </div>
  )
}

export default OtpStep
