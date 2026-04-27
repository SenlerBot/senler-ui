import * as React from 'react';
import { DayButton, DayPicker } from 'react-day-picker';
import { Button } from './button';
type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>['variant'];
};
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, locale, ...props }: CalendarProps): import("react/jsx-runtime").JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>): import("react/jsx-runtime").JSX.Element;
export { Calendar, CalendarDayButton };
