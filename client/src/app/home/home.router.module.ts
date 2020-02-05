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
        redirectTo: 'sicherheits-check',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
