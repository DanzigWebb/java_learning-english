import { Component, createSignal } from 'solid-js';
import { WordDto } from '@models/words';
import { Tooltip } from '@components/tooltip/Tooltip';

type Props = {
    word: WordDto;
    toggle?: (w: WordDto) => void;
}

/**
 * Displays WordDto of the list item in GroupCard
 * @note This component is part of the menu element (ul.menu)
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
        <li onClick={toggle}>
            <Tooltip message={word().definition} placement="right">
                <div class="flex justify-between">
                    <p class="capitalize" classList={{'line-through': word().done}}>
                        {word().name}
                    </p>
                    <input
                        type="checkbox"
                        class="toggle toggle-xs"
                        classList={{
                            'toggle-accent': word().done
                        }}
                        checked={word().done}
                    />
                </div>
            </Tooltip>
        </li>
    );
};