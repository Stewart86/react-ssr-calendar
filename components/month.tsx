'use client'

import dayjs from 'dayjs'

import { cn } from '@/lib/utils/cn'

export type MonthHeaderProps = {
  date?: Date
  className?: string
  format?: string
  onPreviousMonth?: () => void
  onNextMonth?: () => void
}

export const MonthHeader = ({
  date = new Date(),
  className,
  format,
  onPreviousMonth,
  onNextMonth,
}: MonthHeaderProps) => {
  const handleOnPreviousMonth = () => {
    if (onPreviousMonth) {
      onPreviousMonth()
    }
  }

  const handleOnNextMonth = () => {
    if (onNextMonth) {
      onNextMonth()
    }
  }
  return (
    <div
      className={cn(
        'col-span-7 flex flex-row items-center',
        onPreviousMonth && onNextMonth ? 'justify-between' : 'justify-center',
        className,
      )}
    >
      {onPreviousMonth && (
        <button onClick={handleOnPreviousMonth} className='size-8'>
          {'<'}
        </button>
      )}
      <div>{dayjs(date).format(format)}</div>
      {onNextMonth && (
        <button onClick={handleOnNextMonth} className='size-8'>
          {'>'}
        </button>
      )}
    </div>
  )
}
