import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'

import { type MonthHeaderProps } from './month'
import { type MonthViewProps } from './month-view'
import { type WeekdayHeaderProps } from './week'

export type CalendarContainerProps<Ttag extends ElementType> = {
  as?: Ttag
  children:
  | ReactElement<
    MonthViewProps | MonthHeaderProps | WeekdayHeaderProps | ReactNode
  >[]
  | ReactElement<
    MonthViewProps | MonthHeaderProps | WeekdayHeaderProps | ReactNode
  >
} & ComponentPropsWithoutRef<Ttag> &
  HTMLAttributes<HTMLElement>

export const MonthViewContainer = <Ttag extends ElementType>({
  as,
  children,
  ...rest
}: CalendarContainerProps<Ttag>) => {
  const Tag = as ?? 'div'
  return (
    <Tag style={{ display: 'grid', gridColumn: 'span 7 / span 7' }} {...rest}>
      {children}
    </Tag>
  )
}
