import { Component, For } from 'solid-js';
import { WordTableRow } from './WordTableRow';
import { WordDto } from '@models/words';
import { UpdateWord } from '@services/api';
import { Store } from 'solid-js/store/types/store';

type Props = {
    words: Store<WordDto[]>;
}

export const WordTable: Component<Props> = (props) => {

    /**
     * Updates word's state
     */
    const toggle = async (word: WordDto) => {
        await UpdateWord(word, word.id);
    };

    return (
        <table class="table table-zebra table-compact w-full">
            <thead>
                <tr>
                    <th class="w-4">#</th>
                    <th class="w-4"></th>
                    <th>Название</th>
                    <th>Перевод</th>
                    <th class="w-4"></th>
                </tr>
            </thead>
            <tbody>
                <For each={props.words || []}>
                    {(word, i) => (
                        <WordTableRow
                            word={word}
                            wordIndex={i() + 1}
                            onUpdate={toggle}
                        />
                    )}
                </For>
            </tbody>
        </table>
    );
};
