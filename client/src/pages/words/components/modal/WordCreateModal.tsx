import { Accessor, Component, Setter } from 'solid-js';
import { createForm } from '@root/src/lib/form/createForm';
import { FormField } from '@components/form/group/FormField';
import { Validators } from '@root/src/lib/form/validators/validators';
import { FormError } from '@components/form/group/FormError';
import { Modal } from '@components/modal';

type Controls = {
    name: string;
    definition?: string;
    associate?: string;
}

type Props = {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    onSubmit: (c: Controls) => void;
}

export const WordCreateModal: Component<Props> = (props) => {
    const {register, errors, submit} = createForm<Controls>();

    function onSubmit(c: Controls) {
        props.onSubmit(c);
    }

    return (
        <Modal isShow={props.show()} class="bg-base-200" onBackdropClick={() => props.setShow(false)}>
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
                    <button class="btn btn-ghost text-error" type="button"
                            onClick={() => props.setShow(false)}>Закрыть
                    </button>
                    <button class="btn btn-primary" type="submit">Создать</button>
                </div>
            </form>
        </Modal>
    );
};
