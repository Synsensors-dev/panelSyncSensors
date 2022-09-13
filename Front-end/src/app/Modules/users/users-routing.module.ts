import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../login/auth-admin.guard';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { UserListViewComponent } from './pages/user-list-view/user-list-view.component';

const routes: Routes = [
  {
    path:'',
    data:{title:'Usuarios'},
    children:[
      {
        path:'profile',
        data:{title:'Perfil'},
        component:ProfileViewComponent
      },
      {
        path:'users-list',
        data:{title:'Lista Usuarios'},
        canActivate:[AuthAdminGuard],
        component:UserListViewComponent
      }

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
