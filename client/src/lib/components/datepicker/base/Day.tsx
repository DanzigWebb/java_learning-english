import { Component, createMemo } from 'solid-js';
import { DayModel } from '@components/datepicker/models';
import './Day.css';
import { useDatepicker } from '@components/datepicker/Datepicker';
import { Button, ButtonColor } from '@solsy/ui';

type DayProps = {
    day: DayModel;
    onSelect: () => void;
}

export const Day: Component<DayProps> = (props) => {

    const datepicker = useDatepicker();

    const isSelected = createMemo(() => (
        datepicker.state.selected?.toDate().toISOString() === props.day.date.toDate().toISOString()
    ));

    const isHoliday = createMemo(() => (
        datepicker.state.weekHolidays.includes(props.day.date.weekday())
    ));

    const isToday = createMemo(() => props.day.isToday);

    const setColor = (): ButtonColor | undefined => {
        if (isSelected()) {
            return 'primary';
        }

        if (isToday()) {
            return 'secondary';
        }

        if (isHoliday()) {
            return;
        }

        return 'ghost';
    };

    return (
        <Button
            onClick={props.onSelect}
            class="day text-sm p-0 px-2 rounded-none"
            disabled={!props.day.fromCurrentMonth}

            color={setColor()}
        >
            <span class="leading-none">{props.day.date.format('D')}</span>
        </Button>
    );
};

// classList={{
//     'disabled': !day.fromCurrentMonth,
//         'bg-secondary': day.isToday && !isSelected(),
//         'bg-primary': isSelected(),
//         'bg-base-100': isHoliday()
// }}
