import { useState } from 'react'

export const useNumberInput = (initialValue = 1, min = 1, max = 100) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = e => {
    const inputValue = e.target.value

    if (/^\d+$/.test(inputValue)) {
      const numValue = Number(inputValue)

      if (numValue >= min && numValue <= max) {
        setValue(numValue)
      } else if (inputValue === '') {
        setValue('')
      }
    }
  }

  const handleBlur = () => {
    if (value === '' || value < min) {
      setValue(min)
    } else if (value > max) {
      setValue(max)
    }
  }

  const handleKeyDown = e => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']

    if (
      ['e', 'E', '+', '-', '.', ','].includes(e.key) ||
      (e.key === 'ArrowUp' && value >= max) ||
      (e.key === 'ArrowDown' && value <= min) ||
      (!allowedKeys.includes(e.key) && isNaN(e.key))
    ) {
      e.preventDefault()
    }
  }

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown
  }
}
