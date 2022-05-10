import { Component, createSignal } from 'solid-js';
import { Menu } from '@solsy/ui';
import { FormField } from '@solsy/ui';
import { Validators } from '@root/src/lib/form/validators/validators';
import { FormError } from '@solsy/ui';
import { createForm } from '@root/src/lib/form/createForm';

export type WordGroupAddControls = {
    name: string;
    definition: string;
    associate: string;
}

type Props = {
    onSubmit?: (controls: WordGroupAddControls) => void;
}

/**
 * Button with form menu for create word
 * emit submit with WordCreateDto
 */
export const CreateBtn: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    const [reference, setReference] = createSignal<HTMLElement>();
    const {register, submit, errors, reset, refs} = createForm<WordGroupAddControls>();

    const onSubmit = (controls: WordGroupAddControls) => {
        props.onSubmit?.(controls);
        setShow(false);
    };

    /**
     * Opens create menu and focuses the name input
     */
    const open = () => {
        setShow(true);
        const input = refs.name;
        if (input) {
            input.focus();
        }
    };

    /**
     * Closes create menu and resets form inputs
     */
    const close = () => {
        reset();
        setShow(false);
    };

    return (
        <>
            <div class="sticky bottom-0 bg-base-300">
                <button
                    class="btn btn-primary btn-ghost gap-2 w-full"
                    onClick={open}
                    ref={setReference}
                >
                    <i class="fa-solid fa-plus"/>
                    <span>Добавить слово</span>
                </button>
            </div>

            <Menu
                isShow={show()}
                onBackdropClick={close}
                reference={reference()}
            >
                <form className="flex flex-col p-4" onSubmit={submit(onSubmit)}>
                    <FormField>
                        <input
                            type="text"
                            class="input input-sm"
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

                    <FormField>
                        <input
                            type="text"
                            class="input input-sm"
                            placeholder="Definition..."
                            autocomplete="off"
                            classList={{'input-error': !!errors.definition}}
                            {...register('definition', {
                                validators: [
                                    Validators.required()
                                ]
                            })}
                        />
                        <FormError show={!!errors.definition}>Required field</FormError>
                    </FormField>

                    <FormField>
                        <input
                            type="text"
                            class="input input-sm"
                            placeholder="Associate..."
                            autocomplete="off"
                            classList={{'input-error': !!errors.associate}}
                            {...register('associate')}
                        />
                    </FormField>

                    <div class="modal-actions flex items-center justify-end pt-2 gap-2">
                        <button class="btn btn-ghost btn-sm text-error" type="button" onClick={close}>close</button>
                        <button class="btn btn-primary btn-sm" type="submit">Create</button>
                    </div>
                </form>
            </Menu>
        </>
    );
};
