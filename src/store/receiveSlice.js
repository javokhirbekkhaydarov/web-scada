import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '@/utils/api'

const initialState = {
  loading: false,
  error: null,
  status: '',
  dateFrom: '',
  dateTo: '',
  dateExecute: '',
  article: '',
  group: '',
  delivery_place: '',
  supplier: '',
  filterOptions: {},
  filterInfo: null,
  data: { results: [], count: 0 }
}

export const fetchFilterOptions = createAsyncThunk('receive/fetchFilterOptions', async (_, { rejectWithValue }) => {
  try {
    const response = await api({
      url: '/receipt/filter-options/',
      method: 'GET'
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchFilterInfo = createAsyncThunk(
  'receive/fetchFilterInfo',
  async (
    {
      status = '',
      dateExecute = '',
      dateFrom = '',
      dateTo = '',
      article = '',
      group = '',
      delivery_place = '',
      supplier = ''
    },
    { rejectWithValue }
  ) => {
    try {
      const params = {}

      if (dateExecute) {
        params.date_execute = dateExecute
      }

      if (status) {
        params.status = status
      }

      if (dateFrom) {
        params.date_from = dateFrom
      }

      if (dateTo) {
        params.date_to = dateTo
      }

      if (article) {
        params.article = article
      }

      if (group) {
        params.group = group
      }

      if (delivery_place) {
        params.delivery_place = delivery_place
      }

      if (supplier) {
        params.supplier = supplier
      }

      const response = await api({
        url: '/receipt/filter-info/',
        method: 'GET',
        params
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchReceiptData = createAsyncThunk(
  'receive/fetchReceiptData',
  async (
    {
      status = '',
      dateFrom = '',
      dateTo = '',
      dateExecute = '',
      article = '',
      group = '',
      delivery_place = '',
      supplier = '',
      pagination = { page: 1, page_size: 10 }
    },
    { rejectWithValue }
  ) => {
    try {
      const params = { ...pagination }

      if (status) {
        params.status = status
      }

      if (dateFrom) {
        params.date_from = dateFrom
      }

      if (dateTo) {
        params.date_to = dateTo
      }

      if (dateExecute) {
        params.date_execute = dateExecute
      }

      if (article) {
        params.article = article
      }

      if (group) {
        params.group = group
      }

      if (delivery_place) {
        params.delivery_place = delivery_place
      }

      if (supplier) {
        params.supplier = supplier
      }

      //   ! new api
      const response = await api({
        url: '/receipt/get-receipts/',
        method: 'GET',
        params
      })

      //   ! old api
      // const response = await api({
      //   url: '/receipt/',
      //   method: 'GET',
      //   params
      // })

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const receiveSlice = createSlice({
  name: 'receiveStore',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setDateRange: (state, action) => {
      state.dateFrom = action.payload.dateFrom
      state.dateTo = action.payload.dateTo
    },
    setDateExecute: (state, action) => {
      state.dateExecute = action.payload
    },
    setArticle: (state, action) => {
      state.article = action.payload
    },
    setGroup: (state, action) => {
      state.group = action.payload
    },
    setDeliveryPlace: (state, action) => {
      state.delivery_place = action.payload
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload
    },
    clearFilters: state => {
      state.status = ''
      state.dateFrom = ''
      state.dateTo = ''
      state.dateExecute = ''
      state.article = ''
      state.group = ''
      state.delivery_place = ''
      state.supplier = ''
    },
    clearNonDateFilters: state => {
      state.status = ''
      state.dateExecute = ''
      state.article = ''
      state.group = ''
      state.delivery_place = ''
      state.supplier = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReceiptData.pending, state => {
        state.loading = true
      })
      .addCase(fetchReceiptData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchReceiptData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.filterOptions = action.payload
      })
      .addCase(fetchFilterInfo.fulfilled, (state, action) => {
        state.filterInfo = action.payload
        state.error = null
      })
      .addCase(fetchFilterInfo.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const {
  setStatus,
  setDateRange,
  setDateExecute,
  setArticle,
  setGroup,
  setDeliveryPlace,
  setSupplier,
  clearFilters,
  clearNonDateFilters
} = receiveSlice.actions
export default receiveSlice.reducer
