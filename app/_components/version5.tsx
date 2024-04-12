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

const HighLightedDate = ({ currentDate }: { currentDate: number | null }) => {
  if (currentDate && currentDate === 12) {
    return (
      <>
        <div className='absolute right-0 h-10 w-1/2 bg-green-500/60' />
        <div className='absolute inline-flex size-10 items-center justify-center rounded-full bg-green-600 text-xs text-gray-800'>
          <p>{currentDate}</p>
        </div>
      </>
    )
  }

  if (currentDate && currentDate === 13) {
    return (
      <>
        <div className='absolute right-0 h-10 w-full bg-green-500/60' />
        <div className='absolute inline-flex size-10 items-center justify-center rounded-full text-xs text-gray-800'>
          <p>{currentDate}</p>
        </div>
      </>
    )
  }

  if (currentDate && currentDate === 14) {
    return (
      <>
        <div className='absolute left-0 h-10 w-1/2 bg-green-500/60' />
        <div className='absolute inline-flex size-10 items-center justify-center rounded-full bg-green-600 text-xs text-gray-800'>
          <p>{currentDate}</p>
        </div>
      </>
    )
  }

  return (
    <div className='absolute inline-flex size-10 items-center justify-center text-xs text-gray-200'>
      <p>{currentDate}</p>
    </div>
  )
}

const DayElement = ({ currentDate, nextDate }: DateRenderProps) => {
  if (nextDate) {
    return <div />
  }

  return (
    <div className='flex size-[100px] items-center justify-center hover:rounded-md hover:bg-slate-800'>
      <div className='relative flex h-10 w-full items-center justify-center text-xs text-gray-800'>
        <HighLightedDate currentDate={currentDate} />
      </div>
    </div>
  )
}

export const Version5 = () => {
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
      <MonthViewContainer className='rounded border border-slate-700 border-r-gray-800 bg-gray-100 p-2 shadow-lg dark:bg-gray-900'>
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
          className='flex h-[100px] items-center justify-center p-2 text-center text-xs text-gray-300'
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
