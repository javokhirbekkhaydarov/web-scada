import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

const ConfirmStart = ({ isOpen, onClose, onConfirm }) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Начать задачу?</DialogTitle>
    <DialogContent>Вы уверены, что хотите начать выполнение задачи прямо сейчас?</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Отмена</Button>
      <Button onClick={onConfirm} variant='contained' color='primary'>
        Начать
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmStart
