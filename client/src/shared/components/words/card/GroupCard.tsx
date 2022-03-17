import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import { WordCreateDto, WordDto, WordGroupDto } from '@models/words';
import { createWord, updateWord } from '@api/index';
import { CreateBtn, WordGroupAddControls } from './CreateBtn';
import { Word } from './Word';
import { GroupCardHeader } from './GroupCardHeader';
import {
    closestLayoutCenter,
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    SortableProvider
} from '@thisbeyond/solid-dnd';
import { DragEventHandler } from '@thisbeyond/solid-dnd/dist/types/drag-drop-context';
import { WordSortable } from '@shared/components/words/card/WordSortable';
import { ScaleTransition } from '@root/src/lib/transitions';
import { LexoRank } from 'lexorank';

type Props = {
    group: WordGroupDto;
    class?: string;
    onCreate?: (dto: WordDto) => void;
    onArchived?: (dto: WordGroupDto) => void;
}

const sortWords = (words: WordDto[]) => words.sort((a, b) => {
    if (a.rank > b.rank) {
        return 1;
    }
    if (a.rank < b.rank) {
        return -1;
    }
    return 0;
});

/**
 * Card of word's group
 * - has a header with done state
 * - displays a list of words
 * - has a button to create new words
 */
export const GroupCard: Component<Props> = (props) => {

    const group = createMemo(() => props.group);
    const [words, setWords] = createSignal<WordDto[]>(sortWords(group()?.words || []));
    const [done, setDone] = createSignal(isDone(props.group.words));
    const [activeItem, setActiveItem] = createSignal<WordDto | null>(null);
    const ids = () => words().map(w => w.id);

    const [dragRefs, setDragRefs] = createSignal<HTMLElement[]>([]);


    // setDefaultRank()
    // async function setDefaultRank() {
    //     let rank = LexoRank.middle();
    //     for (let w of group().words) {
    //         w.rank = rank.toString();
    //         await updateWord(w, w.id);
    //         rank = rank.genNext();
    //     }
    // }

    /**
     * Awaits request of create word
     * Calls onCreate of props
     */
    const fetchCreateWord = async ({name, definition, associate}: WordGroupAddControls) => {
        const groupId = props.group.id;
        const dto: WordCreateDto = {groupId, name, definition, associate};
        const response = await createWord(dto);
        setWords((words) => [...words, response.data]);

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

    const onDragStart: DragEventHandler = ({draggable}) => {
        resetTransition();
        setActiveItem(words().find(w => w.id == draggable.id) || null);
    };

    const onDragEnd: DragEventHandler = ({draggable, droppable}) => {
        addTransition();

        if (draggable && droppable) {
            const currentItems = words();
            const fromIndex = currentItems.findIndex(w => w.id === draggable.id);
            const toIndex = currentItems.findIndex(w => w.id === droppable.id);

            if (fromIndex !== toIndex) {
                const position = getPosition(toIndex, currentItems);

                const current = currentItems[fromIndex];
                current.rank = position.toString();
                updateWord(current, current.id);

                const updatedItems = currentItems.slice();
                updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
                setWords(updatedItems);
            }
        }
        setActiveItem(null);
    };

    const addTransition = () => {
        dragRefs().forEach(ref => {
            const el = ref.querySelector('.sortable') as HTMLElement;
            if (el) {
                el.style.transition = '0s';
            }
        });
    };

    const resetTransition = () => {
        dragRefs().forEach(ref => {
            const el = ref.querySelector('.sortable') as HTMLElement;
            if (el) {
                el.removeAttribute('style');
            }
        });
    };

    return (
        <div class={`card shadow-xl relative rounded-lg ${props.class || ''}`}>
            <GroupCardHeader
                done={done()}
                group={group()}
                onArchived={archiveGroup}
            />

            <div class="flex-[1_1_auto] overflow-x-hidden overflow-y-auto">
                <DragDropProvider
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    collisionDetectionAlgorithm={closestLayoutCenter}
                >
                    <DragDropSensors/>
                    <SortableProvider ids={ids()}>
                        <For each={words()}>
                            {word => (
                                <div ref={ref => setDragRefs([...dragRefs(), ref])}>
                                    <WordSortable word={word} toggle={toggleWord}/>
                                </div>
                            )}
                        </For>
                    </SortableProvider>

                    <DragOverlay>
                        <ScaleTransition>
                            <Show when={activeItem()}>
                                <div class="bg-base-100 rounded shadow-2xl p-2">
                                    <Word word={activeItem()!}/>
                                </div>
                            </Show>
                        </ScaleTransition>
                    </DragOverlay>
                </DragDropProvider>
            </div>

            <CreateBtn
                onSubmit={fetchCreateWord}
            />
        </div>
    );
};

function getPosition(toIndex: number, words: WordDto[]) {
    const isStart = toIndex === 0;
    const isEnd = toIndex === words.length - 1;

    if (isStart) {
        return LexoRank.parse(words[0].rank).genPrev();
    }

    if (isEnd) {
        return LexoRank.parse(words[words.length - 1].rank).genNext();
    }

    const prevItem = LexoRank.parse(words[toIndex - 1].rank);
    const nextItem = LexoRank.parse(words[toIndex + 1].rank);
    return prevItem.between(nextItem);
}