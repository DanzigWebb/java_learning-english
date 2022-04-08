import { Component, createSignal, onMount, For } from 'solid-js';
import { Page } from '@root/src/pages';
import { getWords, updateWord } from '@services/api';
import { WordDto } from '@models/words';
import { PageParams } from '@api/Api.type';
import { Tooltip } from '@components/tooltip/Tooltip';

/**
 * Todo: refactoring
 * - FE
 * 1) Вынос таблицы в отдельный компонент
 * 2) Вынос строки слова в отдельный компонент
 * - BE
 * 1) Реализовать пагинацию
 * 2) Добавить разделитель фильтр по датам
 */

type WordsParams = Required<Pick<PageParams, 'page' | 'size'>>;

async function getAllWords(params: PageParams) {
    const {data} = await getWords(params);
    return data;
}

export const WordsPage: Component = () => {

    const [params, setParams] = createSignal<WordsParams>({
        page: 0,
        size: 40,
    });

    const [words, setWords] = createSignal<WordDto[]>([]);

    onMount(() => {
        return fetchData();
    });

    /**
     * Updates word's state
     */
    const toggle = async (word: WordDto) => {
        const dto: WordDto = {...word, done: !word.done};
        await updateWord(dto, dto.id);
    };

    async function fetchData() {
        const page = await getAllWords(params());
        setWords(state => state.concat(page.content));
    }

    async function nextChunk() {
        setParams(state => ({
            ...state,
            page: params().page + 1
        }));
        return fetchData();
    }

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

                    <div class="w-full flex justify-center">
                        <Tooltip message="Download more">
                            <button class="btn btn-circle" onClick={nextChunk}>
                                <i class="fa-solid fa-plus"/>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Page>
    );
};
