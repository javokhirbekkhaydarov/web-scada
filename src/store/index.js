import { configureStore } from '@reduxjs/toolkit'


import { receiveSlice } from './receiveSlice'
import { registerSlice } from '@/store/registerSlice.js'


export const store = configureStore({
  reducer: {
    receiveStore: receiveSlice.reducer,
    registerStore: registerSlice.reducer,
  }
})
