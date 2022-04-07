import { WordCreateDto, WordDto } from '@models/words';
import httpClient from '@services/http/httpClient';

const url = 'api/v1/word';

export const createWord = (dto: WordCreateDto) => {
    return httpClient.post<WordDto>(url, dto);
};

export const updateWord = (dto: WordCreateDto, wordId: string) => {
    return httpClient.put<WordDto>(`${url}/${wordId}`, dto);
};

export const getWords = () => {
    return httpClient.get<WordDto[]>(`${url}/all`)
}
