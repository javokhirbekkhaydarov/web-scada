import { configureStore } from '@reduxjs/toolkit'


import { receiveSlice } from './receiveSlice'


export const store = configureStore({
  reducer: {

    receiveStore: receiveSlice.reducer,

  }
})
