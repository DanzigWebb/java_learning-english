import { Component, createSignal, onMount } from 'solid-js';
import { Page } from '@root/src/pages';
import { createWord, getWords, GetWordsParams } from '@services/api';
import { WordCreateDto, WordDto } from '@models/words';
import { Tooltip } from '@solsy/ui';
import { WordCreateModal, WordsFilter, WordTable } from '@root/src/pages/words/components';

/**
 * Todo: refactoring
 * - BE
 * 1) (done) Реализовать пагинацию
 * 2) Добавить разделитель фильтр по датам
 */
type WordsParams = Required<Pick<GetWordsParams, 'page' | 'size' | 'name'>>;

async function getAllWords(params: WordsParams) {
    const {data} = await getWords(params);
    return data;
}

export const WordsPage: Component = () => {

    const [show, setShow] = createSignal<boolean>(false);
    const [words, setWords] = createSignal<WordDto[]>([]);
    const [params, setParams] = createSignal<WordsParams>({
        page: 0,
        size: 4,
        name: '',
    });

    onMount(async () => {
        const page = await fetchData();
        setWords(state => state.concat(page.content));
    });

    function fetchData() {
        return getAllWords(params());
    }

    async function nextChunk() {
        setParams(state => ({
            ...state,
            page: params().page + 1
        }));
        const page = await fetchData();
        return setWords(state => state.concat(page.content));
    }

    async function updateFilters(filters: WordsFilter) {
        const {name} = filters;
        if (name !== params().name) {
            setParams(() => ({page: 0, size: 4, name}));
            const page = await fetchData();
            setWords(page.content);
        }
    }

    function showCreateModal() {
        setShow(true);
    }

    async function onCreateWord(dto: WordCreateDto) {
        setShow(false);
        await createWord(dto);
        const page = await getAllWords(params());
        setWords(page.content);
    }

    return (
        <Page full>
            <div class="container p-2">
                <h1 class="text-2xl py-4">Библиотека слов</h1>
                <div class="flex w-full">

                    <WordsFilter onInput={updateFilters}/>

                    <div class="flex-1"/>

                    <Tooltip message="Добавить слово">
                        <button class="btn btn-circle btn-sm" onClick={showCreateModal}>
                            <i class="fa-solid fa-plus"/>
                        </button>
                    </Tooltip>

                    <WordCreateModal
                        show={show()}
                        onClose={() => setShow(false)}
                        onSubmit={onCreateWord}
                    />
                </div>

                <div class="divider"/>
                <div class="overflow-x-auto">

                    <WordTable words={words()}/>

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
