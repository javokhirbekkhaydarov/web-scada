import MuiDialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import Icon from '@components/icon/Icon'

export const LogOutConfirmation = ({ title, isOpen, onClose , onConfirm}) => {

  return (
    <MuiDialog aria-labelledby='dialog-title' open={isOpen} onClose={() => onClose()}>
      <div className='p-6 max-w-[400px] public-sans'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className={'font-normal'}>{title}</h4>
          <span className='text-main-500 hover:cursor-pointer' onClick={() => onClose()}>
            <Icon type='close' width='24px' />
          </span>
        </div>

        <div className='flex items-center justify-between gap-4 mt-4'>
          <Button fullWidth variant='outlined' color='secondary' onClick={() => onClose()}>
            Нет
          </Button>
          <Button fullWidth variant='contained' color='primary' onClick={() => onConfirm()}>
            Да
          </Button>
        </div>
      </div>
    </MuiDialog>
  )
}
