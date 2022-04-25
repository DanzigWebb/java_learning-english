import { Component, OnInit } from '@angular/core';
import { WordsService } from '@shared/words/words.service';
import { WordDto } from '@models/word';

@Component({
  selector: 'app-page-words',
  templateUrl: './page-words.component.html',
  styleUrls: ['./page-words.component.scss']
})
export class PageWordsComponent implements OnInit {

  displayedColumns = ['name', 'associate', 'definition', 'done'];

  words$ = this.words.getAll();

  constructor(
    private words: WordsService
  ) { }

  ngOnInit(): void {
  }

  updateWord(word: WordDto) {
    this.words.update(word).subscribe();
  }
}
