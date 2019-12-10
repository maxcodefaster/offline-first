import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'sicherheits-check', loadChildren: () => import('./sicherheits-check/sicherheits-check.module').then(m => m.SicherheitsCheckPageModule) },
  { path: 'service-check', loadChildren: () => import('./service-check/service-check.module').then(m => m.ServiceCheckPageModule) },
  { path: 'archive', loadChildren: () => import('./archive/archive.module').then(m => m.ArchivePageModule) },
  { path: 'view-sicherheits-check/:id', loadChildren: () => import('./view-sicherheits-check/view-sicherheits-check.module').then(m => m.ViewSicherheitsCheckPageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
