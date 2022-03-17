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
            class="p-2 sortable transition-transform cursor-move"
            use:sortable
            classList={{
                'opacity-10': sortable.isActiveDraggable,
            }}
        >
            <Word word={props.word} toggle={props.toggle}/>
            <span class="divider m-0 h-1"/>
        </div>
    );
};