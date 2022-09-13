import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './Modules/login/auth.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"dashboard",
    pathMatch:"full"},
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild:[AuthGuard],
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./Modules/core/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'stations',
        loadChildren: () => import('./Modules/stations/stations.module').then(m=>m.StationsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./Modules/users/users.module').then(m=>m.UsersModule)
      }

    ]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

/*{
  path: '',
  component: DefaultLayoutComponent,
  data: {
    title: 'Home'
  },
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'base',
      loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
    },
    {
      path: 'buttons',
      loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
    },
    {
      path: 'charts',
      loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
    },
    {
      path: 'icons',
      loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
    },
    {
      path: 'notifications',
      loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
    },
    {
      path: 'theme',
      loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
    },
    {
      path: 'widgets',
      loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
    }
  ]
},
{ path: '**', component: P404Component }
];*/
