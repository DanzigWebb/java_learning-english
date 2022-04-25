import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordFormComponent } from './create-word-form.component';

describe('CreateWordFormComponent', () => {
  let component: CreateWordFormComponent;
  let fixture: ComponentFixture<CreateWordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
