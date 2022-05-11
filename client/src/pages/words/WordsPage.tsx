import { Component, createSignal, onMount } from 'solid-js';
import { Page } from '@root/src/pages';
import { createWord, getWords, GetWordsParams, WordsParamRanges } from '@services/api';
import { WordCreateDto, WordDto } from '@models/words';
import { Button, Tooltip } from '@solsy/ui';
import { WordCreateModal, WordsFilter, WordTable } from '@root/src/pages/words/components';
import { useSearchParams } from 'solid-app-router';
import { createStore } from 'solid-js/store';

type WordsParams = Required<Pick<GetWordsParams, 'page' | 'size' | 'name' | 'range'>>;

async function getAllWords(params: WordsParams) {
    const {data} = await getWords(params);
    return data;
}

export const WordsPage: Component = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [show, setShow] = createSignal<boolean>(false);
    const [words, setWords] = createSignal<WordDto[]>([]);
    const [params, setParams] = createStore<WordsParams>({
        page: 0,
        size: 4,
        name: '',
        range: 'all',
    });

    onMount(async () => {
        const params: WordsFilter = {
            name: searchParams.name || '',
            range: searchParams.range as WordsParamRanges || 'all',
        };
        await updateFilters(params);
    });

    function fetchData() {
        return getAllWords(params);
    }

    async function nextChunk() {
        setParams('page', params.page + 1);
        const page = await fetchData();
        return setWords(state => state.concat(page.content));
    }

    async function updateFilters(filters: WordsFilter) {
        const {name, range} = filters;
        const params: WordsParams = {
            page: 0,
            size: 4,
            name,
            range
        };
        setParams(params);
        setSearchParams({
            name, range
        });
        await Promise.resolve();
        const page = await fetchData();
        setWords(page.content);
    }

    function showCreateModal() {
        setShow(true);
    }

    async function onCreateWord(dto: WordCreateDto) {
        setShow(false);
        await createWord(dto);
        const page = await fetchData();
        setWords(page.content);
    }

    return (
        <Page full class="p-2">
            <div class="container">
                <div class="flex w-full sticky top-0">
                    <WordsFilter name={params.name} range={params.range} onInput={updateFilters}/>
                    <div class="flex-1"/>
                    <Tooltip message="Добавить слово" class="flex items-center">
                        <Button circle size="sm" onClick={showCreateModal}>
                            <i class="fa-solid fa-plus"/>
                        </Button>
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

                    <div class="w-full flex justify-center py-2">
                        <Tooltip message="Download more">
                            <Button circle onClick={nextChunk}>
                                <i class="fa-solid fa-plus"/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Page>
    );
};
