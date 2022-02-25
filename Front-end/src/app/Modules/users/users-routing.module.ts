import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';

const routes: Routes = [
  {
    path:'',
    data:{title:'Usuarios'},
    children:[
      {
        path:'profile',
        data:{title:'Perfil'},
        component:ProfileViewComponent
      }

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
