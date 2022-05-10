import { Component, createSignal, observable, onCleanup } from 'solid-js';
import { Input } from '@solsy/ui';

export type WordsFilter = {
    name: string;
}

type Props = {
    onInput?: (v: WordsFilter) => void;
}

export const WordsFilter: Component<Props> = (props) => {

    const [filters, setFilters] = createSignal<WordsFilter>({
        name: ''
    });

    const obs$ = observable(filters).subscribe(
        (filters) => props.onInput?.(filters)
    );
    onCleanup(obs$.unsubscribe);

    const updateName = (name: string) => {
        setFilters(filters => ({...filters, name}));
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
