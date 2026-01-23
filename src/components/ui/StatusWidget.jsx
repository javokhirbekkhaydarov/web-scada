import { filterOptions } from '@/shared/filter/status/filterOptions'
import { proxyFilterOptions } from '@/shared/filter/status/proxyFilterOptions'
import { cardOptions } from '@/shared/filter/status/cardOptions'
import { receiveOptions } from '@/shared/filter/status/receiveOptions'

const StatusWidget = ({ type, belongTo }) => {
  let options

  switch (belongTo) {
    case 'proxy':
      options = proxyFilterOptions
      break
    case 'card':
      options = cardOptions
      break
    case 'receive':
      options = receiveOptions
      break
    default:
      options = filterOptions
  }

  const status = options.find(option => option.type === type)
  const label = status ? status.label : type
  const color = status ? status.color : '#808390'
  const bg = status ? status.bg : '#80839029'

  return (
    <div className='flex rounded-[4px] h-6 justify-center items-center px-3' style={{ backgroundColor: bg, color }}>
      <p className='text-[13px] font-medium leading-none'>{label}</p>
    </div>
  )
}

export default StatusWidget
