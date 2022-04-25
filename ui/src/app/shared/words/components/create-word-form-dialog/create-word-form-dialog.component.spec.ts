import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordFormDialogComponent } from './create-word-form-dialog.component';

describe('CreateWordFormDialogComponent', () => {
  let component: CreateWordFormDialogComponent;
  let fixture: ComponentFixture<CreateWordFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
