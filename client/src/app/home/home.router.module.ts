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
                        loadChildren: () => import('../sicherheits-check/sicherheits-check.module').then(m => m.SicherheitsCheckPageModule)
                    }
                ]
            },
            {
                path: 'service-check',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../service-check/service-check.module').then(m => m.ServiceCheckPageModule)
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'sicherheits-check',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
