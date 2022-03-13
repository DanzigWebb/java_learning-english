import { Component, createMemo, For } from 'solid-js';
import { WordCreateDto, WordDto, WordGroupDto } from '@models/words';
import { WordGroupAdd, WordGroupAddControls } from '@shared/components/words/WordGroupAdd';
import { createWord, updateWord } from '@services/api';
import { Word } from '@shared/components/words/Word';

type Props = {
    group: WordGroupDto;
    class?: string;
    onCreate?: (dto: WordDto) => void;
}

export const WordGroup: Component<Props> = (props) => {

    const group = createMemo(() => props.group);

    const onCreate = async ({name, definition}: WordGroupAddControls) => {
        const groupId = props.group.id;
        const dto: WordCreateDto = {groupId, name, definition};
        const response = await createWord(dto);
        if (props.onCreate) {
            props.onCreate(response.data);
        }
    };

    const toggleWord = async (word: WordDto) => {
        if (word) {
            await updateWord(word, word.id);
        }
    };

    return (
        <div class={`card shadow-xl ${props.class || ''}`}>
            <header class="mb-2 px-4 bg-primary text-primary-content">
                <div className="card-content flex items-center justify-between">
                    <h3 class="text-lg p-2 truncate">{props.group.name}</h3>
                    <button class="btn btn-sm btn-ghost btn-circle">
                        <i class="fa-solid fa-ellipsis-vertical"/>
                    </button>
                </div>
            </header>

            <div class="card-content">
                <ul class="menu">
                    <For each={group().words}>
                        {word => <Word word={word} toggle={toggleWord}/>}
                    </For>
                </ul>

                <WordGroupAdd
                    onSubmit={onCreate}
                />
            </div>
        </div>
    );
};