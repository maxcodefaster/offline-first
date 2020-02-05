import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'tab-1',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../tab-1/tab-1.module').then(m => m.Tab1PageModule)
                    }
                ]
            },
            {
                path: 'tab-2',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../tab-2/tab-2.module').then(m => m.Tab2PageModule)
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tab-1',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
