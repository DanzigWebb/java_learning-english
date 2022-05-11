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

export type WordsParamRanges = 'all' | 'day' | 'week' | 'month' | 'year';

export interface GetWordsParams extends PageParams {
    name?: string;
    range?: WordsParamRanges;
}

export const getWords = (params: GetWordsParams = {page: 0, size: 10}) => {
    const {page = 0, size = 10, name = '', range = null} = params;
    const query = new URLSearchParams();

    query.set('page', page.toString());
    query.set('size', size.toString());
    if (name) {
        query.set('name', name);
    }
    const rangeDate = range && rangeToDate(range);
    if (rangeDate) {
        query.set('from', String(+rangeDate));
        query.set('to', String(+new Date()));
    }

    return httpClient.get<Page<WordDto>>(`${url}/all`, {
        params: query
    });
};


const rangeToDate = (range: WordsParamRanges) => {
    const date = new Date();

    switch (range) {
        case 'day':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
        case 'week':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        case 'month':
            return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        case 'year':
            return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
        default:
            return null;
    }
};
