import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WordCreateDto, WordDto } from '@models/word';
import { Page, PageParams } from '@models/page';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private url = 'api/v1/word';

  constructor(
    private http: HttpClient
  ) { }

  create(dto: WordCreateDto) {
    return this.http.post(this.url, dto);
  }

  update(dto: WordDto) {
    const {id} = dto;
    return this.http.put<WordDto>(`${this.url}/${id}`, dto);
  }

  getAll(pageParams: PageParams = {page: 0, size: 10}) {
    const params = new HttpParams({
      fromObject: {...pageParams}
    });
    return this.http.get<Page<WordDto>>(`${this.url}/all`, {params});
  }
}
