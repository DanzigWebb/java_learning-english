/**
 * Todo: выводить список групп
 * Todo: обновлять список групп после создания
 */
import { Component, createSignal } from 'solid-js';
import { CreateWordControls, CreateWordGroupModal } from '@shared/components/modals';
import { createGroup } from '@api/WordGroupService';
import { Page } from '@root/src/pages';

export const Home: Component = () => {
    const [show, setShow] = createSignal(false);

    const onSubmit = async (controls: CreateWordControls) => {
        const response = await createGroup(controls);
        console.log(response.data);
        setShow(false);
    };

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <Page>
            <div className="container py-6 m-4">
                <button class="btn btn-primary gap-2" onClick={openModal}>
                    <i class="fa-solid fa-plus"/>
                    Create group
                </button>

                <CreateWordGroupModal
                    show={show()}
                    close={closeModal}
                    submit={onSubmit}
                />
            </div>
        </Page>
    );
};
