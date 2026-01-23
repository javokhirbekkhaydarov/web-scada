import MuiDialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import Icon from '@components/icon/Icon'

const ConfirmDelete = ({ isOpen, onClose, onConfirm, isShowDelete }) => {
  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='delete-dialog'
      PaperProps={{
        style: { overflow: 'visible' }
      }}
    >
      <div className='p-6 max-w-[400px] relative'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center px-2 py-1 gap-3 rounded-lg bg-[#FF4C5114]'>
            <Icon type='dialog_main_close' />
            <p className='text-left text-[18px] text-light'>Вы уверены, что хотите удалить?</p>
          </div>
          {!isShowDelete && (
            <span
              className=' close_dialog text-main-500 cursor-pointer absolute top-[-12px] right-[-12px] w-[32px] h-[32px] rounded flex items-center justify-center'
              onClick={onClose}
            >
              <Icon type='close' width='24px' />
            </span>
          )}
        </div>
        <div className='flex items-center justify-between gap-4 mt-4'>
          <Button fullWidth variant='outlined' color='secondary' onClick={onClose}>
            Нет
          </Button>
          <Button fullWidth variant='contained' color='primary' onClick={onConfirm}>
            Да
          </Button>
        </div>
      </div>
    </MuiDialog>
  )
}

export default ConfirmDelete
