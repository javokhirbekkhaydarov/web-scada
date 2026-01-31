
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField.jsx'
import { setInn, nextStep, setError, clearError } from '@/store/registerSlice.js'

const InnStep = () => {
  const dispatch = useDispatch()
  const inn = useSelector((state) => state.registerStore.inn)
  const errors = useSelector((state) => state.registerStore.errors)

  const validateInn = (value) => {
    const innRegex = /^\d{15}$/


return innRegex.test(value)
  }

  const handleInnChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 15)

    dispatch(setInn(value))

    if (value && !validateInn(value)) {
      dispatch(setError({ field: 'inn', message: '15 xonali raqam kiriting' }))
    } else {
      dispatch(clearError('inn'))
    }
  }

  const handleNext = () => {
    if (validateInn(inn)) {
      dispatch(clearError('inn'))
      dispatch(nextStep())
    } else {
      dispatch(setError({ field: 'inn', message: '15 xonali raqam kiriting' }))
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography variant='h4'>Ro&#39;yxatdan o&#39;tish</Typography>
        <Typography>INN kodingizni kiriting</Typography>
      </div>

      <CustomTextField
        autoFocus
        fullWidth
        label='INN kodni kiriting'
        value={inn}
        onChange={handleInnChange}
        placeholder='15 xonali son'
        error={!!errors.inn}
        helperText={errors.inn}
      />

      <Button
        fullWidth
        variant='contained'
        onClick={handleNext}
        disabled={!validateInn(inn)}
      >
        Keyingisi
      </Button>
    </div>
  )
}

export default InnStep
