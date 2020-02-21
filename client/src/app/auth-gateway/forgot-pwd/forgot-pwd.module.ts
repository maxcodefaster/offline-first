import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPwdPage } from './forgot-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPwdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPwdPage]
})
export class ForgotPwdPageModule {}
