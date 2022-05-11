import { Component, onCleanup } from 'solid-js';
import { Input } from '@solsy/ui';
import { debounceTime, Subject } from 'rxjs';
import { createStore } from 'solid-js/store';

export type WordsFilter = {
    name: string;
}

type Props = {
    onInput?: (v: WordsFilter) => void;
}

export const WordsFilter: Component<Props> = (props) => {

    const [filters, setFilters] = createStore<WordsFilter>({
        name: ''
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

    return (
        <section>
            <Input
                bordered
                placeholder="searching"
                onInput={e => updateName(e.currentTarget.value)}
            />
        </section>
    );
};
