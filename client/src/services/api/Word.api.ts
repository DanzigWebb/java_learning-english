import { WordCreateDto, WordDto } from '@models/words';
import httpClient from '@services/http/httpClient';
import { Page, PageParams } from '@api/Api.type';

const url = 'api/v1/word';

export const createWord = (dto: WordCreateDto) => {
    return httpClient.post<WordDto>(url, dto);
};

export const updateWord = (dto: WordCreateDto, wordId: string) => {
    return httpClient.put<WordDto>(`${url}/${wordId}`, dto);
};

export interface GetWordsParams extends PageParams {
    name?: string;
}

export const getWords = (params: GetWordsParams = {page: 0, size: 10}) => {
    return httpClient.get<Page<WordDto>>(`${url}/all`, {
        params
    });
};
