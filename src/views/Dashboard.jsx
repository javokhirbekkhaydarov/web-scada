'use client'

import Icon from '@/components/icon/Icon'

const Dashboard = () => {

  return (
    <div className='flex flex-col gap-6'>
      {/* <div className='text-[#FF9F43] text-sm flex items-center gap-2 px-2 py-5 bg-[#FF9F4314] rounded-lg'>*/}
      {/*  <i className='tabler-info-square-rounded-filled'></i>*/}
      {/*  <span className={'text-sm'}>Хотим объявить об отличной новости. Завтра все цены будут увеличены на 30%</span>*/}
      {/*</div>*/}

      <div className='flex items-center gap-2'>
        <span className='text-2xl font-medium'>Дэшборд</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
        </div>
      </div>


    </div>
  )
}

export default Dashboard
