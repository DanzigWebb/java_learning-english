import { WordCreateDto, WordDto } from '@root/src/models/words/words.type';
import httpClient from '@root/src/services/http/httpClient';

const url = 'api/v1/word';

export const createWord = (dto: WordCreateDto) => {
    return httpClient.post<WordDto>(url, dto);
};

export const updateWord = (dto: WordCreateDto, wordId: string) => {
    return httpClient.put<WordDto>(`${url}/${wordId}`, dto);
};