import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'tab-1', loadChildren: () => import('./tab-1/tab-1.module').then(m => m.Tab1PageModule) },
  { path: 'tab-2', loadChildren: () => import('./tab-2/tab-2.module').then(m => m.Tab2PageModule) },
  { path: 'login', loadChildren: () => import('./auth-gateway/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./auth-gateway/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'edit-doc', loadChildren: () => import('./modals/edit-doc/edit-doc.module').then(m => m.EditDocPageModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'forgot-pwd', loadChildren: './auth-gateway/forgot-pwd/forgot-pwd.module#ForgotPwdPageModule' },
  { path: 'reset-pwd/:token', loadChildren: './auth-gateway/reset-pwd/reset-pwd.module#ResetPwdPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
