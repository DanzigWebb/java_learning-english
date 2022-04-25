import { Component, OnInit } from '@angular/core';
import { WordsService } from '@shared/words/words.service';
import { WordDto } from '@models/word';
import { MatDialog } from '@angular/material/dialog';
import { CreateWordFormDialogComponent } from '@words/components';

@Component({
  selector: 'app-page-words',
  templateUrl: './page-words.component.html',
  styleUrls: ['./page-words.component.scss']
})
export class PageWordsComponent implements OnInit {

  displayedColumns = ['name', 'associate', 'definition', 'done'];

  words$ = this.getAllWords();

  constructor(
    private words: WordsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  updateWord(word: WordDto) {
    this.words.update(word).subscribe();
  }

  create() {
    this.dialog.open(CreateWordFormDialogComponent)
      .afterClosed()
      .subscribe((data: WordDto | undefined) => {
        if (data) {
          this.words$ = this.getAllWords();
        }
      });
  }

  private getAllWords() {
    return this.words.getAll({
      page: 0,
      size: 50
    });
  }
}
