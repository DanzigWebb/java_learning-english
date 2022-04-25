import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WordCreateDto } from '@models/word';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-word-form',
  templateUrl: './create-word-form.component.html',
  styleUrls: ['./create-word-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateWordFormComponent implements OnInit {

  @Input()
  valid = false;

  @Output()
  validChange = new EventEmitter<boolean>();

  @Input()
  word: Partial<WordCreateDto> = {};

  @Output()
  wordChange = new EventEmitter<WordCreateDto>();

  form = this.fb.group({
    name: ['', Validators.required],
    associate: '',
    definition: '',
  })

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.validChange.emit(this.form.valid);
      this.wordChange.emit(data);
    })
  }
}
