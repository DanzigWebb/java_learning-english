import { Component } from 'solid-js';
import { FormField } from '@solsy/ui';
import { Validators } from '@root/src/lib/form/validators/validators';
import { FormError } from '@solsy/ui';
import { Modal } from '@solsy/ui';
import { createForm } from '@root/src/lib/form/createForm';

export type CreateWordControls = {
    name: string;
}

type Props = {
    show: boolean;
    close: () => void;
    submit: (data: CreateWordControls) => void;
}

export const CreateWordGroupModal: Component<Props> = (props) => {

    const {register, errors, submit, reset} = createForm<CreateWordControls>();

    const onClose = () => {
        props.close();
        reset();
    };

    return (
        <Modal
            class="bg-base-200"
            isShow={props.show}
            onBackdropClick={onClose}
        >
            <h2 class="text-2xl">New Group</h2>

            <div className="divider"/>

            <form className="flex flex-col" onSubmit={submit(props.submit)}>
                <FormField>
                    <input
                        type="text"
                        class="input"
                        placeholder="Name..."
                        autocomplete="off"
                        classList={{'input-error': !!errors.name}}
                        {...register('name', {
                            validators: [
                                Validators.required()
                            ]
                        })}
                    />
                    <FormError show={!!errors.name}>Required field</FormError>
                </FormField>

                <div class="modal-actions flex items-center justify-end pt-4 gap-2">
                    <button class="btn btn-ghost text-error" type="button" onClick={onClose}>close</button>
                    <button class="btn btn-primary" type="submit">Create</button>
                </div>
            </form>
        </Modal>
    );
};
