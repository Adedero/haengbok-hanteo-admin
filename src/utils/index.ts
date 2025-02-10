export function daysAgo(dateInput: string | Date): string {
  const now: Date = new Date()
  const inputDate: Date = new Date(dateInput)

  if (isNaN(inputDate.getTime())) {
    console.warn('Invalid date input')
    return dateInput.toString()
  }

  const diff: number = inputDate.getTime() - now.getTime() // Difference in milliseconds
  const diffAbs: number = Math.abs(diff)

  const timeUnits = [
    { unit: 'year', seconds: 365 * 24 * 60 * 60 },
    { unit: 'month', seconds: 30 * 24 * 60 * 60 },
    { unit: 'day', seconds: 24 * 60 * 60 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ]

  for (const { unit, seconds } of timeUnits) {
    const interval: number = Math.floor(diffAbs / (seconds * 1000))
    if (interval >= 1) {
      return diff < 0
        ? `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
        : `in ${interval} ${unit}${interval > 1 ? 's' : ''}`
    }
  }

  return 'just now'
}

export const formatDate = (value: string | Date, format: string) => {
  const date = new Date(value)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const shortMonths = months.map((month) => month.slice(0, 3))

  // Generate the 12-hour and 24-hour formatted times
  const hours24 = String(date.getHours()).padStart(2, '0')
  const hours12 = String(date.getHours() % 12 || 12).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const ampm = date.getHours() < 12 ? 'AM' : 'PM'

  const replacements: { [key: string]: string } = {
    dd: String(date.getDate()).padStart(2, '0'),
    mm: String(date.getMonth() + 1).padStart(2, '0'),
    MM: shortMonths[date.getMonth()],
    MMMM: months[date.getMonth()],
    yy: String(date.getFullYear()).slice(-2), // Last two digits of the year
    yyyy: String(date.getFullYear()), // Full year as 4 digits
    hh: hours12, // 12-hour format
    min: minutes, // Minutes
    ss: seconds, // Seconds
    T: `${hours12}:${minutes} ${ampm}`, // Full 12-hour time with am/pm
    TT: `${hours24}:${minutes}`, // Full 24-hour time
  }

  // Replace all tokens in the format string
  return format.replace(/dd|MMMM|MM|mm|yyyy|yy|hh|min|ss|TT|T/g, (match) => {
    return replacements[match] || match
  })
}
