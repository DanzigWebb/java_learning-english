import { Component, createEffect } from 'solid-js';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';
import { Modal } from '@solsy/ui';
import { FormField, FormError } from '@solsy/ui';

type Controls = {
    name: string;
    definition?: string;
    associate?: string;
}

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmit: (c: Controls) => void;
}

export const WordCreateModal: Component<Props> = (props) => {
    const {register, errors, submit} = createForm<Controls>();


    createEffect(() => {
        console.log('on change');
    })

    function onSubmit(c: Controls) {
        props.onSubmit(c);
    }

    return (
        <Modal isShow={props.show} class="bg-base-200" onBackdropClick={props.onClose}>
            <h2 class="text-2xl">Новое слово</h2>
            <div className="divider"/>

            <form onSubmit={submit(onSubmit)}>
                <FormField>
                    <input
                        class="input"
                        type="text"
                        placeholder="name"
                        autocomplete="off"
                        classList={{'input-error': !!errors.name}}
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
                    <button
                        class="btn btn-ghost text-error" type="button"
                        onClick={props.onClose}
                    >
                        Закрыть
                    </button>
                    <button class="btn btn-primary" type="submit">Создать</button>
                </div>
            </form>
        </Modal>
    );
};
