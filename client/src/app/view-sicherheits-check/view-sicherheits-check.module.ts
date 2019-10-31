import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSicherheitsCheckPage } from './view-sicherheits-check.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSicherheitsCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewSicherheitsCheckPage]
})
export class ViewSicherheitsCheckPageModule {}
