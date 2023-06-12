import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExplorePage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./book-details/book-details.module').then(
        (m) => m.BookDetailsPageModule
      ),
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
export class ExplorePageRoutingModule {}
