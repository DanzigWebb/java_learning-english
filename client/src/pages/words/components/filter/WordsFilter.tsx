import { Component, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input, Option, Select } from '@solsy/ui';
import { debounceTime, Subject } from 'rxjs';
import { WordsParamRanges } from '@services/api';

export type WordsFilter = {
    name: string;
    range: WordsParamRanges;
}

type Props = {
    name: string;
    range: WordsParamRanges;
    onInput?: (v: WordsFilter) => void;
}

export const WordsFilter: Component<Props> = (props) => {

    const [filters, setFilters] = createStore<WordsFilter>({
        name: '',
        range: 'all'
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
            setFilters('range', 'all');
        }
        setFilters('range', String(v).toLowerCase() as WordsParamRanges);
        subject$.next(filters);
    };

    return (
        <section class="flex gap-2">
            <Input
                bordered
                placeholder="searching"
                value={props.name}
                onInput={e => updateName(e.currentTarget.value)}
            />
            <Select value={'All'} bordered onInput={updateRange}>
                <Option value="All">All</Option>
                <Option value="Day">Day</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
                <Option value="Year">Year</Option>
            </Select>
        </section>
    );
};
