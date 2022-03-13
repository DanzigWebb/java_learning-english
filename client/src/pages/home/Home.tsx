import { Component, createSignal, onMount, For } from 'solid-js';
import { CreateWordControls, CreateWordGroupModal } from '@shared/components/modals';
import { createGroup, getGroups, updateGroup } from '@api/WordGroupService';
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

    const toggleArchived = async (group: WordGroupDto) => {
        const response = await updateGroup(group, group.id);
        const dto = response.data;
        const cloneGroups = [...groups()];

        setGroups(updateGroupDtoInList(cloneGroups, dto));
    };

    function updateGroupDtoInList(list: WordGroupDto[], dto: WordGroupDto) {
        const findIndex = list.findIndex(item => item.id === dto.id);
        if (findIndex >= 0) {
            list[findIndex] = dto;
        }
        return list;
    }

    return (
        <Page full>
            <div class="p-2 h-full">
                <div class="py-6 m-4 h-full grid grid-rows-[auto_1fr]">

                    <header>
                        <button class="btn btn-primary gap-2" onClick={openModal}>
                            <i class="fa-solid fa-plus"/>
                            <span>Create group</span>
                        </button>

                        <div className="divider"/>
                    </header>


                    <div className="relative">
                        <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap absolute top-0 left-0 bottom-0 right-0">
                            <For each={groups()}>
                                {group => (
                                    <div class="h-full inline-block m-1 align-top whitespace-nowrap">
                                        <GroupCard
                                            group={group}
                                            class="w-80 bg-base-300 max-h-full"
                                            onCreate={onCreateWord}
                                            onArchived={toggleArchived}
                                        />
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>

            <CreateWordGroupModal
                show={show()}
                close={closeModal}
                submit={onSubmit}
            />
        </Page>
    );
};
