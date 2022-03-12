import { Component, createSignal } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import httpClient from '@root/src/services/http/httpClient';
import { CreateWordControls, CreateWordGroupModal } from '@root/src/shared/components/modals/CreateWordGroupModal';

/**
 * Todo: создать сервис для запросов к /group & /word
 * Todo: выводить список групп
 * Todo: обновлять список групп после создания
 */

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

type GroupDto = {
    name: string;
}

function createGroup(dto: GroupDto) {
    return httpClient.post('/api/v1/group', dto);
}