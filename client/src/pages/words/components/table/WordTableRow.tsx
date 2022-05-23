import { Component, createSignal, Show } from 'solid-js';
import { WordCreateDto, WordDto } from '@models/words';
import { Button, Input, Popover, Toggle, Tooltip } from '@solsy/ui';
import { WordCreateModal } from '@root/src/pages/words/components';
import { useWordsPage } from '@root/src/pages/words/WordsPage';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';

type Props = {
    word: WordDto;
    wordIndex: number;
    onUpdate?: (w: WordDto) => void;
    onEdit?: (w: WordDto) => void;
}

type Controls = {
    name: string;
    definition: string;
}

export const WordTableRow: Component<Props> = (props) => {
    const [word, setWord] = createSignal<WordDto>(props.word);
    const [translate, setTranslate] = createSignal(false);
    const [editMode, setEditMode] = createSignal(false);
    const {register, getValues, setValue, errors} = createForm<Controls>({
        defaultValues: {
            name: word().name,
            definition: word().definition
        },
        validators: {
            name: [Validators.required()]
        }
    });

    const ctx = useWordsPage();

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
            const dto: WordDto = {...word(), name: name!, definition: definition!};
            setWord(dto);
            props.onUpdate?.(dto);
        }
    }

    function updateWord(w: WordCreateDto) {
        setEditMode(false);
        const updatedWord: WordDto = {...props.word, ...w};
        setWord(updatedWord);
        setValue('name', updatedWord.name);
        setValue('definition', updatedWord.definition);
        ctx.editWord(updatedWord);
    }

    return (
        <>
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
                        onBlur={update}
                        {...register('name', {validators: [Validators.required()]})}
                    />
                </td>
                <td>
                    <Input
                        color="ghost"
                        class={`w-full ${translate() ? 'opacity-100' : 'opacity-0'}`}
                        onBlur={update}
                        onFocus={() => setTranslate(true)}
                        {...register('definition')}
                    />
                </td>
                <td>
                    <div class="flex items-center gap-2">
                        <Toggle
                            size="xs"
                            color={word().done ? 'accent' : undefined}
                            value={word().done}
                            onChange={() => toggle(word())}
                        />

                        <Tooltip message="Редактировать">
                            <Button circle size="sm" color="ghost" onClick={() => setEditMode(true)}>
                                <i class="fa-solid fa-highlighter"/>
                            </Button>
                        </Tooltip>
                    </div>
                </td>
            </tr>

            <WordCreateModal
                show={editMode()}
                onClose={() => setEditMode(false)}
                onSubmit={updateWord}
                wordDto={word()}
            />
        </>
    );
};


