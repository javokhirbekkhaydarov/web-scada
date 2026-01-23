import { useMemo } from 'react'

import dayjs from 'dayjs'

export const FILTER_CONFIGS = {
  buyout: {
    storeSlice: 'buyOutStore',
    filterOptionsSlice: 'buyOutStore',
    actions: {
      fetchData: 'fetchBuyoutData',
      fetchFilterOptions: 'fetchFilterOptions',
      setDateRange: 'setDateRange',
      setDateExecute: 'setDateExecute',
      setStatus: 'setStatus',
      setArticle: 'setArticle',
      setGroup: 'setGroup',
      setDeliveryPlace: 'setDeliveryPlace',
      setSupplier: 'setSupplier',
      clearFilters: 'clearFilters',
      clearNonDateFilters: 'clearNonDateFilters'
    },
    filterFields: ['status', 'dateFrom', 'dateTo', 'dateExecute', 'article', 'group', 'delivery_place', 'supplier'],
    endpoints: {
      filterOptions: '/buyout-task/filter-options/',
      articles: '/buyout/find-article/search=1',
      groups: '/buyout-group/'
    },
    labels: {
      dateRange: 'Выберите диапазон дат',
      dateExecute: 'Дата выполнения',
      status: 'Статус',
      article: 'Артикул',
      group: 'Группа',
      supplier: 'Юрлицо',
      clear: 'Сбросить'
    },
    features: {
      hasDateExecute: true,
      hasPVZ: true
    }
  },
  receive: {
    storeSlice: 'receiveStore',
    filterOptionsSlice: 'receiveStore',
    actions: {
      fetchData: 'fetchReceiptData',
      fetchFilterOptions: 'fetchFilterOptions',
      setDateRange: 'setDateRange',
      setDateExecute: 'setDateExecute',
      setStatus: 'setStatus',
      setArticle: 'setArticle',
      setGroup: 'setGroup',
      setDeliveryPlace: 'setDeliveryPlace',
      setSupplier: 'setSupplier',
      clearFilters: 'clearFilters',
      clearNonDateFilters: 'clearNonDateFilters'
    },
    filterFields: ['status', 'dateFrom', 'dateTo', 'dateExecute', 'article', 'group', 'delivery_place', 'supplier'],
    endpoints: {
      filterOptions: '/receipt/filter-options/',
      articles: '/receive/find-article/',
      groups: '/receive-group/'
    },
    labels: {
      dateRange: 'Выберите диапазон дат получения',
      dateExecute: 'Дата получения',
      status: 'Статус получения',
      article: 'Артикул товара',
      group: 'Группа получения',
      supplier: 'Поставщик',
      clear: 'Очистить'
    },
    features: {
      hasDateExecute: true,
      hasPVZ: false
    }
  }
}

// Helper function to get filter fields dynamically
export const getFilterFields = config => {
  return config.filterFields || []
}

// Helper function to get default date range
export const getDefaultDateRange = config => {
  const today = dayjs().toDate()

  return [today, today]
}

// Helper function to format date range for API
export const formatDateRange = dateRange => {
  const [start, end] = dateRange

  return {
    dateFrom: dayjs(start).format('DD.MM.YYYY'),
    dateTo: dayjs(end).format('DD.MM.YYYY')
  }
}

export const useFilterConfig = filterType => {
  return useMemo(() => {
    const config = FILTER_CONFIGS[filterType]

    if (!config) {
      throw new Error(`Filter config for type "${filterType}" not found`)
    }

    return config
  }, [filterType])
}
