import { Component, createSignal, onMount, For } from 'solid-js';
import { CreateWordControls } from '@shared/components/modals';
import { createGroup, getGroups, updateGroup } from '@api/WordGroupService';
import { Page } from '@root/src/pages';
import { WordGroupDto } from '@models/words';
import { GroupCard } from '@shared/components/words';
import { HomeHeader } from '@root/src/pages/home/HomeHeader';
import { HomeFilters } from '@root/src/pages/home/type/home.type';
import { createStore, reconcile } from 'solid-js/store';
import { FilterGroupsPipe } from '@root/src/pages/home/pipes/FilterGroup.pipe';
import { TransitionGroup } from 'solid-transition-group';

export const Home: Component = () => {
    const [groups, setGroups] = createSignal<WordGroupDto[]>([]);
    const [filters, setFilters] = createStore<Partial<HomeFilters>>({});

    onMount(async () => {
        const groups = await getGroupsDto();
        setGroups(groups);
    });

    const onSubmit = async (controls: CreateWordControls) => {
        const response = await createGroup(controls);
        const group = response.data;
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

    function updateFilters(filters: Partial<HomeFilters>) {
        setFilters(reconcile({...filters}));
    }

    return (
        <Page full>
            <div class="p-2 h-full grid grid-rows-[auto_1fr]">
                <HomeHeader
                    onSubmit={onSubmit}
                    onUpdateFilters={updateFilters}>
                </HomeHeader>

                <div class="relative">
                    <div class="words-group-wrapper">
                        <TransitionGroup name="list-item">
                            <For each={FilterGroupsPipe(groups(), filters)}>
                                {group => (
                                    <div class="h-full inline-block m-1 align-top whitespace-nowrap transition-all list-item">
                                        <GroupCard
                                            group={group}
                                            class="w-80 bg-base-300 max-h-full"
                                            onCreate={onCreateWord}
                                            onArchived={toggleArchived}
                                        />
                                    </div>
                                )}
                            </For>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </Page>
    );
};