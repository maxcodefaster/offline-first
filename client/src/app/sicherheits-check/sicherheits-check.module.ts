import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SicherheitsCheckPage } from './sicherheits-check.page';

const routes: Routes = [
  {
    path: '',
    component: SicherheitsCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SicherheitsCheckPage]
})
export class SicherheitsCheckPageModule {}
