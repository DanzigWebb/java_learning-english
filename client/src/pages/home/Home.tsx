import { Component, createSignal, onMount, For } from 'solid-js';
import { CreateWordControls, CreateWordGroupModal } from '@shared/components/modals';
import { createGroup, getGroups } from '@api/WordGroupService';
import { Page } from '@root/src/pages';
import { WordGroupDto } from '@models/words';
import { GroupCard } from '@shared/components/words';

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
    };

    const getGroupsDto = async () => {
        const response = await getGroups();
        return response.data;
    };

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <Page full>
            <div class="p-2 h-full">
                <div class="py-6 m-4 h-full flex flex-col">

                    <header>
                        <button class="btn btn-primary gap-2" onClick={openModal}>
                            <i class="fa-solid fa-plus"/>
                            <span>Create group</span>
                        </button>
                    </header>

                    <div className="divider"/>

                    <div class="overflow-x-hidden flex-1">
                        <div className="h-full flex items-start overflow-x-scroll gap-4">
                            <For each={groups()}>
                                {group => (
                                    <GroupCard
                                        group={group}
                                        class="w-80 bg-base-300 shrink-0"
                                        onCreate={onCreateWord}
                                    />
                                )}
                            </For>
                        </div>
                    </div>

                    <CreateWordGroupModal
                        show={show()}
                        close={closeModal}
                        submit={onSubmit}
                    />
                </div>
            </div>
        </Page>
    );
};
