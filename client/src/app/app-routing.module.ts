import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'sicherheits-check', loadChildren: () => import('./sicherheits-check/sicherheits-check.module').then(m => m.SicherheitsCheckPageModule) },
  { path: 'tab-2', loadChildren: () => import('./tab-2/tab-2.module').then(m => m.Tab2PageModule) },
  { path: 'archive', loadChildren: () => import('./archive/archive.module').then(m => m.ArchivePageModule) },
  { path: 'view-document/:id', loadChildren: () => import('./view-document/view-document.module').then(m => m.ViewDocumentPageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
