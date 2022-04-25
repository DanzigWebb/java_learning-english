import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WordCreateDto } from '@models/word';
import { WordsService } from '@words/words.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-word-form-dialog',
  templateUrl: './create-word-form-dialog.component.html',
  styleUrls: ['./create-word-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateWordFormDialogComponent implements OnInit {

  word: Partial<WordCreateDto> = {};
  valid = false;

  constructor(
    public dialogRef: MatDialogRef<CreateWordFormDialogComponent>,
    private words: WordsService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.words.create(this.word as WordCreateDto)
      .subscribe((word) => this.dialogRef.close(word))
  }
}
