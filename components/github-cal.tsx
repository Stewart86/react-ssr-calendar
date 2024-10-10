import clsx from 'clsx'
import dayjs from 'dayjs'

const _addOneMoreWeek = (j: number) => {
  const thisMonth = dayjs()
    .subtract(51, 'week')
    .subtract(7, 'day')
    .add(j, 'month')

  const start = thisMonth.startOf('month').day()
  const end = thisMonth.endOf('month').day()
  const days = thisMonth.daysInMonth()
  const total = start + days + (6 - end)
  return total > 35 ? 1 : 0
}

const Day = ({
  today,
  col,
  row,
  data,
}: {
  today: Date
  col: number
  row: number
  data: Record<string, { intensity: number; info: string }>
}) => {
  const djsToday = dayjs(today)
  const todayWeekday = djsToday.day()
  const date = djsToday
    .subtract(51 - col, 'week')
    .subtract(7 - row + todayWeekday, 'day')

  if (date.isAfter(djsToday)) {
    return <div className='m-[1px] size-[10px] rounded bg-transparent' />
  }

  const intensity = data[date.format('YYYY-MM-DD')]?.intensity ?? 0

  return (
    <div
      data-date={date.format('YYYY-MM-DD')}
      className={clsx(
        'group relative m-[1px] size-[10px] rounded-sm transition-colors duration-500',
        'hover:border dark:hover:border-blue-100 dark:hover:bg-blue-200',
        'hover:border-blue-900 hover:bg-blue-800',
        {
          'bg-slate-300 dark:bg-gray-800': intensity === 0,
          'bg-blue-200 dark:border dark:border-blue-600 dark:bg-blue-700':
            intensity === 1,
          'bg-blue-300 dark:border dark:border-blue-500 dark:bg-blue-600':
            intensity === 2,
          'bg-blue-400 dark:border dark:border-blue-500 dark:bg-blue-500':
            intensity === 3,
          'bg-blue-500 dark:bg-blue-400': intensity === 4,
          'bg-blue-600 dark:bg-blue-300': intensity === 5,
        },
      )}
    >
      <span
        className={clsx(
          'absolute -top-2 left-1/2 z-50 mx-auto hidden -translate-x-1/2 -translate-y-full',
          'text-nowrap rounded-md border border-gray-300 bg-gray-200 text-gray-800',
          'dark:bg-gray-600 dark:text-gray-200',
          'px-2 py-1 text-xs opacity-0 transition-opacity duration-500',
          'group-hover:block group-hover:opacity-100',
        )}
      >
        {data[date.format('YYYY-MM-DD')]?.info}
      </span>
    </div>
  )
}

const Header = ({ today }: { today: Date }) => {
  const djsToday = dayjs(today)
  const date = djsToday.subtract(52, 'week')
  return (
    <tr className='*:justify-left text-xs *:text-left'>
      <th className='w-8' />
      {Array.from({ length: 12 }).map((_, j) => (
        <th key={j} colSpan={4 + _addOneMoreWeek(j)}>
          {date.add(j, 'month').format('MMM')}
        </th>
      ))}
    </tr>
  )
}

// TODO: add onClick listener
// TODO: add legend
// TODO: how to aggregate data and plot it
//   * by day, min max, distribute to 0-5 intensity
//   e.g min 0, max 45
//   5 = 45
//   4 = 36
//   3 = 27
//   2 = 18
//   1 = 9
//   0 = 0
//   formula:
//   intensity = Math.floor((value / max) * 5)
//   value = intensity * max / 5
//   e.g. 27 = 3 * 45 / 5
//   e.g. 36 = 4 * 45 / 5
export const GitHubCal = ({
  today = new Date(),
  data = {},
}: {
  today: Date
  data: Record<string, { intensity: number; info: string }>
}) => (
  <div className='justify-left relative flex max-w-full'>
    <table className='overflow-visible'>
      <thead>
        <Header today={today} />
      </thead>
      <tbody>
        {Array.from({ length: 7 }).map((_, i) => (
          <tr key={i} className='h-3 max-w-full'>
            <td>
              <div className='relative text-xs font-bold'>
                <span className='absolute -bottom-2 left-0'>
                  {i === 0 ? 'Sun' : i === 6 ? 'Sat' : i === 3 ? 'Wed' : ''}
                </span>
              </div>
            </td>
            {Array.from({ length: 53 }).map((_, j) => (
              <td key={j}>
                <Day today={today} col={j} row={i} data={data} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
