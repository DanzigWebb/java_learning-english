import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { PageWordsRoutingModule } from './page-words-routing.module';
import { PageWordsComponent } from './page-words/page-words.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageWordsComponent
  ],
  imports: [
    CommonModule,
    PageWordsRoutingModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class PageWordsModule {}
