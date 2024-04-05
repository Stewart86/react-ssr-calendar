# react-ssr-calendar

## Description

Following the latest trend of headless components and moving towards server side rendered components, this project is a simple calendar component that can be rendered on the server side with incredible flexibility. Took inspiration from [headlessui](https://headlessui.com/), [shadcn](https://ui.shadcn.com/), [react-calendar](https://github.com/wojtekmaj/react-calendar) and many various variations of trying to make building calendar in with React less painful.

## Features

- :zap: **Lightweight**: No dependencies, just a simple calendar component.
- :fire: **Headless**: Render your own components with the data provided.
- :art: **Customizable**: Style it the way you want. CSS-in-JS, Tailwind, etc.
- :rocket: **SSR**: Render the calendar on the server side.
- :sparkles: **Flexibility**: Render the calendar the way you want. Big calendar, small calendar, event calendar, etc.
- :tada: **Typescript**: Written in Typescript.

## Installation

**Yet to publish to npm**

```bash
npm install react-ssr-calendar
```

## Usage

```jsx
... removed for brevity
import { DateCellContainer, MonthView } from 'react-ssr-calendar'

export const Calendar = () => {
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
```

## Demo

Source code for the demo can be found in the `app._components` folder.

[source](https://github.com/Stewart86/react-ssr-calendar/blob/main/app/_components/version1.tsx)

![basic-calendar](/samples/basic.png)

[source](https://github.com/Stewart86/react-ssr-calendar/blob/main/app/_components/version2.tsx)

![two-months](/samples/two-months.png)

[source](https://github.com/Stewart86/react-ssr-calendar/blob/main/app/_components/version3.tsx)

![year-view](/samples/year-view.png)

[source](https://github.com/Stewart86/react-ssr-calendar/blob/main/app/_components/version4.tsx)

![event-cal](/samples/event-cal.png)

## Missing features?

Open a PR or an issue and I'll try to get to it as soon as possible.

## TODOs

- [ ] publish to npm
- [ ] contributing guide
- [ ] demo

## License

MIT
