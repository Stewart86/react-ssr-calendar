'use client'

import { useState } from 'react'

import dayjs from 'dayjs'

import {
  DateCellContainer,
  MonthHeader,
  MonthView,
  MonthViewContainer,
  WeekdayHeader,
  type DateRenderProps,
} from '@/components'

const DayElement = ({
  currentDate,
  date,
  previousDate,
  nextDate,
}: DateRenderProps) => {
  if (currentDate && dayjs(date).isSame(dayjs(), 'day')) {
    return (
      <div className='mt-2 inline-flex size-8 items-center justify-center rounded-md bg-gray-300 text-center text-sm text-slate-900'>
        {currentDate}
      </div>
    )
  }
  if (previousDate) {
    return (
      <div className='mt-2 inline-flex size-8 items-center justify-center text-center text-sm text-gray-500'>
        {previousDate}
      </div>
    )
  }

  if (nextDate) {
    return (
      <div className='mt-2 inline-flex size-8 items-center justify-center text-center text-sm text-gray-500'>
        {nextDate}
      </div>
    )
  }

  return (
    <div className='mt-2 inline-flex size-8 cursor-pointer items-center justify-center text-center text-sm hover:rounded-md hover:bg-slate-800'>
      {currentDate}
    </div>
  )
}

export const Version2 = () => {
  const [date, setDate] = useState(
    dayjs().set('month', 3).set('day', 1).toDate(),
  )

  const onPreviousMonth = () => {
    setDate(dayjs(date).subtract(1, 'month').toDate())
  }

  const onNextMonth = () => {
    setDate(dayjs(date).add(1, 'month').toDate())
  }

  return (
    <div className='flex flex-row'>
      <MonthViewContainer
        key={0}
        className='rounded-l border border-slate-700 border-r-gray-800 bg-gray-100 p-2 shadow-lg dark:bg-gray-900'
      >
        <MonthHeader
          date={dayjs(date).subtract(1, 'month').toDate()}
          format='MMMM YYYY'
          onNextMonth={onNextMonth}
          onPreviousMonth={onPreviousMonth}
          className='mb-2 px-2 text-center'
        />
        <WeekdayHeader
          startOfWeek='sunday'
          format='dd'
          className='p-2 text-center text-xs text-gray-300'
        />
        <MonthView>
          {({ cellIndex }) => (
            <DateCellContainer
              key={cellIndex}
              date={dayjs(date).subtract(1, 'month').toDate()}
              startOfWeek='sunday'
              cellIndex={cellIndex}
            >
              {(props) => <DayElement {...props} />}
            </DateCellContainer>
          )}
        </MonthView>
      </MonthViewContainer>
      <MonthViewContainer
        key={1}
        className='rounded-r border border-slate-700 border-r-gray-800 bg-gray-100 p-2 shadow-lg dark:bg-gray-900'
      >
        <MonthHeader
          date={date}
          format='MMMM YYYY'
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
          className='mb-2 px-2 text-center'
        />
        <WeekdayHeader
          startOfWeek='sunday'
          format='dd'
          className='p-2 text-center text-xs text-gray-300'
        />
        <MonthView>
          {({ cellIndex }) => (
            <DateCellContainer
              key={cellIndex}
              date={date}
              startOfWeek='sunday'
              cellIndex={cellIndex}
            >
              {(props) => <DayElement {...props} />}
            </DateCellContainer>
          )}
        </MonthView>
      </MonthViewContainer>
    </div>
  )
}
