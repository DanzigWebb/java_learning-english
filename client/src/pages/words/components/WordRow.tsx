import { Component, createSignal } from 'solid-js';
import { WordDto } from '@models/words';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';

type Props = {
    word: WordDto;
    onUpdate?: (w: WordDto) => void;
}

type Controls = {
    name: string;
    definition: string;
}

export const WordRow: Component<Props> = (props) => {
    const [word, setWord] = createSignal<WordDto>(props.word);
    const {register, getValues, errors} = createForm<Controls>();

    function toggle(word: WordDto) {
        const dto: WordDto = {...word, done: !word.done};
        setWord(dto);
        props.onUpdate?.(dto);
    }

    function update() {
        if (errors.name || errors.definition) {
            return
        }

        const {name, definition} = getValues();

        if (name !== word().name || definition !== word().definition) {
            const dto: WordDto = {...word(), name, definition};
            setWord(dto);
            props.onUpdate?.(dto);
        }
    }

    return (
        <>
            <td>
                <input
                    type="text"
                    class="input input-ghost h-auto w-full"
                    classList={{
                        'input-error': !!errors.name
                    }}
                    value={word().name}
                    {...register('name', {
                            validators: [Validators.required()]
                        }
                    )}
                    onBlur={update}
                />
            </td>
            <td>
                <input
                    type="text"
                    class="input input-ghost h-auto w-full"
                    value={word().definition}
                    {...register('definition')}
                    onBlur={update}
                />
            </td>
            <td>
                <div>
                    <input
                        onClick={() => toggle(word())}
                        type="checkbox"
                        class="toggle toggle-xs shrink"
                        classList={{
                            'toggle-accent': word().done
                        }}
                        checked={word().done}
                    />
                </div>
            </td>
        </>
    );
};
