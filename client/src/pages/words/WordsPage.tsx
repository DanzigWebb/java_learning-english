import { Component, createSignal, onMount } from 'solid-js';
import { Page } from '@root/src/pages';
import { createWord, getWords } from '@services/api';
import { WordCreateDto, WordDto } from '@models/words';
import { PageParams } from '@api/Api.type';
import { Tooltip } from 'solidjs-daisy';
import { WordTable } from '@root/src/pages/words/components/WordTable';
import { WordCreateModal } from '@root/src/pages/words/components/modal/WordCreateModal';

/**
 * Todo: refactoring
 * - BE
 * 1) (done) Реализовать пагинацию
 * 2) Добавить разделитель фильтр по датам
 */

type WordsParams = Required<Pick<PageParams, 'page' | 'size'>>;

async function getAllWords(params: PageParams) {
    const {data} = await getWords(params);
    return data;
}

export const WordsPage: Component = () => {

    const [show, setShow] = createSignal<boolean>(false);
    const [words, setWords] = createSignal<WordDto[]>([]);
    const [params, setParams] = createSignal<WordsParams>({
        page: 0,
        size: 40,
    });

    onMount(() => {
        return fetchData();
    });

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
                    <div class="flex-1"/>
                    <Tooltip message="Добавить слово">
                        <button class="btn btn-circle btn-sm" onClick={showCreateModal}>
                            <i class="fa-solid fa-plus"/>
                        </button>
                    </Tooltip>

                    <WordCreateModal
                        show={show}
                        setShow={setShow}
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
