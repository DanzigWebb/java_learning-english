import { Component, createContext, createEffect, createSignal, onMount, useContext } from 'solid-js';
import { Page } from '@root/src/pages';
import { CreateWord, GetWords, GetWordsParams, UpdateWord, WordsParamRange } from '@services/api';
import { WordCreateDto, WordDto } from '@models/words';
import { Button, Tooltip } from '@solsy/ui';
import { WordCreateModal, WordsFilter, WordTable } from '@root/src/pages/words/components';
import { useSearchParams } from 'solid-app-router';
import { createStore } from 'solid-js/store';
import { Store } from 'solid-js/store/types/store';

type WordsParams = Required<Pick<GetWordsParams, 'page' | 'size' | 'name' | 'range'>>;

async function getAllWords(params: WordsParams) {
    const {data} = await GetWords(params);
    return data;
}

export const WordsPage: Component = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [show, setShow] = createSignal<boolean>(false);

    const [state, setState] = createStore<WordsPageState>({
        words: [],
        params: {
            page: 0,
            size: 4,
            name: '',
            range: 'all',
        }
    });

    onMount(async () => {
        const params: WordsFilter = {
            name: searchParams.name || '',
            range: searchParams.range as WordsParamRange || 'all',
        };
        await updateFilters(params);
    });

    function fetchData() {
        return getAllWords(state.params);
    }

    async function nextChunk() {
        setState('params', 'page', state.params.page + 1);
        const page = await fetchData();
        setState('words', state.words.concat(page.content));
    }

    async function updateFilters(filters: WordsFilter) {
        const {name, range} = filters;
        const params: WordsParams = {
            page: 0,
            size: 40,
            name,
            range
        };
        setState('params', params);
        setSearchParams({
            name, range
        });
        await Promise.resolve();
        const page = await fetchData();
        setState('words', page.content);
    }

    function showCreateModal() {
        setShow(true);
    }

    function hideCreateModal() {
        setShow(false);
    }

    async function createWord(dto: WordCreateDto) {
        await CreateWord(dto);
        const page = await fetchData();
        setState('words', page.content);
    }

    async function editWord(dto: WordDto) {
        await UpdateWord(dto, dto.id);
        const index = state.words.findIndex(w => w.id === dto.id);
        if (index >= 0) {
            setState('words', index, dto);
        } else {
            throw new Error('Cannot find word with id: ' + dto.id);
        }
    }

    return (
        <Page full class="p-2">
            <WordsPageContext.Provider value={{
                state,
                createWord,
                editWord
            }}>
                <div class="container">
                    <div class="flex w-full sticky top-0">
                        <WordsFilter
                            name={state.params.name}
                            range={state.params.range}
                            onInput={updateFilters}
                        />
                        <div class="flex-1"/>
                        <Tooltip message="Добавить слово" class="flex items-center">
                            <Button circle size="sm" onClick={showCreateModal}>
                                <i class="fa-solid fa-plus"/>
                            </Button>
                        </Tooltip>
                        <WordCreateModal
                            show={show()}
                            onClose={hideCreateModal}
                            onSubmit={(w) => {
                                hideCreateModal();
                                return createWord(w);
                            }}
                        />
                    </div>

                    <div class="divider"/>

                    <div class="overflow-x-auto">

                        <WordTable words={state.words}/>

                        <div class="w-full flex justify-center py-2">
                            <Tooltip message="Download more">
                                <Button circle onClick={nextChunk}>
                                    <i class="fa-solid fa-plus"/>
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </WordsPageContext.Provider>
        </Page>
    );
};

type WordsPageState = {
    words: WordDto[];
    params: WordsParams;
}

type WordsPageContext = {
    state: Store<WordsPageState>;
    createWord: (w: WordCreateDto) => void;
    editWord: (w: WordDto) => void;
}

const WordsPageContext = createContext<WordsPageContext>();

export const useWordsPage = () => {
    const ctx = useContext(WordsPageContext);
    if (ctx) {
        return ctx;
    }
    throw new Error('No context for words page');
};
