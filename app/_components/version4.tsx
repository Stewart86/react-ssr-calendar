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
import { cn } from '@/lib/utils/cn'

const data: Record<string, string[]> = {
  '2024-04-01': ['April Fool Day'],
  '2024-04-02': ['Event 3', 'Event 4', 'Event 5'],
  '2024-04-13': ['Event 4'],
  '2024-04-20': ['Snowboarding Trip'],
  '2024-04-22': ['Event 5'],
  '2024-05-01': ['May Day'],
  '2024-05-02': ['Event 3', 'Event 4', 'Event 5'],
  '2024-05-13': ['Event 4'],
  '2024-05-20': ['Snowboarding Trip'],
  '2024-05-22': ['Event 5'],
  '2024-06-02': ['Event 3', 'Event 4', 'Event 5'],
  '2024-06-13': ['Event 4'],
  '2024-06-20': ['Snowboarding Trip'],
  '2024-06-22': ['Event 5'],
}

const DayElement = ({ currentDate, date, nextDate }: DateRenderProps) => {
  if (nextDate) {
    return <div />
  }

  if (currentDate && dayjs(date).isSame(dayjs(), 'day')) {
    return (
      <div className='flex size-[150px] justify-start bg-gray-300 p-1 text-center text-sm text-gray-700 hover:rounded-md hover:bg-slate-800'>
        <p className='w-full text-right text-xs'>{currentDate}</p>
      </div>
    )
  }

  if (dayjs(date).weekday() === 0 || dayjs(date).weekday() === 6) {
    return (
      <div className='flex size-[150px] flex-col items-start justify-start border border-gray-800 bg-gray-700 p-1 text-center text-sm hover:rounded-md hover:bg-slate-800'>
        <p className='w-full text-right text-xs'>{currentDate}</p>
        {data[dayjs(date).format('YYYY-MM-DD')]?.map((event: string, i) => (
          <p
            key={i}
            className={cn(
              'my-0.5 w-full rounded px-2 text-left text-xs',
              event === 'April Fool Day' ? 'bg-green-800' : 'bg-purple-800',
            )}
          >
            {event}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className='flex size-[150px] flex-col items-start justify-start border border-gray-800 p-1 text-center text-sm hover:rounded-md hover:bg-slate-800'>
      <p className='w-full text-right text-xs'>{currentDate}</p>
      {data[dayjs(date).format('YYYY-MM-DD')]?.map((event: string, i) => (
        <p
          key={i}
          className={cn(
            'my-0.5 w-full rounded px-2 text-left text-xs',
            event === 'April Fool Day' ? 'bg-green-800' : 'bg-purple-800',
          )}
        >
          {event}
        </p>
      ))}
    </div>
  )
}

export const Version4 = () => {
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
  )
}
