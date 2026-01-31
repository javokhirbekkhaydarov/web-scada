import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 1, // 1: INN, 2: Phone, 3: OTP, 4: Password
  inn: '',
  phone: '',
  otp: '',
  password: '',
  confirmPassword: '',
  countdown: 0,
  errors: {}
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setInn: (state, action) => {
      state.inn = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setOtp: (state, action) => {
      state.otp = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload
    },
    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown -= 1
      }
    },
    setError: (state, action) => {
      state.errors[action.payload.field] = action.payload.message
    },
    clearError: (state, action) => {
      delete state.errors[action.payload]
    },
    clearErrors: (state) => {
      state.errors = {}
    },
    resetRegister: (state) => {
      return initialState
    },
    nextStep: (state) => {
      if (state.step < 4) {
        state.step += 1
      }
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1
      }
    }
  }
})

export const {
  setStep,
  setInn,
  setPhone,
  setOtp,
  setPassword,
  setConfirmPassword,
  setCountdown,
  decrementCountdown,
  setError,
  clearError,
  clearErrors,
  resetRegister,
  nextStep,
  prevStep
} = registerSlice.actions

export default registerSlice.reducer
