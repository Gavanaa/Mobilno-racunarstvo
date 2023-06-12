import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsPage } from './book-details.page';
import { ExplorePage } from '../explore.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BookDetailsPage,
  },

  {
    path: '**',
    component: ExplorePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDetailsPageRoutingModule {}
