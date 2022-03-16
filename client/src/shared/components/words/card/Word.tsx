import { Component, createSignal } from 'solid-js';
import { WordDto } from '@models/words';
import { Tooltip } from '@components/tooltip/Tooltip';

type Props = {
    word: WordDto;
    toggle?: (w: WordDto) => void;
}

/**
 * Displays WordDto of the list item in GroupCard
 */
export const Word: Component<Props> = (props) => {
    const [word, setWord] = createSignal(props.word);

    /**
     * Updates word's state
     * Calls toggle of props
     */
    const toggle = () => {
        const dto: WordDto = {...word(), done: !word().done};
        setWord({...dto});
        props.toggle?.(dto);
    };

    return (
        <div class="flex items-center justify-between w-full">
            <div class="flex flex-col flex-1 pb-2 overflow-x-hidden">
                <Tooltip message={word().definition} placement="right">
                    <p class="capitalize" classList={{'line-through': word().done}}>
                        {word().name}
                    </p>
                </Tooltip>

                <i class="text-sm opacity-80 truncate">{word().associate || '...'}</i>
            </div>

            <div class="flex items-center gap-1">
                <input
                    onClick={toggle}
                    type="checkbox"
                    class="toggle toggle-xs shrink"
                    classList={{
                        'toggle-accent': word().done
                    }}
                    checked={word().done}
                />
            </div>
        </div>
    );
};