import { Component, createSignal, onMount, For } from 'solid-js';
import { Page } from '@root/src/pages';
import { getWords, updateWord } from '@services/api';
import { WordDto } from '@models/words';

/**
 * Todo: refactoring
 * - FE
 * 1) Вынос таблицы в отдельный компонент
 * 2) Вынос строки слова в отдельный компонент
 * - BE
 * 1) Реализовать пагинацию
 * 2) Добавить разделитель фильтр по датам
 */

async function getAllWords() {
    const {data} = await getWords();
    return data;
}

export const WordsPage: Component = () => {

    const [words, setWords] = createSignal<WordDto[]>([]);

    onMount(async () => {
        const words = await getAllWords();
        setWords(words);
    });

    /**
     * Updates word's state
     */
    const toggle = async (word: WordDto) => {
        const dto: WordDto = {...word, done: !word.done};
        await updateWord(dto, dto.id);
    };

    return (
        <Page full>
            <div class="container">
                <h1 class="text-2xl py-4">Библиотека слов</h1>
                <div class="divider"/>
                <div class="overflow-x-auto">
                    <table class="table w-full table-zebra">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Перевод</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        <For each={words()}>
                            {(word, i) => (
                                <tr>
                                    <th>{i() + 1}</th>
                                    <td>{word.name}</td>
                                    <td>{word.definition}</td>
                                    <td>
                                        <div>
                                            <input
                                                onClick={() => toggle(word)}
                                                type="checkbox"
                                                class="toggle toggle-xs shrink"
                                                classList={{
                                                    'toggle-accent': word.done
                                                }}
                                                checked={word.done}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </For>
                        </tbody>
                    </table>
                </div>
            </div>
        </Page>
    );
};
