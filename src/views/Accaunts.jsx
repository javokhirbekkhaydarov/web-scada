'use client'

import Icon from '../components/icon/Icon'

import './styles.css'


const DataCard = () => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-8'>
        <span className='text-2xl font-medium'>Аккаунты</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
        </div>
      </div>
    </div>
  )
}

export default DataCard
