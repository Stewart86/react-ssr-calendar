import { Version1 } from './_components/version1'
import { Version2 } from './_components/version2'
import { Version3 } from './_components/version3'
import { Version4 } from './_components/version4'
import { Version5 } from './_components/version5'

// TODO:
// * add navigation to month, year
// * highlight today
// * add events
// * inject initial data

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-8 p-24'>
      <div className='flex flex-col items-center gap-4'>
        Most basic calendar. Just the days. Server side rendered.
        <Version1 />
      </div>
      {/* <Version2 /> */}
      <div className='flex flex-col items-center gap-4'>
        Dual calendar with navigation.
        <Version2 />
      </div>
      <div className='flex flex-col items-center gap-4'>
        Year view.
        <Version3 />
      </div>
      <div className='flex flex-col items-center gap-4'>
        Highly customisable day view with events. Just by modifying DayElement
        component.
        <Version4 />
      </div>
      <div className='flex flex-col items-center gap-4'>
        Highly customisable day view with events. Just by modifying DayElement
        component.
        <Version5 />
      </div>
    </main>
  )
}
