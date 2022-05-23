import { Component, createSignal, Show } from 'solid-js';
import { WordDto } from '@models/words';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';
import { Button, Input, Popover, Toggle } from '@solsy/ui';

type Props = {
    word: WordDto;
    wordIndex: number;
    onUpdate?: (w: WordDto) => void;
}

type Controls = {
    name: string;
    definition: string;
}

export const WordTableRow: Component<Props> = (props) => {
    const [word, setWord] = createSignal<WordDto>(props.word);
    const [translate, setTranslate] = createSignal(false);
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
        <tr>
            <td>
                {props.wordIndex}
            </td>
            <td>
                <Show when={props.word.associate}>
                    <Popover trigger={
                        <Button circle color="ghost" size="sm">
                            <i class="fa-solid fa-circle-question"/>
                        </Button>
                    }>
                        <p class="p-4 rounded bg-base-300 shadow-2xl">
                            {props.word.associate}
                        </p>
                    </Popover>
                </Show>
            </td>
            <td>
                <Input
                    color="ghost"
                    class="w-full"
                    error={!!errors.name}
                    value={word().name}
                    onBlur={update}
                    {...register('name', {validators: [Validators.required()]})}
                />
            </td>
            <td>
                <Input
                    color="ghost"
                    class={`w-full ${translate() ? 'opacity-100' : 'opacity-0'}`}
                    value={word().definition}
                    onBlur={update}
                    onFocus={() => setTranslate(true)}
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
        </tr>
    );
};
