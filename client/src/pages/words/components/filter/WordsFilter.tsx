import { Component, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input } from '@solsy/ui';
import { debounceTime, Subject } from 'rxjs';
import { WordsParamRange } from '@services/api';
import { WordsFilterRange } from './WordsFilterRange';

export type WordsFilter = {
    name: string;
    range: WordsParamRange;
}

type Props = {
    name: string;
    range: WordsParamRange;
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

    const updateRange = (range: WordsParamRange) => {
        setFilters('range', range);
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

            <WordsFilterRange
                range={props.range || 'all'}
                onInput={updateRange}
            />
        </section>
    );
};
