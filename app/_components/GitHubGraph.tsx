import dayjs from 'dayjs'

import { GitHubCal } from '@/components/github-cal'

export const GitHubGraph = () => {
  const today = new Date()
  const raw: Record<string, { count: number; info: string }> = {}
  const data: Record<string, { intensity: number; info: string }> = {}

  const oneYearAgo = dayjs().subtract(53, 'week')
  for (let i = 0; i <= 7 * 53; i++) {
    const date = oneYearAgo.add(i, 'day')
    const randomInt = Math.floor(Math.random() * 100)

    raw[date.format('YYYY-MM-DD')] = {
      info: date.format('ddd, DD-MMM, YYYY') + '. Intensity: ' + randomInt,
      count: randomInt,
    }
  }

  const max = Math.max(...Object.values(raw).map(({ count }) => count))
  const level1 = (1 * max) / 5
  const level2 = (2 * max) / 5
  const level3 = (3 * max) / 5
  const level4 = (4 * max) / 5
  const level5 = (5 * max) / 5

  for (const [date, { count, info }] of Object.entries(raw)) {
    let intensity = 0

    if (count >= level1 && count < level2) {
      intensity = 1
    } else if (count >= level2 && count < level3) {
      intensity = 2
    } else if (count >= level3 && count < level4) {
      intensity = 3
    } else if (count >= level4 && count < level5) {
      intensity = 4
    } else if (count >= level5) {
      intensity = 5
    }

    data[date] = {
      intensity,
      info,
    }
  }

  return <GitHubCal today={today} data={data} />
}
