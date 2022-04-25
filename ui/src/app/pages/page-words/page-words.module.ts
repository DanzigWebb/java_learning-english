import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { PageWordsRoutingModule } from './page-words-routing.module';
import { PageWordsComponent } from './page-words/page-words.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PageWordsComponent
  ],
  imports: [
    CommonModule,
    PageWordsRoutingModule,
    MatListModule,
    MatTableModule
  ]
})
export class PageWordsModule {}
