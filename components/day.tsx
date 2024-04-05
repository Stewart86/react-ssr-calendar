import { type ReactNode } from 'react'

/**
 * A component container for date within month's view. Provides a render prop with the current date,
 * previous date, and next date.
 *
 * @param children - A render prop with the date object also current month, previous month, next
 *                 month date number and isToday flag.
 * @param startOfWeek - The start of the week.
 * @param cellIndex - The index of the cell.
 * @param date - The date of the cell.
 * @returns A month view calendar component.
 *
 * @example
 * ```tsx
 * <DateCellContainer
 *  startOfWeek='monday'
 *  cellIndex={0}
 *  date={new Date()}
 *  >
 *    {({ date, currentDate, previousDate, nextDate }) => (
 *      <DayElement
 *        date={date}
 *        currentDate={currentDate}
 *        previousDate={previousDate}
 *        nextDate={nextDate}
 *        />
 *    )}
 * </DateCellContainer>
 *  ```
 */
export const DateCellContainer = ({
  date: dateRef,
  startOfWeek = 'sunday',
  cellIndex,
  children,
}: {
  children: (dateRenderProps: {
    date: Date
    isToday: boolean
    currentDate: number | null
    previousDate?: number | null
    nextDate?: number | null
  }) => ReactNode
  cellIndex: number
  date: Date
  startOfWeek?: 'monday' | 'sunday'
}) => {
  const year = dateRef.getFullYear()
  const month = dateRef.getMonth()
  const previousMonth = month - 1
  const nextMonth = month + 1
  const weekdayOfFirstDay = _getWeekdayOfFirstDay(year, month)
  const numberOfPreviousDays =
    startOfWeek === 'monday' ? weekdayOfFirstDay - 1 : weekdayOfFirstDay
  const numberOfDaysInMonth = _getNumberOfDaysInMonth(year, month)
  const numberOfDaysInPreviousMonth = _getNumberOfDaysInMonth(
    year,
    previousMonth,
  )

  let currentDate = null
  let previousDate = null
  let nextDate = null
  if (startOfWeek === 'monday') {
    if (
      numberOfPreviousDays <= cellIndex &&
      cellIndex < numberOfDaysInMonth + numberOfPreviousDays
    ) {
      currentDate = cellIndex - weekdayOfFirstDay + 2
    }

    if (cellIndex < weekdayOfFirstDay) {
      previousDate =
        numberOfDaysInPreviousMonth - numberOfPreviousDays + cellIndex + 2
    }
    if (cellIndex >= numberOfDaysInMonth + numberOfPreviousDays) {
      nextDate = cellIndex - numberOfDaysInMonth - numberOfPreviousDays + 2
    }
  }

  if (startOfWeek === 'sunday') {
    if (
      numberOfPreviousDays <= cellIndex &&
      cellIndex < numberOfDaysInMonth + numberOfPreviousDays
    ) {
      currentDate = cellIndex - weekdayOfFirstDay + 1
    }

    if (cellIndex < weekdayOfFirstDay) {
      previousDate =
        numberOfDaysInPreviousMonth - numberOfPreviousDays + cellIndex + 1
    }
    if (cellIndex >= numberOfDaysInMonth + numberOfPreviousDays) {
      nextDate = cellIndex - numberOfDaysInMonth - numberOfPreviousDays + 1
    }
  }

  const dateNum = currentDate ?? previousDate ?? nextDate ?? 0
  const date = new Date(
    year,
    nextDate ? nextMonth : previousDate ? previousMonth : month,
    dateNum,
  )

  const isToday = new Date().toDateString() === date.toDateString()
  return (
    children({ date, currentDate, previousDate, nextDate, isToday }) ?? <div />
  )
}

const _getWeekdayOfFirstDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay()

const _getNumberOfDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()
