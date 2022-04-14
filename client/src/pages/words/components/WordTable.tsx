import { Component, For } from 'solid-js';
import { WordTableRow } from './WordTableRow';
import { WordDto } from '@models/words';
import { updateWord } from '@services/api';

type Props = {
    words: WordDto[];
}

export const WordTable: Component<Props> = (props) => {

    /**
     * Updates word's state
     */
    const toggle = async (word: WordDto) => {
        await updateWord(word, word.id);
    };

    return (
        <table class="table table-zebra table-compact w-full">
            <thead>
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Перевод</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            <For each={props.words || []}>
                {(word, i) => (
                    <tr>
                        <th>{i() + 1}</th>
                        <WordTableRow word={word} onUpdate={toggle}/>
                    </tr>
                )}
            </For>
            </tbody>
        </table>
    );
};
