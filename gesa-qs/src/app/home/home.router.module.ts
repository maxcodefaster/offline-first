import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'sicherheits-check',
                children: [
                    {
                        path: '',
                        loadChildren: './sicherheits-check/sicherheits-check.module#SicherheitsCheckPageModule'
                    }
                ]
            },
            {
                path: 'service-check',
                children: [
                    {
                        path: '',
                        loadChildren: './service-check/service-check.module#ServiceCheckPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home/sicherheits-check',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
