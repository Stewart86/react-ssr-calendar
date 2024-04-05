import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

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

export type WeekdayHeaderProps = {
  startOfWeek: 'monday' | 'sunday'
  className?: string
  format?: string
}

export const WeekdayHeader = ({
  startOfWeek,
  className,
  format = 'ddd',
}: WeekdayHeaderProps) => (
  <>
    {Array.from({ length: 7 }, (_, i) => (
      <div key={i} className={cn(className)}>
        {weekIndexToString(i, startOfWeek, format)}
      </div>
    ))}
  </>
)
