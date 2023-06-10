import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookMarksPage } from './book-marks.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: BookMarksPage,
    children:[
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'read',
        loadChildren: () => import('./read/read.module').then( m => m.ReadPageModule)
      },
      {
        path: 'best',
        loadChildren: () => import('./best/best.module').then( m => m.BestPageModule)
      }
      ,{
        path:'',
        redirectTo:'/book-marks/tabs/explore',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'/book-marks/tabs/explore',
    pathMatch:'full'

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookMarksPageRoutingModule {}
