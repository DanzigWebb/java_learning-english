import { Component } from 'solid-js';
import { createSortable } from '@thisbeyond/solid-dnd';
import { WordDto } from '@models/words';
import { Word } from '@shared/components/words/card/Word';

type Props = {
    word: WordDto;
    toggle?: (w: WordDto) => void;
}

export const WordSortable: Component<Props> = (props) => {
    const sortable = createSortable(props.word.id);

    return (
        <div
            class="p-2 sortable transition-transform"
            use:sortable
            classList={{
                'opacity-10': sortable.isActiveDraggable,
            }}
        >
            <div class="grid grid-cols-[auto_1fr] items-center gap-2">
                <i class="fa-solid fa-arrows-up-down-left-right hover:opacity-80 cursor-move"/>
                <Word word={props.word} toggle={props.toggle}/>
            </div>
            <span className="divider m-0 h-1"/>
        </div>
    );
};