import { Component, createMemo, createSignal, For } from 'solid-js';
import { WordCreateDto, WordDto, WordGroupDto } from '@models/words';
import { createWord, updateWord } from '@api/index';
import { CreateBtn, WordGroupAddControls } from './CreateBtn';
import { Word } from './Word';
import { GroupCardHeader } from './GroupCardHeader';


type Props = {
    group: WordGroupDto;
    class?: string;
    onCreate?: (dto: WordDto) => void;
    onArchived?: (dto: WordGroupDto) => void;
}

/**
 * Card of word's group
 * - has a header with done state
 * - displays a list of words
 * - has a button to create new words
 */
export const GroupCard: Component<Props> = (props) => {

    const group = createMemo(() => props.group);
    const [done, setDone] = createSignal(isDone(props.group.words));

    /**
     * Awaits request of create word
     * Calls onCreate of props
     */
    const fetchCreateWord = async ({name, definition, associate}: WordGroupAddControls) => {
        const groupId = props.group.id;
        const dto: WordCreateDto = {groupId, name, definition, associate};
        const response = await createWord(dto);

        props.onCreate?.(response.data);
    };

    /**
     * Awaits request of toggle word and updates done state
     */
    const toggleWord = async (word: WordDto) => {
        if (word) {
            const response = await updateWord(word, word.id);
            const words = [...group().words];
            const currentIndex = words.findIndex(w => w.id === response.data.id);
            if (currentIndex >= 0) {
                words[currentIndex] = response.data;
                setDone(isDone(words));
            }
        }
    };

    /**
     * Checks if the group is done
     * @note Group is done when her words are done
     */
    function isDone(words: WordDto[]) {
        return words.every(w => w.done);
    }

    const archiveGroup = (group: WordGroupDto) => {
        props.onArchived?.(group);
    };

    return (
        <div class={`card shadow-xl ${props.class || ''}`} classList={{
            'opacity-80': props.group.archived
        }}>
            <GroupCardHeader
                done={done()}
                group={group()}
                onArchived={archiveGroup}
            />

            <div class="card-content">
                <ul class="menu">
                    <For each={group().words}>
                        {word => (<>
                            <Word word={word} toggle={toggleWord}/>
                            <span className="divider m-0 h-1"/>
                        </>)}
                    </For>
                </ul>

                <CreateBtn
                    onSubmit={fetchCreateWord}
                />
            </div>
        </div>
    );
};