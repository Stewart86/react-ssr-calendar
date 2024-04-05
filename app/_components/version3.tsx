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

export const Version3 = () => {
  const [date, setDate] = useState(dayjs().set('month', 0).toDate())

  const onPreviousMonth = () => {
    setDate(dayjs(date).subtract(1, 'year').toDate())
  }

  const onNextMonth = () => {
    setDate(dayjs(date).add(1, 'year').toDate())
  }

  return (
    <div className='grid grid-cols-4 rounded-lg border-gray-800 bg-gray-900'>
      <div className='col-span-4 flex flex-row items-center justify-between p-4'>
        <button onClick={onPreviousMonth} className='size-8'>
          {'<'}
        </button>
        {dayjs(date).format('YYYY')}
        <button onClick={onNextMonth} className='size-8'>
          {'>'}
        </button>
      </div>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className='flex flex-row'>
          <MonthViewContainer className='p-2'>
            <MonthHeader
              date={dayjs(date).set('month', index).toDate()}
              format='MMMM'
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
                  date={dayjs(date).set('month', index).toDate()}
                  startOfWeek='sunday'
                  cellIndex={cellIndex}
                >
                  {({ date, currentDate, previousDate, nextDate }) => (
                    <DayElement
                      date={date}
                      currentDate={currentDate}
                      previousDate={previousDate}
                      nextDate={nextDate}
                    />
                  )}
                </DateCellContainer>
              )}
            </MonthView>
          </MonthViewContainer>
        </div>
      ))}
    </div>
  )
}
