import { WordsParamRange } from '@services/api';
import { Component, createSignal, For } from 'solid-js';
import { Button, Menu, MenuOption, Tooltip } from '@solsy/ui';

type Props = {
    range: WordsParamRange;
    onInput: (r: WordsParamRange) => void;
}

const ranges: WordsParamRange[] = ['all', 'day', 'week', 'month', 'year'];

export const WordsFilterRange: Component<Props> = props => {

    const [menu, setMenu] = createSignal(false);
    const [ref, setRef] = createSignal<HTMLElement>();

    const updateRange = (range: WordsParamRange) => {
        setMenu(false);
        props.onInput(range);
    };

    const isActive = (range: WordsParamRange) => range === props.range;

    const capitalize = (word: string) => {
        const [first, ...other] = word;
        return [first.toUpperCase(), ...other].join('');
    };

    return (
        <>
            <Tooltip message="Date range">
                <Button
                    ref={setRef}
                    color="ghost"
                    class="gap-2"
                    onClick={() => setMenu(true)}
                >
                    <i class="fa-solid fa-calendar-days"/>
                    <i class="text-xs capitalize">{props.range}</i>
                </Button>
            </Tooltip>

            <Menu
                isShow={menu()}
                reference={ref()}
                onBackdropClick={() => setMenu(false)}
            >
                <For each={ranges}>
                    {range => (
                        <MenuOption
                            onClick={() => updateRange(range)}
                            active={isActive(range)}
                        >
                            {capitalize(range)}
                        </MenuOption>
                    )}
                </For>
            </Menu>

            {/*<Datepicker*/}
            {/*    bordered*/}
            {/*    placeholder="From"*/}
            {/*    weekHolidays={[5, 6]}*/}
            {/*    closeOnSelect>*/}
            {/*</Datepicker>*/}

            {/*<Datepicker*/}
            {/*    bordered*/}
            {/*    placeholder="To"*/}
            {/*    weekHolidays={[5, 6]}*/}
            {/*    closeOnSelect>*/}
            {/*</Datepicker>*/}
        </>
    );
};
