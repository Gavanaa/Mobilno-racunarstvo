import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MynotesPage } from './mynotes.page';

const routes: Routes = [
  {
    path: '',
    component: MynotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MynotesPageRoutingModule {}
