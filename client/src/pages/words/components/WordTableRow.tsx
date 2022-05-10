import { Component, createSignal } from 'solid-js';
import { WordDto } from '@models/words';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';
import { Input, Toggle } from '@solsy/ui';

type Props = {
    word: WordDto;
    onUpdate?: (w: WordDto) => void;
}

type Controls = {
    name: string;
    definition: string;
}

export const WordTableRow: Component<Props> = (props) => {
    const [word, setWord] = createSignal<WordDto>(props.word);
    const {register, getValues, errors} = createForm<Controls>();

    function toggle(word: WordDto) {
        const dto: WordDto = {...word, done: !word.done};
        setWord(dto);
        props.onUpdate?.(dto);
    }

    function update() {
        if (errors.name || errors.definition) {
            return;
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
                <Input
                    color="ghost"
                    error={!!errors.name}
                    value={word().name}
                    onBlur={update}
                    {...register('name', {validators: [Validators.required()]})}
                />
            </td>
            <td>
                <Input
                    color="ghost"
                    value={word().definition}
                    onBlur={update}
                    {...register('definition')}
                />
            </td>
            <td>
                <div>
                    <Toggle
                        size="xs"
                        color={word().done ? 'accent' : undefined}
                        value={word().done}
                        onChange={() => toggle(word())}
                    />
                </div>
            </td>
        </>
    );
};
