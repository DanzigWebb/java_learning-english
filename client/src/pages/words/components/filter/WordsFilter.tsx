import { Component, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input, Option, Select } from '@solsy/ui';
import { debounceTime, Subject } from 'rxjs';

type Ranges = 'all' | 'day' | 'week' | 'month' | 'year';

export type WordsFilter = {
    name: string;
    range: Date | null;
}

type Props = {
    onInput?: (v: WordsFilter) => void;
}

export const WordsFilter: Component<Props> = (props) => {

    const [filters, setFilters] = createStore<WordsFilter>({
        name: '',
        range: null
    });

    const subject$ = new Subject<WordsFilter>();
    const subscriber = subject$.pipe(
        debounceTime(200),
    ).subscribe(f => props.onInput?.(f));

    onCleanup(() => {
        subscriber.unsubscribe();
    });

    const updateName = (name: string) => {
        setFilters('name', name);
        subject$.next(filters);
    };

    const updateRange = (v: string | number) => {
        if (!v) {
            setFilters('range', null);
        }
        const range = rangeToDate(String(v).toLowerCase() as Ranges);
        setFilters('range', range);
        subject$.next(filters);
    };

    const rangeToDate = (range: Ranges) => {
        const date = new Date();

        switch (range) {
            case 'day':
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            case 'week':
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
            case 'month':
                return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
            case 'year':
                return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
            default:
                return null;
        }
    };

    return (
        <section class="flex gap-2">
            <Input
                bordered
                placeholder="searching"
                onInput={e => updateName(e.currentTarget.value)}
            />
            <Select value="All" bordered onInput={updateRange}>
                <Option value="All">All</Option>
                <Option value="Day">Day</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
                <Option value="Year">Year</Option>
            </Select>
        </section>
    );
};
