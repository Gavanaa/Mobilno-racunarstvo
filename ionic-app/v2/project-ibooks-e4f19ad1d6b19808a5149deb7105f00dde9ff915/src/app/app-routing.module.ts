import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-marks',
    pathMatch: 'full',
  },
  {
    path: 'book-marks',
    loadChildren: () =>
      import('./book-marks/book-marks.module').then(
        (m) => m.BookMarksPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then((m) => m.ProfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./comments/comments.module').then((m) => m.CommentsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'mynotes',
    loadChildren: () =>
      import('./mynotes/mynotes.module').then((m) => m.MynotesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./auth/log-in/log-in.module').then((m) => m.LogInPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },

  {
    path: '**',
    redirectTo: 'book-marks',
  },

  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
