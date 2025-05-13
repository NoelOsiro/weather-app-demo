export function formatDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date)
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th"
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export function formatFullDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`
}
