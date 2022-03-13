import { Component, For } from 'solid-js';
import { WordCreateDto, WordDto, WordGroupDto } from '@models/words';
import { WordGroupAdd, WordGroupAddControls } from '@shared/components/words/WordGroupAdd';
import { createWord } from '@services/api';

type Props = {
    group: WordGroupDto;
    class?: string;
    onCreate?: (dto: WordDto) => void;
}

export const WordGroup: Component<Props> = (props) => {

    const onCreate = async ({name, definition}: WordGroupAddControls) => {
        const groupId = props.group.id;
        const dto: WordCreateDto = {groupId, name, definition};
        const response = await createWord(dto);
        if (props.onCreate) {
            props.onCreate(response.data);
        }
    };

    return (
        <div class={`card shadow-xl ${props.class || ''}`}>
            <div class="card-content">
                <header class="flex items-center justify-between px-4">
                    <h3 class="text-lg p-2 truncate">{props.group.name}</h3>
                    <button class="btn btn-sm btn-ghost btn-circle">
                        <i class="fa-solid fa-ellipsis-vertical"/>
                    </button>
                </header>

                <div className="divider mt-0"/>

                <For each={props.group.words}>
                    {word => <p class="p-1 px-3">{word.name}</p>}
                </For>

                <WordGroupAdd
                    onSubmit={onCreate}
                />
            </div>
        </div>
    );
};