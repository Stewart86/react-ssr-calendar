import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

import { DateCellContainer, MonthView } from '@/components'
import { cn } from '@/lib/utils/cn'

dayjs.extend(weekday)

export const weekIndexToString = (
  weekIndex: number,
  startOfWeek: 'monday' | 'sunday',
  format = 'ddd',
) => {
  if (startOfWeek === 'monday') {
    return dayjs()
      .weekday(weekIndex + 1)
      .format(format)
  }
  return dayjs().weekday(weekIndex).format(format)
}

export const Version1 = () => {
  const date = new Date(2024, 3, 1)

  return (
    <div className='grid grid-cols-7 rounded border border-gray-600 bg-gray-950'>
      <div className='col-span-7 flex flex-row items-center justify-center border-b border-b-slate-800 p-2'>
        <div>{dayjs(date).format('MMM YYYY')}</div>
      </div>
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className='mt-2 p-1 text-center text-xs text-slate-300'>
            {weekIndexToString(i, 'sunday', 'dd')}
          </div>
        ))}
      </>
      <MonthView>
        {({ cellIndex }) => (
          <DateCellContainer key={cellIndex} date={date} cellIndex={cellIndex}>
            {({ currentDate, isToday }) =>
              currentDate && (
                <div
                  className={cn(
                    'mt-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-center text-sm text-slate-300',
                    isToday && 'bg-gray-300 text-slate-900',
                  )}
                >
                  {currentDate}
                </div>
              )
            }
          </DateCellContainer>
        )}
      </MonthView>
    </div>
  )
}
