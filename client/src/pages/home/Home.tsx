import { Component, createSignal } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { Modal } from '@components/modal';
import { FormField } from '@components/form/group/FormField';
import { FormError } from '@components/form/group/FormError';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';
import httpClient from '@root/src/services/http/httpClient';

type Controls = {
    name: string;
}

/**
 * Todo: создать сервис для запросов к /group & /word
 * Todo: выводить список групп
 * Todo: обновлять список групп после создания
 */

export const Home: Component = () => {
    const {register, errors, submit} = createForm<Controls>();
    const [show, setShow] = createSignal(false);

    const onSubmit = async (controls: Controls) => {
        const response = await createGroup(controls);
        console.log(response.data);
        setShow(false);
    };

    return (
        <Page>
            <div className="container py-6 m-4">
                <button class="btn btn-primary gap-2" onClick={() => setShow(true)}>
                    <i class="fa-solid fa-plus"/>
                    Create group
                </button>

                <Modal
                    class="bg-base-200"
                    isShow={show()}
                    onBackdropClick={() => setShow(false)}
                >
                    <h2 class="text-2xl">New Group</h2>

                    <div className="divider"/>

                    <form className="flex flex-col" onSubmit={submit(onSubmit)}>
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

                        <div className="modal-actions flex justify-end pt-4 gap-2">
                            <button class="btn btn-ghost text-error" onClick={() => setShow(false)}>close</button>
                            <button class="btn btn-primary" type="submit">Create</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </Page>
    );
};

type GroupDto = {
    name: string;
}

function createGroup(dto: GroupDto) {
    return httpClient.post('/api/v1/group', dto);
}