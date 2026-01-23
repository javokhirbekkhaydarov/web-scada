export const getStatusStyles = theme => ({
  width: 150,
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '2px 10px',
    alignItems: 'flex-start',
    '& .MuiOutlinedInput-input': {
      padding: '0',
      '&::placeholder': {
        color: theme.palette.text.primary,
        opacity: 1
      }
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider
  },
  '& .MuiInputBase-root': {
    paddingRight: '0 !important'
  }
})
