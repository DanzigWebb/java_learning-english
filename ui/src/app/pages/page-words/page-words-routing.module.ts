import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageWordsComponent } from './page-words/page-words.component';

const routes: Routes = [
  {
    path: '',
    component: PageWordsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageWordsRoutingModule {}
