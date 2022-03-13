import { Component, createSignal, onMount, For } from 'solid-js';
import { CreateWordControls, CreateWordGroupModal } from '@shared/components/modals';
import { createGroup, getGroups } from '@api/WordGroupService';
import { Page } from '@root/src/pages';
import { WordGroupDto } from '@models/words';
import { WordGroup } from '@shared/components/words';

export const Home: Component = () => {
    const [show, setShow] = createSignal(false);
    const [groups, setGroups] = createSignal<WordGroupDto[]>([]);

    onMount(async () => {
        const groups = await getGroupsDto();
        setGroups(groups);
    });

    const onSubmit = async (controls: CreateWordControls) => {
        const response = await createGroup(controls);
        const group = response.data;

        setShow(false);
        setGroups([...groups(), group]);
    };

    const onCreateWord = async () => {
        const groups = await getGroupsDto();
        setGroups(groups);
    }

    const getGroupsDto = async () => {
        const response = await getGroups();
        return response.data;
    };

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <Page>
            <div class="container py-6 m-4">

                <button class="btn btn-primary gap-2" onClick={openModal}>
                    <i class="fa-solid fa-plus"/>
                    <span>Create group</span>
                </button>

                <div className="divider"/>

                <div className="flex items-start gap-4">
                    <For each={groups()}>
                        {group => (
                            <WordGroup
                                group={group}
                                class="w-96 bg-base-100"
                                onCreate={onCreateWord}
                            />
                        )}
                    </For>
                </div>

                <CreateWordGroupModal
                    show={show()}
                    close={closeModal}
                    submit={onSubmit}
                />
            </div>
        </Page>
    );
};
