import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResetPwdPage } from './reset-pwd.page';
import { ErrorMessagesComponent } from 'src/app/components/error-messages/error-messages.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPwdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResetPwdPage, ErrorMessagesComponent]
})
export class ResetPwdPageModule {}
