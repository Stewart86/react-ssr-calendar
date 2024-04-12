import { Fragment, type ReactNode } from 'react'

export type MonthViewProps = {
  children: (props: { cellIndex: number }) => ReactNode
}

/**
 * A month view calendar component. Provides a render prop to render each cell in the month view.
 *
 * @param children - A render prop to render each cell in the month view.
 * @returns A month view calendar component.
 *
 * @example
 * ```tsx
 * <MonthView>
 *    {({ cellIndex }) => (
 *      <div key={cellIndex} className='p-2'>
 *        {cellIndex}
 *      </div>
 *    )}
 * </MonthView>
 *  ```
 */
export const MonthView = ({ children }: MonthViewProps) => (
  <Fragment>
    {Array.from({ length: 42 }, (_, i) => children({ cellIndex: i }))}
  </Fragment>
)
