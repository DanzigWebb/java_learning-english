import { WordGroupDto } from '@models/words';
import { HomeFilters } from '@root/src/pages/groups-row/type/home.type';

export type FilterPipe<Data = any, Filters = any> = (data: Data[], filters: Filters) => Data[]

export const FilterGroupsPipe: FilterPipe = (
    groups: WordGroupDto[],
    filters: Partial<HomeFilters>
): WordGroupDto[] => {
    const {name, archived} = filters;

    return groups.filter(group => {
        return isIncludesName(group, name) && isShowArchived(group, archived);
    });
};

const isIncludes = (field: string, value = '') => field
    .toLowerCase()
    .includes(value.toLowerCase());

const isIncludesName = (group: WordGroupDto, name = ''): boolean => {
    if (!name) {
        return true;
    }

    return isIncludes(group.name, name) || group.words.some(w => isIncludes(w.name, name));
};

const isShowArchived = (group: WordGroupDto, showArchived = false) => {
    return showArchived || !group.archived;
};