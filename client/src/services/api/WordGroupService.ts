import { WordGroupCreateDto, WordGroupDto } from '@root/src/models/words/words.type';
import httpClient from '@root/src/services/http/httpClient';

const url = 'api/v1/group';

export const createGroup = (dto: WordGroupCreateDto) => {
    return httpClient.post<WordGroupDto>(url, dto);
};

export const updateGroup = (dto: WordGroupCreateDto, groupId: string) => {
    return httpClient.put<WordGroupDto>(`${url}/${groupId}`, dto);
};