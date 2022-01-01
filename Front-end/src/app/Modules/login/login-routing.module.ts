import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './pages/login-view/login-view.component';

const routes: Routes = [
  {
    path: 'prueba',
    component: LoginViewComponent,
    data: {
      title: 'Login Page'
    }
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
