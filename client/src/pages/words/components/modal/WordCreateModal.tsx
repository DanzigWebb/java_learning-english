import { Component, createEffect } from 'solid-js';
import { Input, Modal, FormField, FormError, Button } from '@solsy/ui';
import { WordDto } from '@models/words';
import { Validators } from '@root/src/lib/form/validators/validators';
import { createForm } from '@root/src/lib/form/createForm';

type Controls = {
    name: string;
    definition?: string;
    associate?: string;
}

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmit: (c: Controls) => void;
    wordDto?: WordDto;
}

export const WordCreateModal: Component<Props> = (props) => {

    const {register, errors, submit, setValue} = createForm<Controls>({
        defaultValues: {
            name: props.wordDto?.name,
            definition: props.wordDto?.definition,
            associate: props.wordDto?.associate
        }
    });

    createEffect(() => {
        if (props.show) {
            Promise.resolve().then(() => {
                updateValue();
            })
        }
    })

    function updateValue() {
        setValue('name', props.wordDto?.name || '');
        setValue('definition', props.wordDto?.definition || '');
        setValue('associate', props.wordDto?.associate || '');
    }

    function onSubmit(c: Controls) {
        props.onSubmit(c);
    }

    return (
        <Modal isShow={props.show} class="bg-base-200" onBackdropClick={props.onClose}>
            <h2 class="text-2xl">Новое слово</h2>
            <div className="divider"/>

            <form onSubmit={submit(onSubmit)}>
                <FormField>
                    <Input
                        class="input"
                        type="text"
                        placeholder="name"
                        autocomplete="off"
                        error={!!errors.name}
                        {...register('name', {
                            validators: [Validators.required()]
                        })}
                    />

                    <FormError show={!!errors.name}>Required field</FormError>
                </FormField>
                <FormField>
                    <input
                        class="input"
                        type="text"
                        placeholder="definition"
                        {...register('definition')}
                    />
                </FormField>
                <FormField>
                    <input
                        class="input"
                        type="text"
                        placeholder="associate"
                        {...register('associate')}
                    />
                </FormField>

                <div class="modal-actions flex items-center justify-end pt-4 gap-2">
                    <Button
                        class="text-error"
                        color="ghost"
                        type="button"
                        onClick={props.onClose}
                    >
                        Закрыть
                    </Button>
                    <Button color="primary" type="submit">Создать</Button>
                </div>
            </form>
        </Modal>
    );
};
