import { WordGroupCreateDto, WordGroupDto } from '@models/words';
import httpClient from '@services/http/httpClient';

const url = 'api/v1/group';

export const getGroups = () => {
    return httpClient.get<WordGroupDto[]>(url);
}

export const createGroup = (dto: WordGroupCreateDto) => {
    return httpClient.post<WordGroupDto>(url, dto);
};

export const updateGroup = (dto: WordGroupCreateDto, groupId: string) => {
    return httpClient.put<WordGroupDto>(`${url}/${groupId}`, dto);
};