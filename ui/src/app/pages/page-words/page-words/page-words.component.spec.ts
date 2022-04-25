import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWordsComponent } from './page-words.component';

describe('PageWordsComponent', () => {
  let component: PageWordsComponent;
  let fixture: ComponentFixture<PageWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
