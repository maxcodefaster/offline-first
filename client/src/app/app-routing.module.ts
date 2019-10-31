import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home/sicherheits-check', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'sicherheits-check', loadChildren: './sicherheits-check/sicherheits-check.module#SicherheitsCheckPageModule' },
  { path: 'service-check', loadChildren: './service-check/service-check.module#ServiceCheckPageModule' },
  { path: 'archive', loadChildren: './archive/archive.module#ArchivePageModule' },
  { path: 'view-sicherheits-check/:id', loadChildren: './view-sicherheits-check/view-sicherheits-check.module#ViewSicherheitsCheckPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
