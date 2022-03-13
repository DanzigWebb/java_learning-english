import { Component, createSignal } from 'solid-js';
import { WordDto } from '@models/words';

type Props = {
    word: WordDto;
    toggle?: (w: WordDto) => void;
}

export const Word: Component<Props> = (props) => {

    const [word, setWord] = createSignal(props.word);

    const toggle = () => {
        const dto: WordDto = {...word(), done: !word().done};
        setWord({...dto});
        if (props.toggle) {
            props.toggle(dto);
        }
    };

    return (
        <li>
            <a class="flex justify-between" onClick={toggle}>
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
            </a>
        </li>
    );
};