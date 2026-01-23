export const timeFormatter = time => {
  if (!time) return ''

  try {
    let date

    if (typeof time === 'string' && time.includes(':')) {
      const timeParts = time.split(':')

      if (timeParts.length >= 2) {
        const hours = timeParts[0].padStart(2, '0')
        const minutes = timeParts[1].padStart(2, '0')

        return `${hours}:${minutes}`
      }
    }

    if (time instanceof Date) {
      date = time
    } else {
      date = new Date(time)
    }

    if (isNaN(date.getTime())) {
      return ''
    }

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  } catch (error) {
    console.error('Error formatting time:', error)

    return ''
  }
}

export const dateFormatter = date => {
  if (!date) return ''

  try {
    let dateObj

    if (date instanceof Date) {
      dateObj = date
    } else {
      dateObj = new Date(date)
    }

    if (isNaN(dateObj.getTime())) {
      return ''
    }

    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}.${month}.${year}`
  } catch (error) {
    console.error('Error formatting date:', error)

    return ''
  }
}
